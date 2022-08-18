---
layout: ../../layouts/BlogPostLayout.astro
title: Authenticating things with cookies on Next.js
date: 2021-07-31T00:00:00.000+00:00
description: With SSR being on the rise (again), we are going to guide you through how we implement cookie-based authentication on Next.js, using Postgres and Prisma.
keywords: frontend, development, software, next.js, javascript, typescript, postgres, prisma, cookies, authentication
---

_Originally posted on [Finiam's website](https://blog.finiam.com/blog/authenticating-things-with-cookies-on-next-js/)._

Please click here to skip all of the backstory behind this blog post and [jump straight into the code](#main-content)!

A while back [I made a blog post](https://blog.finiam.com/blog/predictable-react-authentication-with-the-context-api) on how to manage user authentication on React apps. It's a task I've made time and time again and decided to share this with you folks. That blog post is aimed at single-page apps obviously, but nowadays we are seeing more and more (again) server-rendered apps, especially with Next.js.

When server-rendering pages, authentication works a little differently. While you might use the context API or any other kind of mechanism to authenticate users on your app on the client-side, we should do that on the server so that users receive their content in the context of their authentication status. Let's see how.

## Next.js

Next.js in short is a React app framework that server renders components. If you use React you probably heard about Next.js. If you didn't, please take some time to read about it on their [website](https://nextjs.org/), it's great and it's pretty much the only way we write React apps at Finiam.

Next.js allows us to server render components and play with the usual `req` and `res` objects on an HTTP request lifecycle, something that you can't really do with a traditional React app SPA. This means we can interact with the cookies involved in our app.

However, in Next.js there is no need to handle that on the client side. You can directly authenticate users in `getServerSideProps` and immediately render the page based on the authentication status, without having to deal with that on the frontend.

It also means that you get access to a `node.js` environment, meaning that you can even use a database directly instead of having to develop a remote API yourself. It's full-stack React development!

A quick taste of how that can look like.

By the way, we pretty much just write Typescript nowadays. You should **really** be writing Typescript.

```tsx
import React from 'react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Login from 'root/components/Login';
import { userFromRequest } from 'root/web/tokens';

interface User {
	email: string;
	name: string;
}

interface Props {
	user?: User;
}

export default function Home({ user }: Props) {
	if (!user) return <Login />;

	return <div>Hello {user.name}</div>;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const user = await userFromRequest(context.req);

	if (!user) return { props: {} };

	return {
		props: { user }
	};
}
```

Awesome right? In this example, the magic is on the `userFromRequest` method, which extracts the user by reading the cookie that was previously set during login.

Let's dive into the technicalities.

## Architecture

The small project we are going to make consists of a very simple but relatively secure sign-up and login flow, and a user-owned resource, in our case, just some notes that users can write for themselves. Users can authenticate themselves and write notes that can only be accessed by them.

We are going to store users and their hashed passwords on our database. When users sign up or login successfully we place a JWT token that contains the email of said user, and we sign this JWT with a secret key (that should be random and crypto secure). This token is then stored on an `HttpOnly` and `Secure` cookie, so that it's only readable on the server-side and no client-side Javascript can access it. The cookie will be valid for 1 day, but this can be configured as you prefer.

Whenever we want to identify the user behind a network request, we check the cookies of said request, take our JWT token, and then check if it was signed with our secret key, so bad actors can't forge JWT tokens. If it was signed with our key we can assume that it's a valid token. Then we fetch the user info from the database and we can use it freely to build pages on the server-side.

The users' passwords are all hashed using `argon2`, the strongest and safest hashing algorithm out there, that won the [PHC (Password Hashing Competition)](https://www.password-hashing.net/) very recently.

### Disclaimer

The code you are about to see, especially the backend part of it, lacks a lot of the required functionality to make a truly robust and secure authentication flow. It doesn't handle brute force attacks, doesn't rate-limit sign-ups, has no geolocation protection, has no session management, meaning that we can't log out users remotely or anything like that, and has no CSRF protection. We work in the finance world where most of these things are **mandatory**. We recommend using [auth0](https://auth0.com/) which has most of these features or at least setting up [Cloudflare](https://cloudflare.com) to rate the limit on your endpoints.

Our password hashing algorithm is safe, the strongest in the industry. The JWT tokens are being generated correctly, but it's recommended to rotate the signing key daily or weekly. It's enough to secure most web apps, but if you are handling sensitive data, you should take more steps to secure it.

We usually write most of our complex backend apps with Phoenix or Rails. In these frameworks, you have much more complete libraries that handle most of the steps we are going to make by hand!

Still, you also have [NextAuth.js](https://next-auth.js.org/) which is a pretty nice project that handles integration with 3rd parties, implement CSRF and session management. But still lacks brute force and geolocation protection.

Consider this a learning project, that can go into production, but don't implement, let's say, a banking system using it without added protection!

<span id="main-content"></span>
## Let's get coding

To get started just bootstrap a `Next.js` example project:

```bash
yarn create next-app --typescript
```

All of the code I'm going to show is a simplified version of what's present on our [next-prisma-starter template](https://github.com/finiam/next-prisma-starter) at the time of writing this blog post.

### User management

Let's create a Prisma schema for our app: `prisma/schema.prisma`

```jsx
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgres"
  url      = env("DATABASE_URL")
}

model User {
  id         String        @id @default(uuid())
  email      String        @unique
  name       String
  password   String
  createdAt  DateTime      @default(now())
  updatedAt  DateTime      @updatedAt
  Note       Note[]
}
```

This schema will create a database where we can store users and each user has many notes.

You can then use the Prisma migration tool to apply these changes to your database.

```bash
prisma migrate dev --name init
prisma migrate deploy --preview-feature && yarn db:generate
```

Now, let's create our `lib` layer. On full-stack Next.js projects, I like to put all of the web-related code on `src` and then all of the backend business logic on a `lib` directory. Both, at the root of the project.

The users' module: `lib/users.ts`

```tsx
import { User } from '@prisma/client';
import prisma from 'lib/prisma';
import { encryptPassword } from 'lib/auth/passwordUtils';
import pick from 'lodash/pick';

export interface UserParams {
	email: string;
	name: string;
	password: string;
}

// Given some params, create a user on the database,
// storing the encrypted password.
export async function createUser(params: UserParams): Promise<User> {
	const filteredParams = pick(params, ['email', 'name', 'password']);
	const password = await encryptPassword(filteredParams.password);
	const user = await prisma.user.create({
		data: { ...filteredParams, password }
	});

	// Make sure all our lib methods obfuscate the password
	user.password = '';

	return user;
}
```

The auth module: `lib/auth/index.ts`

```tsx
import { User } from '@prisma/client';
import prisma from 'lib/prisma';
import { verifyPassword } from './passwordUtils';

export interface LoginParams {
	email: string;
	password: string;
}

// Given some login params (email and password)
// return the user if the password is valid
// or null if it's not.
export async function login(params: LoginParams): Promise<User> {
	const user = await prisma.user.findUnique({ where: { email: params.email } });

	if (!user) return null;

	if (await verifyPassword(user.password, params.password)) {
		// Make sure all our lib methods obfuscate the password
		user.password = '';

		return user;
	}

	return null;
}
```

Now the final missing piece, the hashing algorithm. `lib/auth/passwordUtils.ts`

```tsx
import argon2 from 'argon2';

export async function encryptPassword(password: string): Promise<string> {
	return argon2.hash(password);
}

export async function verifyPassword(hash: string, password: string): Promise<boolean> {
	return argon2.verify(hash, password);
}
```

Now we can create and login users easily.

### Cookies and JWT

You probably heard about [JWT](https://jwt.io/) also known as JSON web tokens. They are used by most web services for authentication, using JWT to encode some of the user info and use it as a token that identifies the user. You should **never** store secret info on JWTs as they are meant to be readable by anyone. It's the signing mechanism of a JWT however that guarantees the identity and validity of a given token.

When generating a JWT we sign it with a **very secret key**, and then we can verify that any subsequent JWT passed to us was correctly generated with said **very secret key**. If any attacker forges a JWT, that won't work as they are not generated with said key.

Like most web services, we generate a JWT with the user email (or any other unique identifier of the user) in it on a successful login or sign-up and then use server-side secure cookies to store it. This way, it's impossible for malicious Javascript to get the cookie. It's also pretty easy to directly, on the server-side, render the user's authenticated state.

The code now. We are going to save this file under `src/web/tokens.ts`. This is related to web logic and not exactly business-side logic. Our module exports 3 functions: `authenticateUser`, `clearUser` and `userFromRequest`

```tsx
import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { NextApiResponse } from "next";
import prisma from "lib/prisma";
import { NextApiRequestCookies } from "next/dist/next-server/server/api-utils";
import { IncomingMessage } from "http";

// You should really not use the fallback and perhaps
// throw an error if this value is not set!
const JWT_TOKEN_KEY = process.env.JWT_TOKEN_KEY || "super duper secret key";
const cookieOptions = {
  httpOnly: true,
  maxAge: 2592000,
  path: "/",
  sameSite: "Strict",
  secure: process.env.NODE_ENV === "production",
};

function setCookie(
  res: any,
  name: string,
  value: string,
  options: Record<string, unknown> = {}
): void {
  const stringValue =
    typeof value === "object" ? `j:${JSON.stringify(value)}` : String(value);

  res.setHeader("Set-Cookie", serialize(name, String(stringValue, options));
}

// This sets the cookie on a NextApiResponse so we can authenticate
// users on API routes.
export function authenticateUser(res: NextApiResponse, user: User): void {
  if (!user) return;

  const token = jwt.sign({ email: user.email }, JWT_TOKEN_KEY, {
    expiresIn: "1d",
  });

  setCookie(res, "auth", token, cookieOptions);
}

// This removes the auth cookie, effectively logging out
// the user.
export function clearUser(res: NextApiResponse): void {
  setCookie(res, "auth", "0", {
    ...cookieOptions,
    path: "/",
    maxAge: 1,
  });
}

// This gives back the user behind a given request
// either on API routes or getServerSideProps
export async function userFromRequest(
  req: IncomingMessage & { cookies: NextApiRequestCookies }
): Promise<User | undefined> {
  const { auth: token } = req.cookies;

  if (!token) return undefined;

  try {
    const data = jwt.verify(token, JWT_TOKEN_KEY);

    if (!data) return undefined;

    const user = await prisma.user.findUnique({
      where: { email: (data as any).email },
    });

    if (user) user.password = "";

    return user;
  } catch (error) {
    return undefined;
  }
}
```

Now, we are able to create our API routes

### API routes

We are using [next-connect](https://www.npmjs.com/package/next-connect) to implement our API routes. They have a cleaner API and allow us to easily use middlewares and the like.

Let's quickly create a default `next-connect` handler first. You can add default middlewares to this handler so we can re-use those on all of our API routes. In this, we can even define custom error handling behavior.

`src/pages/_defaultHandler.ts`

```ts
import { NextApiResponse } from 'next';
import nextConnect from 'next-connect';

export default function defaultHandler<ReqType, ResType>() {
	return nextConnect<ReqType, ResType>({
		attachParams: true,
		onError: (err, req, res) => {
			console.error(err);

			(res as unknown as NextApiResponse).status(500).json({ error: 'Internal Server Error' });
		}
	});
}
```

Now, for our API we are going to need two modules and a total of three endpoints.

- `/sessions`
  - `POST` - logs in a user with a email/password combo
  - `DELETE` - logs out the user
- `/users`
  - `POST` - creates users

Now, the sessions endpoint on `src/pages/api/sessions.ts`

```tsx
import { NextApiRequest, NextApiResponse } from 'next';
import { login } from 'lib/auth';
import { authenticateUser, clearUser } from 'root/web/tokens';
import defaultHandler from './_defaultHandler';

const handler = defaultHandler<NextApiRequest, NextApiResponse>()
	.post(async (req, res) => {
		const user = await login(req.body);

		if (user) {
			authenticateUser(res, user);
			res.json(user);
		} else {
			res.status(404).send('');
		}
	})
	.delete((_req, res) => {
		clearUser(res);

		res.send('');
	});

export default handler;
```

And our users' endpoint on `src/pages/api/users.ts`

```tsx
import { NextApiRequest, NextApiResponse } from 'next';
import { createUser } from 'lib/users';
import { authenticateUser } from 'src/web/tokens';
import defaultHandler from './_defaultHandler';

const handler = defaultHandler<NextApiRequest, NextApiResponse>().post(async (req, res) => {
	const user = await createUser(req.body);

	authenticateUser(res, user);
	res.json(user);
});

export default handler;
```

Now to go full circle, the frontend.

### Frontend

On the frontend we need 4 dependencies, `redaxios`, `react-hook-form `, `react-query` and `superjson`. Feel free to go 100% vanilla on this, but we often end up installing this when projects become more complicated anyway.

Let's just make 2 pages, a sign-up page, and a homepage. The home page either shows the current user email or the login form.

Setup `react-query` by adding this to your `src/pages/_app.tsx`

```tsx
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
	return (
		<QueryClientProvider client={queryClient}>
			<Component {...pageProps} />
		</QueryClientProvider>
	);
}
```

Then, let's just implement a very nice utility that allows us to refresh server-side data from Next.js without a full page reload.

`src/hooks/useServerRefresher.tsx`

```tsx
import { useRouter } from 'next/router';

export default function useServerRefresher(): () => void {
	const router = useRouter();

	return () => router.replace(router.asPath);
}
```

We can use this hook to refresh the data from `getServerSideProps` without a full page reload! This is very handy to update stale data.

Then, our sign-up page. We use this hook, after the successful `createUser` mutation, the server refresher gets called and then we re-run the code on `getServerSideProps` again, which redirects us to the homepage.

`src/pages/signup.tsx`

```tsx
import React from 'react';
import Head from 'next/head';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { GetServerSidePropsContext } from 'next';
import { useMutation } from 'react-query';
import useServerRefresher from 'src/hooks/useServerRefresher';
import { userFromRequest } from 'src/web/tokens';

export default function SignUp() {
	const {
		handleSubmit,
		register,
		formState: { errors }
	} = useForm();
	const {
		isLoading,
		isError,
		mutate: createUserMutation
	} = useMutation((params) => redaxios.post('/users', params), {
		onSuccess: useServerRefresher()
	});

	const handleCreateUser = (params) => createUserMutation(params);

	return (
		<main>
			<form
				className="h-screen center flex flex-col items-center justify-center"
				onSubmit={handleSubmit(handleCreateUser)}
			>
				<Head>
					<title>Sign Up</title>
				</Head>

				<div className="space-y-8">
					<h1 className="self-start text-xl">Sign up</h1>

					<label className="flex flex-col" htmlFor="email">
						Email
						<input id="email" type="email" {...register('email', { required: true })} />
					</label>

					<label className="flex flex-col" htmlFor="name">
						Name
						<input id="name" type="text" {...register('name', { required: true })} />
					</label>

					<label className="flex flex-col" htmlFor="password">
						Password
						<input id="password" type="password" {...register('password', { required: true })} />
					</label>

					<button
						className="u-button"
						type="submit"
						disabled={Object.keys(errors).length > 0 || isLoading}
					>
						Sign Up
					</button>

					{isError && <p>User exists</p>}

					<Link href="/">
						<a className="block underline" href="/">
							Login
						</a>
					</Link>
				</div>
			</form>
		</main>
	);
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const user = await userFromRequest(context.req);

	if (user) {
		return {
			redirect: {
				destination: '/',
				permanent: false
			}
		};
	}

	return {
		props: {}
	};
}
```

And then, our homepage. In this case, we are not doing redirects. When having protected pages it's good to have the login logic on the component itself so users are still on the correct URL after logging in.

`src/pages/index.tsx`

```tsx
import React from 'react';
import { User } from '@prisma/client';
import { GetServerSidePropsContext } from 'next';
import Login from 'src/components/Login';
import { userFromRequest } from 'src/web/tokens';

interface Props {
	user?: User;
}

export default function Home({ user }: Props) {
	if (!user) return <Login />;

	const handleLogout = () => redaxios.delete('/sessions');

	return (
		<main className="max-w-4xl mx-auto py-20 space-y-8">
			Hello {user.name}!
			<button type="button" onClick={handleLogout}>
				Logout
			</button>
		</main>
	);
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const user = await userFromRequest(context.req);

	if (!user) return { props: {} };

	// Always use superjson as Next.js
	// can't serialize prisma objects by default
	return {
		props: superjson.serialize({
			user
		}).json
	};
}
```

Don't forget the login component.

`src/components/Login.tsx`

```tsx
import React from 'react';
import Head from 'next/head';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import Link from 'next/link';
import useServerRefresher from 'src/hooks/useServerRefresher';

export default function Login() {
	const {
		handleSubmit,
		register,
		formState: { errors }
	} = useForm();
	const {
		isLoading,
		isError,
		mutate: loginMutation
	} = useMutation((params) => redaxios.post('/sessions', params), {
		onSuccess: useServerRefresher()
	});

	const onSubmit = async (params) => loginMutation(params);

	return (
		<form
			className="h-screen u-center flex flex-col items-center space-y-8"
			onSubmit={handleSubmit(onSubmit)}
		>
			<Head>
				<title>Login</title>
			</Head>

			<div className="space-y-8">
				<h1 className="self-start text-xl">Login</h1>

				<label className="flex flex-col" htmlFor="email">
					Email
					<input type="text" {...register('email', { required: true })} />
				</label>

				<label className="flex flex-col" htmlFor="password">
					Password
					<input type="password" {...register('password', { required: true })} />
				</label>

				<button
					className="u-button"
					type="submit"
					disabled={Object.keys(errors).length > 0 || isLoading}
				>
					Login
				</button>

				{isError && <p>User password combination not found</p>}

				<Link href="/signup">
					<a className="block underline" href="/signup">
						Sign up
					</a>
				</Link>
			</div>
		</form>
	);
}
```

## Closing notes

This is a great way to get started on full-stack projects on Next.js, very useful for small to medium-sized projects. You get full SSR so users never get to see any loading spinner while getting authentication details, as you get on most SPAs and you get to iterate on features easily without having to maintain separate projects and technologies for backend and frontend.

You don't even need to use Prisma or do it all full-stack. You can have all of your business logic on a remote API and just use some Next.js API routes to manage authentication cookies and then fetch all your data on `getServerSideProps`. Really, the sky is the limit here.

If you really enjoyed the full-stack part of this, I recommend you looking into either [Blitz.js](https://blitzjs.com/) or [Redwood.js](https://redwoodjs.com/), they do most of the heavy lifting for you and have built-in features that are essential for app development. We only use our [starter template](https://github.com/finiam/next-prisma-starter) for simpler stuff so we can enjoy the greater flexibility.

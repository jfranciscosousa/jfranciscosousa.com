---
title: Typing remix loaders with confidence
date: 2022-05-30T00:00:00.000+00:00
description: 'Taking Remix type safety to the next level. How to infer types from loaders automatically!'
keywords: ssr, server, render, locale, remix, react, next.js, i18n
---

Well, hello there, it's time for a lightning-quick Remix tip. Let's see how we can genuinely write typesafe Remix routes by sharing types between loaders and components for full-stack typing!

## Remix, what?

For the readers unfamiliar with Remix, it's a React framework created by the `react-router` team. It uses `react-router` to make a server-rendering full-stack framework with React support. It's the other kind of `Next.js` (sorry).

## loaders, what are they

Remix is a server-side rendering framework, and as such, you can load data directly to your components while they are being rendered on the server.

```tsx:app/routes/index.tsx
export function loader() {
  return "Hello world!";
}

export default function SomeRemixPage() {
  const data = useLoaderData();

  return <p>{ data }</p>;
}
```

You can only define the `loader` function on the Remix route file, but you can then call the `useLoaderData` hook on every component used inside that route. This is very useful for better SEO and spares you from adding loading states to your app, as the page comes pre-rendered from the server.

## Let's add types the regular way

You can quickly type `useLoaderData`. Its type signature it's basically `useLoaderData<T>: T`, so if you do `useLoaderData<string>`, you just typed your loader!

```tsx:app/routes/index.tsx
export function loader(): string {
  return "Hello world!";
}

export default function SomeRemixPage() {
  const data = useLoaderData<string>();

  return <p>{ data }</p>;
}
```

However, this has a couple of issues. Typing the generic `T` on `useLoaderData` is basically the same thing as doing this:

```tsx
const data = useLoaderData<string>();

const data = useLoaderData() as string;
```

If you do not type `useLoaderData, its default type is `any`, so you can just cast that to whatever you want. This means that the following scenario won't report type errors and would just crash during runtime.

```tsx:app/routes/index.tsx
export function loader(): string {
  return "Hello world!";
}

export default function SomeRemixPage() {
  const { data } = useLoaderData<{data: string}>();

  return <p>{ data }</p>;
}
```

In the above scenario, this will crash, even though the types are all valid. We want the loader data to be of type `{ data: string }`, but as there is no direct-type connection between the loader and the hook, some bugs might leak into runtime if you type all of your `loader` and `useLoaderData` like this.

## Extracting the types from the `loader`

The solution is to infer the types from the `loader` automatically. The first step is to never use the `LoaderFunction` type.

```tsx
import { json } from '@remix-run/node'; // or "@remix-run/cloudflare"
import type { LoaderFunction } from '@remix-run/node'; // or "@remix-run/cloudflare"

export const loader: LoaderFunction = async () => {
	return json({ ok: true });
};
```

As of Remix version `1.5.1` the `LoaderFunction` return type is `Promise<Response> | Response | Promise<AppData> | AppData` which means we cannot reliably use the solution I will propose. `AppData` is an internal Remix type that is the same as `any`, which doesn't do much for type safety.

The second step is to **never** return value of our `loader` function. We are going to do that automatically from now on. So if you have any `export function loader(): SomeType`, make sure you remove the `SomeType` from there.

Then we can start infering the type of our `loader` automatically!

```tsx
type LoaderType = Awaited<ReturnType<typeof loader>>;
```

This essentially infers the type of the `loader` function.

- `Awaited` basically extracts the type of a promise because `loader` can be async
- `ReturnType` is pretty straightforward and returns the type returned by `typeof loader`

Revisiting our previous example, it would become this:

```tsx:app/routes/index.tsx
export function loader(): string {
  return "Hello world!";
}

type LoaderType = Awaited<ReturnType<typeof loader>>;

export default function SomeRemixPage() {
  const { data } = useLoaderData<LoaderType>();

  return <p>{ data }</p>;
}
```

Typescript would then complain that there is no property `data` on type `string`! We can fix that by correctly refactoring our `loader`.

```tsx:app/routes/index.tsx
export function loader() {
  return { data: "Hello world!" };
}

type LoaderType = Awaited<ReturnType<typeof loader>>;

export default function SomeRemixPage() {
  const { data } = useLoaderData<LoaderType>();

  return <p>{ data }</p>;
}
```

If you want to type the arguments of `loader` you can import the following from Remix internals:

```tsx
import type { DataFunctionArgs } from "@remix-run/server-runtime";

export function loader(({ request }: DataFunctionArgs)) {
  // do stuff
}
```

This will keep the return type untouched so you can automatically infer it.

This solution is a great help because it also takes care of conditionals! Imagine that this page is only for authenticated users:

```tsx:app/routes/index.tsx
export function loader({ request }: DataFunctionArgs) {
  if (!extractUserFromRequest(request)) return new Response(null, { status: 401 });

  return { data: "Hello world!" };
}

type LoaderType = Awaited<ReturnType<typeof loader>>;

export default function SomeRemixPage() {
  const { data } = useLoaderData<LoaderType>();

  return <p>{ data }</p>;
}
```

Here, Typescript would complain that there is no `data` on `Response` when using the `useLoaderData` hook. This would avoid a regression here. You could quickly fix this by using `throw` when checking for the user session instead of `return`. Remember that you can `throw` inside a `loader` function to immediately stop rendering! It would also keep Typescript silent because the function only returns `{ data: string }`.

## Final notes

You can also export the types from the inferred `loader` functions to use wherever you want. This lets us ensure everything is nice and tidy and keep runtime errors to a minimum.

Hope this helped, let me know if you have any questions! If you also have a better solution than this one, please let me know!

Stay safe out there!

---
title: Validating environment variables with zod
date: 2023-02-20T00:00:00.000+00:00
description: tbd
keywords: tbd
---

This is a quick little blog post to showcase something I've seen in some frontend starter repos, namely `create-t3-app`.

Environment variables and .env files are the de-facto way of configuring Javascript web applications. Most meta-frameworks like Next.js, svelte-kit, and others support it from out of the box, allowing you to have one or multiple `.env` files for your projects.

Some even add Typescript support, generating types based on the contents of your `.env` files, like `svelte-kit` does.

## Taking it a step further

Even with Typescript support, there's one thing that I think is essential on most web applications: runtime validations of used environment variables.

This is super useful when other developers are checking out your projects. You either document every used environment variable, or your web application will break randomly when a given feature requiring a non-provided environment variable is used.

And as it's usual for runtime validations, we can use `zod` to perform this task:

```ts:env.ts
import z from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string(),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
});

export const ENV = envSchema.parse(process.env);
```

In the above code, we define a `zod` schema that enforces the existence of a `DATABASE_URL` and a `NODE_ENV`, which has the value of `development` by default.

We then export an `ENV` variable with the result of the `parse` function from our `zod` schema. `parse` validates the contents of `process.env` and returns an object that matches said schema. This means we filter out any stuff we don't need from `process.env` so keep that in mind.

We can use it as such:
```ts:some-file.ts
import { ENV } from "./env.ts";

// This will use be fully typed if using Typescript! Will also work for Javascript.
console.log(ENV.NODE_ENV);
```

When using Typescript, all usages of `ENV` will be heavily typed. More, the application itself will crash if the schema has validation errors if `DATABASE_URL` is missing, for example.

## Handling non-string values

If you want to read numbers or booleans or any other non-string values from your env, we can always rely on `transform`.

```ts:env.ts
import z from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string(),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  SOME_NUMBER: z.string().regex(/^\d+$/).transform(Number),
  SOME_BOOLEAN: z.enum(["true", "false"]).transform(Boolean)
});

export const ENV = envSchema.parse(process.env);
```

The strategy here consists in validating the string value first, and then using `transform` to convert it to the final value. For numbers we can use a simple regex and for booleans we can just use an enum. When using `ENV`, `SOME_NUMBER` and `SOME_BOOLEAN` will have type `number` and `boolean` respectively!

## Handling a bad schema

If our environment doesn't match our schema, we will get cryptic errors when running our app. A good way to prevent this is to validate the schema before running our application.

First off, we need to have a way to extract the issues from our schema. This will be useful when running the validation script.

```ts:env.ts
import z from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string(),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
});

export const ENV = envSchema.parse(process.env);

export const getEnvIssues = (): z.ZodIssue[] | void => {
  const result = serverEnvSchema.safeParse(process.env);

  if (!result.success) return result.error.issues;
};
```

Then, we write a validation script that we can run before actually running our web app. You can even make this part of your CI pipelines! (And you should!)

Just make sure you also install `zod-error`. It takes care of prettifying `zod` errors for you.

```ts:validateEnv.ts
import { generateErrorMessage } from "zod-error";
import { getEnvIssues } from "./env.ts"

const issues = getEnvIssues();

if (issues) {
  console.error("Invalid environment variables, check the errors below!");
  console.error(
    generateErrorMessage(issues, {
      delimiter: { error: "\n" },
    })
   ;

  process.exit(-1);
}

console.log("The environment variables are valid!");
```

You can run the above script with `ts-node` if you are on a Typescript environment.

## I can't use `process.env`!

Users of things like `deno`, `Cloudflare Workers`, `vite` or `bun` can't use `process.env`, which is a `node` thing (that also works on Webpack!)

- `deno`- `Deno.env.toObject()`
- `Cloudflare` - I haven't tested it, but you can try and use `globalThis` as env vars can be accessed global variables
- `vite` - `import.meta.env`
- `bun` - `Bun.env`

In short, refer back to the documentation of your runtime or meta-framework and check how you can access the object containing all env vars!

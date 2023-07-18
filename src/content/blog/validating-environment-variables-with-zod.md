---
title: Validating environment variables with zod
date: 2023-03-18T00:00:00.000+00:00
description: Validate environment variables in Javascript with Zod, a TypeScript-first schema validation library. Learn how to define and enforce environment variables structure preventing runtime errors and improving error handling.
keywords: environment variables, javascript, typescript, runtime errors, svelte, react, next, deno, bun, cloudflare, frontend, remix
---

This is a quick blog post to showcase something I've seen in some frontend starter repositories, namely `create-t3-app`.

Environment variables and `.env` files are the de-facto way of configuring JavaScript web applications. Most meta-frameworks, such as Next.js, Svelte Kit, and others, support them out of the box, allowing you to have one or multiple `.env` files for your projects.

Some frameworks even add TypeScript support, generating types based on the contents of your `.env` files, as `svelte-kit` does.

## Taking it a step further

Even with TypeScript support, there is one thing that I think is essential for most web applications: runtime validation of used environment variables.

This is extremely useful when other developers check out your projects. It can be difficult to figure out exactly what environment variables are needed and what values they should have, unless you keep a detailed documentation of every environment variable (which you should do, even if you use the information in this blog post).

And as it’s usual for runtime validations, we can use `zod` to perform this task:

```tsx:env.ts
import z from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string(),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
});

export const ENV = envSchema.parse(process.env);
```

In the above code, we define a `zod` schema that requires the presence of a `DATABASE_URL` and `NODE_ENV`. The value of `NODE_ENV` defaults to `development`.

Next, we export an `ENV` variable with the result of the `parse` function from our `zod` schema. The `parse` function validates the contents of `process.env` and returns an object that matches the schema. This means we filter out any unnecessary information from `process.env`. Keep this in mind.

We can use it as such:

```tsx:someFile.ts
import { ENV } from "./env.ts";

// This will use be fully typed if using Typescript! Will also work for Javascript.
console.log(ENV.NODE_ENV);
```

When using TypeScript, all uses of `ENV` will be strongly typed. Additionally, if the schema has validation errors, the application itself will crash if `DATABASE_URL` is missing, for example.

## Handling non-string values

If you need to read non-string values such as numbers or booleans from your environment, you can rely on the `transform` function.

```tsx:env.ts
import z from "zod";

const envSchema = z.object({
    DATABASE_URL: z.string(),
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    SOME_NUMBER: z.string().regex(/^\\d+$/).transform(Number),
    SOME_BOOLEAN: z.enum(["true", "false"]).transform((v) => v === "true"),
});

export const ENV = envSchema.parse(process.env);

```

The strategy here is to first validate the string value, and then use `transform` to convert it to the final value. For numbers, a simple regex can be used, and for booleans, an enum can be used. When using `ENV`, `SOME_NUMBER` and `SOME_BOOLEAN` will have a type of `number` and `boolean`, respectively.

## Handling a bad schema

If our environment doesn't match our defined schema, our application could crash during runtime. Some frameworks and libraries might actually crash when running the app server itself, which is good, but others might crash during runtime. To prevent this, it is a good practice to validate the schema before running our application.

First, we need to find a way to extract issues from our schema, as it will be useful when running the validation script.

```tsx:env.ts
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

Next, we write a validation script that we can run before launching our web app. You can even incorporate this step into your CI pipelines, to detect environment errors before actually deploying your application. I personally add this script to my `build` step on Vercel or Netlify (or wherever I'm deploying).

Make sure to install `zod-error` as well. It helps to prettify `zod` errors for you.

```tsx:validateEnv.ts
import { generateErrorMessage } from "zod-error";
import { getEnvIssues } from "./env.ts";

const issues = getEnvIssues();

if (issues) {
  console.error("Invalid environment variables, check the errors below!");
  console.error(
    generateErrorMessage(issues, {
      delimiter: { error: "\\n" },
    })
  );
  process.exit(-1);
}

console.log("The environment variables are valid!");

```

If you are working in a TypeScript environment, you can run the script above using `ts-node`.

## I can’t use `process.env`!

Users of tools like `deno`, `Cloudflare Workers`, `vite`, or `bun` cannot use `process.env`, which is specific to Node.js (although it also works on Webpack!).

Instead, here are some alternatives:

- `deno` - use `Deno.env.toObject()`
- `Cloudflare` - while not tested, you can try to access environment variables as global variables via `globalThis`
- `vite` - use `import.meta.env`
- `bun` - use `Bun.env`

In summary, consult the documentation for your runtime or meta-framework to learn how to access the objects containing all environment variables.

Hope this information is helpful! See you soon.

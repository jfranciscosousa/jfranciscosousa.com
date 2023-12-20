---
title: Leveling up your web apps with Zod and ChatGPT
date: 2023-12-20T00:00:00.000+00:00
description: Discover how to integrate ChatGPT and other LLMs into web apps with this guide. Learn about selecting LLM providers, using zod-gpt for JSON outputs, and implementing AI features with a focus on security and user experience.
keywords: OpenAI, ChatGPT, Anthropic, LLM, TypeScript, Zod
---

It's been pretty much a year since ChatGPT became available to the general public. Time goes pretty fast. Today, OpenAI's products are better and faster than ever, and the competition is pretty healthy with alternatives like Anthropic and Bard.

A lot of tech companies across the industry are either pivoting to AI or extending their products with AI features. This leaves us, the engineers of said companies, an entirely new way of thinking about the products we build. Let's see what we, JavaScript folks, can do to integrate these powerful tools with our existing web apps.

## Pick an LLM provider

The first step is to pick an LLM provider. Most tech companies already have some sort of deal with providers like OpenAI. If your company isn't in this situation, you can suggest one. I'm biased towards OpenAI for their enterprise agreement and data protection policies.

Keep costs in mind. If you're with a big company with a substantial AI budget, go ahead. Otherwise, plan your budget carefully. LLM providers are expensive and offer no free tiers.

Companies often provide AI features only in paid plans or with strict daily/weekly/monthly limits, like Notion, to manage costs.

For this blog post, we'll proceed with the OpenAI API.

## How to get JSON out of LLMs

LLMs take human language and out comes... "more language." That's the basic "black box" behavior we can assume from LLMs. This is not ideal if you are planning to integrate your existing APIs and systems with it, right? How do we even go about parsing whatever comes out of the LLM?

Easy, we tell the LLM to output in JSON. Yes, that's a thing. You can literally ask ChatGPT to respond in JSON. Even better, you can tell ChatGPT (and most LLMs) to answer you back according to a specific JSON schema specification that you yourself provide.

We can go up another level and build a JSON schema, asking the LLM to follow said schema. However, writing JSON schemas is not very pleasant, so we use something a little better, `zod`, a runtime validation library for JavaScript.

With `zod`, you can define schemas and validate your data against them. You can also infer `Typescript` types from `zod` schemas. This ensures type safety as well as runtime safety. You can then convert the `zod` schema to a JSON schema and ask the LLM to respond following the specified schema.

Luckily, there's already a great library that does this, [zod-gpt](https://github.com/dzhng/zod-gpt). Here's how it works.

```ts
import z from "zod";
import { OpenAIChatApi } from "llm-api";
import { completion } from "zod-gpt";

const openai = new OpenAIChatApi(
  { apiKey: "YOUR-OPENAI-KEY" },
  { model: "gpt-3.5-turbo-16k" }
);

const schema = z.object({
    name: z.string().describe("The name of the person"),
    age: z.number().describe("The person's age")
});

const response = await completion(openai, "Imagine a random person", { schema });

// data will be typed as { name: string; age: number }
console.log(response.data);
```

Internally, `zod-gpt` will make sure the output from the LLM matches your provided zod schema, and it will even retry in case it fails. It's also aware of rate limits and will wait accordingly!

## Some practical examples

Generating random people is not a very good use case, but one of the best applications for these LLMs is taking natural text and converting it into a structure.

For example, when I worked in healthcare tech, a popular challenge was taking doctor's notes and creating structured data out of them. Here's how you could do it:

```ts
import z from "zod";
import { OpenAIChatApi } from "llm-api";
import { completion } from "zod-gpt";

const openai = new OpenAIChatApi(
  { apiKey: "YOUR-OPENAI-KEY" },
  { model: "gpt-3.5-turbo-16k" }
);

const schema is z.object({
  name: z.string().describe("The patient

's name"),
  age: z.number().describe("The patient's age"),
  weight: z.number().describe("The patient's weight in kilograms"),
  height: z.number().describe("The patient's height in centimeters"),
  bmi: z.number().describe("The patient's BMI"),
  bmiEnum: z
    .enum(["underweight", "normal", "overweight", "obese", "very_obese"])
    .describe("The patient's BMI in text format"),
  existingConditions: z
    .array(z.string())
    .describe("The patient's existing conditions"),
});

function parseDoctorsNotes(notes: string) {
  const prompt = `
    Please take these notes from a doctor
    and try to structure the data following the provided
    JSON schema info. Notes: ${notes}
  `;

  return completion(openai, prompt, { schema });
}

const response = await parseDoctorsNotes(
  "John Doe, 46 years. Had a cardiac arrest 2 years ago. 91kg, 184cm"
);

console.log(response.data);

/**
  Example output:

  {
    name: "John Doe",
    age: 46,
    weight: 91,
    height: 184,
    bmi: 26.86,
    bmiEnum: "overweight",
    existingConditions: ["cardiac arrest"]
  }
 */

```

This pattern is extremely useful for any boring, repetitive pattern your applications might have. Form filling is one of them and they can often be replaced with natural language parsing through LLMs.

## Warning: This code is meant for servers!

The code above uses an API key from OpenAI. You should never ever store these keys on your client-side applications. Always run them on a server environment.

The example here would work for `node`, `Deno`, or `bun`. The only thing that would change is probably how you import the dependencies and how you access your environment variable.

Most popular frontend frameworks, like `Next.js`, `Remix`, or `Svelte-Kit`, have ways to run server code either through server-side rendering or API routes. Use those!

By running this on the server you can safely handle your API keys, and you can even implement rate limiting mechanisms so that your clients don't hammer your LLM APIs.

## UX considerations

However, all of this technology needs to be used with a different UI/UX perspective in mind. AI is **not 100% reliable**. When you talk with any chat assistant they make sure to tell you that results might not be 100% correct and to take them with a grain of salt. But these usages of LLMs often don't pass this info to our users, so we have to do it ourselves.

In the real world, this doctor example should pre-fill an existing form component instead of just submitting this data somewhere. This way, doctors could double-check the info generated by the LLM before submitting.

And please make sure you are transparent with users about the use of AI and always make them opt-in or easy to bypass with a manual alternative!

## Final thoughts

I hope this discovery of zod-gpt unlocks some ideas for you! It might be an obvious solution for some, but for me and others, thinking about LLMs this way was truly mind-blowing.

This wouldn't be possible without the work of [David Zhang](https://github.com/dzhng), who created both the `llm-api` and `zod-gpt` packages! Thank you.
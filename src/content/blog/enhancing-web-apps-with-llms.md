---
title: "Enhancing web apps with LLMs"
date: 2023-12-18T00:00:00.000+00:00
description: Discover how to integrate ChatGPT and other LLMs into web apps with this guide. Learn about selecting LLM providers, using zod-gpt for JSON outputs, and implementing AI features with a focus on security and user experience.
keywords: openai, chatgpt, anthropic, llm, typescript, zod
---

It's been pretty much a year since ChatGPT became available to the general public. Time goes pretty fast. Today, OpenAI's products are better and faster than ever, and the competition is pretty healthy with alternatives like Anthropic (Amazon) and Bard (Google).

Most tech companies across the industry are either pivoting to AI or extending their products with AI features. This leaves us, the engineers of said companies, an entire new way of thinking about the products we build. Let's see what us, frontend (or just Javascript) folks can do to integrate these powerful tools with our existing web apps.

## Pick an LLM provider

The first step is to pick an LLM provider. Most tech companies already some sort of deal with some of the providers in the space right now, like OpenAI. If your companies is not in this situation, you can suggest one. I'm biased towards OpenAI. I like their enterprise agreement and their data protection policies. Also, their API is pretty intuitive.

You also need to keep costs in mind. If you work for a big company with a big budget for AI, just go ham. If not, you just need to craft your budget accordingly. LLM providers are pretty expensive and they offer NO free tiers.

Most companies are either providing said AI features only on their paid plans, or with a pretty strict daily/weekly/montly limit (like Notion). Some companies even do both things to limit costs.

For the sake of this blog post, let's move forward with the OpenAI API.

## How to get JSON out of LLMs

LLMs take human language and out comes... "more language". That's the basic "black box" behavior we can assume out of LLMs. This is no good if you are planning to integrate your existing APIs and systems with it right? How do we even go about parsing whatever comes out of the LLM?

Easy, we tell the LLM to output in JSON. Yes, that's a thing. You can literally ask ChatGPT to answer you back in JSON. Better even, you can tell ChatGPT (and most LLMs) to answer you back according to a specific JSON schema specification that you yourself provide.

Then, when it comes to type safety, there's even a cooler way you can do it. To validate stuff in runtime, you use `zod`. It's the most popular validation library nowadays. You can then convert your `zod` schema to a JSON schema (there are libraries for this) and use it to configure your own LLM integration.

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
    age: z.number().describe("The person age")
});

const response = await completion(openai, "Imagine a random person", { schema });

// data will be typed as { name: string; age: number }
console.log(response.data);
```

Internally, `zod-gpt` will make sure the output from the LLM matches your provided zod schema, and it will even retry in case it fails. It's also aware of rate limits and will wait accordingly!

## Some practical examples

Generating random people is not a very good use case, but, one of the best applications of these LLMs is taking natural text and converting into a structure.

For example, when I worked in healthcare tech, a popular challenge was taking doctor's notes and create structured data out of it. Here's how you could do it:

```ts
import z from "zod";
import { OpenAIChatApi } from "llm-api";
import { completion } from "zod-gpt";

const openai = new OpenAIChatApi(
  { apiKey: "YOUR-OPENAI-KEY" },
  { model: "gpt-3.5-turbo-16k" }
);

const schema = z.object({
  name: z.string().describe("The patient's name"),
  age: z.number().describe("The patient's age"),
  weight: z.number().describe("The patient's weight in kilograms"),
  height: z.number().describe("The patient's height in kilograms"),
  bmi: z.number().describe("The patient's BMI"),
  bmiEnum: z
    .enum(["underweight", "normal", "overweight", "obese", "very_obese"])
    .describe("The patient BMI in text format"),
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
  "Jonh Doe, 46 years. Had a cardiac arrest 2 years ago. 91kg, 184cm"
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
    existingConditions: [ "cardiac arrest" ]
  }
 */

```

This pattern is extremely useful for any boring, repetitive pattern your applications might have. Form filling is one of them and they can often be replaced with natural language parsing through LLMs.

## Warning: This code is meant for servers!

The code above uses a API key from OpenAPI. You should never ever store these keys on your client-side applications. Always run them on a server environment.

The example here would work for `node`, `Deno` or `bun`. The only thing that would change is probably how you import the dependencies and how you access your environemt variable.

Most popular frontend frameworks, like `Next.js`, `remix` or `svelte-kit` have ways to run server code either through server-side rendering or API routes. Use those!

By running this on the server you can safely handle your API keys, and you can even implement rate limiting mechanisms so that your clients don't hammer your LLM APIs.

## UX considerations

However, all of this technology needs to be used with a different UI/UX prespective in mind. AI is **not 100% reliable**. When you talk with any chat assistant they make sure to tell you that results might not be 100% correct and to take them with a grain of salt. But these usages of LLMs often don't pass this info to our users, so we have to do it ourselves.

In the real world, this doctor example, should pre-fill an existing form component instead of just submitting this data somewhere. This way, doctors could double check the info generated by the LLM before submitting.

And please make sure you are transparent with user's about the use of AI and always make them opt-in or easy to bypass with a manual alternative!

## Final thoughts

I hope this discovery of zod-gpt unlocks some ideas for you! It might be an obvious solution for some, but for me and others, thinking about LLMs this way was truly mind-blowing.

This wouldn't be possible without the work of [David Zhang](https://github.com/dzhng), who created both the `llm-api` and `zod-gpt` packages! Thank you.



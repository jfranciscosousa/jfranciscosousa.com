---
title: Typesafety with LLMs
date: 2023-12-10T00:00:00.000+00:00
description: TBD
keywords: openai, chatgpt, anthropic, llm, typescript, zod
---

It's been pretty much a year since ChatGPT became available to the general public. Time goes pretty fast. Today, OpenAI's products are better and faster than ever, and the competition is pretty healthy with alternatives like Anthropic (Amazon) and Bard (Google).

Most engineers across the industry, whether they are interested or not, are being pushed by their own companies to integrate with this new plethora of products, or in some extreme cases, roll out your own. Let's see what us, frontend (or just Javascript) folks can do to integrate these powerful tools with our existing web apps.

## Pick an LLM provider

I won't bother explaining how LLMs and AI stuff works. To me, a frontend engineer, the LLM provider I'll pick will work as a black box. I send it inputs, and out comes some stuff. I am aware though of the problems of using LLMs. Sometimes they just produce random gibberish. Results can be inaccurate and can quickly deteriorate confidence in your systems. This is a topic that I'll touch on later.

For the sake of these demonstrations, I'll pick OpenAI. I already have a ChatGPT subscription and I had some gifted credits to use. Remember, pretty much every single LLM provider is PAID. There are no free tiers that I know of. Yes, their chat interfaces are usually free but the APIs themselves are not. However, with all the experimentation I've been doing recently, I'm yet to pay more than a single dollar per month.

However, please do consider the costs of different LLM providers. Check with your boss how many credits you can use (chances are your company already has a deal with some LLM provider), or if you are a freelancer/indie hacker, plan your pricing models accordingly.

## Type safety, how?

LLMs take human language and out comes... some language. That's the basic "black box" behavior we can assume LLMs do. This is no good if you are planning to integrate with it right? How do we even go about parsing whatever comes out of the LLM?

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

## Some practical examples

Generating random people is not a very good solution, but, one of the best applications of these LLMs is taking natural text and converting into a structure.

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

## UX considerations

However, all of this technology needs to be used with a different UI/UX prespective in mind. AI is **not 100% reliable**. When you talk with any chat assistance they make sure to tell you that results might not be 100% correct and to take them with a grain of salt. But these usages of LLMs often don't pass this info to our users, so we have to do it ourselves.

In the real world, this doctor example, would probably pre-fill an existing form component instead of just submitting this data somewhere. This way, user's could double check the info generated by the LLM before submitting.

And please make sure you are transparent with user's about what is an AI feature and always make them opt-in or easy to bypass and go the manual route!

## Final thoughts

Have a merry christmas.

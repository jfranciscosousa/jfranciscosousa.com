---
title: Locale detection with remix.run
date: 2022-01-18T00:00:00.000+00:00
description: "Text content did not match", this surely happened at some point if using any Javascript API that accesses the default locale while server rendering. Let's fix it!
keywords: ssr, locale, remix, react, next.js
---

Lately I've been fooling around with [remix.run](https://remix.run) and server rendering apps instead of client-side only stuff. However, whenever I use stuff like `new Date(record.createdAt).toLocaleString()` we would get shifting date formats on the frontend and `Text content did not match` errors from React. This often happen in either Remix or Next.js, or any server rendering solution that is React-based. Let's see why it happens and how we can fix it.

## Why does this happen when SSR (server side rendering)?

This is really common for devs who are getting started with SSR and using Javascript APIs that access the locale, like `toLocaleString` on the `Date` API. Often times, the locale of the Node.js will not match the locale of your browser, so when your app server renders an HTML page, it will the default locale of that server, usually `en-us`. When your browser re-hydrates the page, it will use your default locale. It it doesn't match the `en-us` locale, most likely your `new Date(something).toLocaleString()` will be different than the server and you will get that warning, and you may sometimes even notice the date flashing back from one format to another.

## How can we fix then?

Well, the quick approach is just to hardcode `en-us` everywhere. Most locale based APIs accept as an argument a locale or an array of locales. If your website or app only is present in one language, it might be even a good idea to just show it with a single locale to avoid UI confusions. `new Date(something).toLocaleString("en-us")` would fix it by using that locale always on the server and the client.

However, most SSR frameworks are able to access the `headers` of an HTTP request, which means you can access the `Accept-Language` HTTP header! You can check out [in the MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language) what the header is and it's format. Essentially it tells servers the list of languages of the user.

Why a list though? Because most browsers allow you to set a list of preferred languages ordered by your own preference. Take a look at mine (you can access the page via [chrome://settings/languages](chrome://settings/languages)).

![My list of preferred languages: UK English, US English, English, Portuguese](/images/browser-languages.png)

My solution is simple, we get the header value from the request, then pass it into a `Provider`. Then we will create a hook to get the `locale` value whenever we need it. We will only extract the first language (the favorite one) from the user.

We will use the [accept-language-parser](https://www.npmjs.com/package/accept-language-parser) package to parse the header value. Let's install it

```bash
# use npm if you want
yarn add accept-language-parser

# if you are using typescript, this might be useful
yarn add --dev @types/accept-language-parser
```

Now, let's create our provider/context/hook combo. I'll put it under `app/hooks/useLocale.tsx`. Our default export is the hook, but we also export the provider so we can use it on the `root` file of `remix`.

```tsx
import { createContext, ReactNode, useContext } from "react";

const LocaleContext = createContext<string>(undefined as unknown as string);

export function LocaleProvider({
  children,
  locale,
}: {
  children: ReactNode;
  locale: string;
}) {
  return (
    <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
  );
}

export default function useLocale() {
  return useContext(LocaleContext);
}
```

Then create a new loader in your `root` file. Mine is in the `app/root.tsx` file. If you already have a loader, augment it with this one.

```tsx
import type { LoaderFunction } from "remix";
import acceptLanguage from "accept-language-parser";

export const loader: LoaderFunction = async ({ request }) => {
  const languages = acceptLanguage.parse(
    request.headers.get("Accept-Language") as string
  );

  // If somehow the header is empty, return a default locale
  if (languages?.length < 1) return "en-us";

  // If there is no region for this locale, just return the code
  if (!languages[0].region) return languages[0].code;

  return `${languages[0].code}-${languages[0].region.toLowerCase()}`;
};
```

Then, in your default export of the `root` file, wrap it with our provider.

```tsx
import { useLoaderData } from "remix";
import { LocaleProvider } from "~/hooks/useLocale";

export default function App() {
  const locale = useLoaderData();

  return (
    <LocaleProvider locale={locale}>
      {/* Whatever your default export already has here */}
    </LocaleProvider>
  );
}
```

And that's it. Any component on your `remix` routes can now use `useLocale` to get the current locale! An example:

```tsx
import useLocale from "~/hooks/useLocale";

export default function HomePage() {
  const locale = useLocale();

  return (
    <div>
      {1_000_000.toLocaleString(locale)}
    </div>
  );
}
```

Hope this solution is of use to you! You can see it in action [on my starter](https://github.com/jfranciscosousa/remix-prisma-starter) with `remix` and `prisma`.

Stay safe!

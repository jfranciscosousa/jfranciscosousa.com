---
title: A primer on the JAMstack
date: 2020-01-10T00:00:00.000+00:00
description: The JAMstack is not another boring tech-specific stack. It's a change
  of paradigm. A shift in how we develop web apps and websites. Check out more about
  it on this introductory blog post.
keywords: jamstack, netlify, vercel, eleventy, gatsby, next, web development, web design
---

_Originally posted [here](https://auroradigital.co/blog/articles/a-primer-on-the-jamstack) on my previous, but very nice, company [Aurora Digital](https://auroradigital.co/)._

Our own [website](https://auroradigital.co/) is a product of the JAMstack. Perhaps you have heard of it if you are a web developer, and if you are not, then this will probably remind you of that jam that your aunt gave you and you never even tasted it and how it's probably full of mold right now. Nevertheless, the JAMstack is not another boring tech-specific stack. It's a change of paradigm. A shift in how we develop web apps and websites.

## The usual web

Websites can be developed in all sorts of ways, but most are made by stitching together some HTML, JS, and CSS (the usual web stuff for those of you without a technical background). You drop a bunch of these files on a web server, and now everything is available on the web. Most times you need some way of representing dynamic content, a web page where the structure is the same but only the content changes. A website for a news agency perhaps will need to have a web page for each news article, something like:

> www.awewsomenews.com/news/old-man-wins-the-lottery
>
> (that's not a real URL by the way)

Usually, web servers have custom code to handle this, either written by a developer or enabled by some CMS, like Wordpress for example. When a user visits that URL, the webserver code takes the **old-man-wins-the-lottery** part of the URL, uses that to fetch the specific news article record, which is usually stored on a database, and builds an HTML page with that.

There, I just told you how most websites work.

This is perfectly fine, however, there are some underlying issues here. Using traditional web servers to serve your websites is usually a bad idea, at least if you do it yourself. The major issue is performance. If you are serving hundreds of thousands of web pages per second, one web server won't be enough.

## The new way

So what is the JAMstack? JAM stands for **Javascript, APIs, and Markup.**

But wait? That's basically what everyone nowadays uses. Yes, but... everything is served via static HTML files. So it becomes:

- **Javascript** - to make our websites feel and look dynamic
- **APIs** - our server-side processes and databases live here. They can be self-made or 3rd party
- **Markup** - the structure of our content, our assets and our dependencies, all pre-built and pre-rendered, deployed on a CDN

Rather than targeting specific frameworks, databases and operative systems, like most stack terminologies, the JAMstack ties itself to the core foundations of modern web applications, not tying developers to specific technologies.

**The JAMstack is a different philosophy.**

Instead of building your pages on a webserver on every request, you would have most of your website pages pre-built and deployed on a CDN. With this, you remove any overhead of maintaining and scaling web servers and or any kind of advanced infrastructure. Instead, you just have static files on a CDN, with super low response times, near-limitless scalability and geographical distribution, so everyone around the world would have a smooth experience while accessing your content.

Behind this core concept, you find the tool that is often associated with the JAMstack, the static site generator. Super in vogue, with most being optimized for instant page load and cutting edge optimizations, static site generators take your code and data sources and they turn it into static files, ready to be deployed to any CDN of your liking.

Most static site generators support all kinds of data sources. Your data may be extracted from any existing service or API that you may have. You can also use CMSs to layout your content, and you can even use... more static files! You can have your data laid out as static markdown files (or any type of file really) and import that on your static site generator.

Then you bundle it all in on a CI/CD pipeline, the only infrastructure you need to manage, that is responsible for rebuilding your website every time you update your code or your data and sending it into a CDN. That's why it's essential to keep track of your code on hosted git services, like Github, as they seamlessly integrate with most CI/CD pipelines to trigger builds. If you are using a CMS, you should also integrate it into this pipeline, so content changes also trigger a new build. Check out the [blogpost](https://medium.com/subvisual/its-not-continuous-delivery-yet-27a9e838f5df) about CI/CD from our friends at [Subvisual](https://subvisual.com 'Subvisual') if you need more info about the process!

If you feel intimidated by developing your own CI/CD pipeline you can use managed services like [Netlify](https://netlify.com 'Netlify') or [Now](https://zeit.co/ 'Now'). These platforms integrate directly with hosted git services like Github or Gitlab and they build and deploy your website into a CDN, making the entire process very easy. They also can manage domains, SSL certificates, reducing the entry barrier to production to a few clicks on their dashboards. They offer very generous free plans for developers and hobby projects also, making them a great tool to try out the JAMstack.

## Static is not boring

You still can develop highly interactive web applications by resorting more to APIs instead of generated static HTML. If you are not using third-party services, perhaps you still need to maintain some sort of web server and infrastructure to maintain your APIs, but still, the decoupling that you achieve now will allow you to be more productive and you still serve your frontend from a highly capable CDN, which will boost your performance all the same.

But even then, you can write your server-side code without servers, by resorting to **serverless** platforms, allowing you to deploy server-side code, without requiring any infrastructure whatsoever. Adding to their extensive feature set, Netlify and Now also support deploying serverless functions in Javascript and more languages.

And with modern browsers having a ton of features that were mostly unthinkable in the past, we can push more and more work to the client-side. [Speech recognition](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition), [3D graphics](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API),[ PWAs](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps), [Web Assembly](https://developer.mozilla.org/en-US/docs/WebAssembly) and many more tools are available on most browsers. Things that were possible only in native environments are now a reality on the web.

## Our stack

To build our [website](https://auroradigital.co/) we use a static site generator to build the entire website, and our blog posts are managed by a headless CMS. You can check out the source code in our [Github repo](https://github.com/aurora-digital/auroradigital.co). We use Gatsby as a static site generator and Forestry as our CMS. We then build everything using Netlify. With that, we have a wonderful development experience, that allows us to develop features and also fix bugs very quickly.

With near limitless scalability, we don't have to worry about scaling the website, it's just static files on a CDN. Super secure, our third parties all use Github's OAuth and are strictly audited. And finally, the developer experience is just amazing. All it takes is three steps to being able to contribute to our website: clone the git repository, install dependencies, run the bundled development server.

The JAMstack is here to stay, and we are putting it into use whenever we can, to build faster, more accessible and more secure websites. In the end, all that matters is our user's experience.

## Resources

You can check these resources and tools to find out more about JAMstack! Check out their blogs for tutorials, guides, and more advanced use cases.

### Static Site Generators

- [Gatsby](https://www.gatsbyjs.org/ 'Gatsby')
- [Next](https://nextjs.org/ 'Next')
- [Hugo](https://gohugo.io/ 'Hugo')
- [Eleventy](https://www.11ty.dev/ 'Eleventy')

### CMSs

- [Forestry](https://forestry.io 'Forestry')
- [Contentful](https://www.contentful.com/ 'Contentful')
- [Sanity](https://www.sanity.io/ 'Sanity')

### Platforms

- [Netlify](https://www.netlify.com/ 'Netlify')
- [Now by Zeit](https://zeit.co/ 'Now by Zeit')

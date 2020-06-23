---
layout: layouts/post.njk
tags: posts
title: Dealing with webfont loading
date: 2020-06-23
description: Let's dive in on ways to make handling webfont loading as smooth as possible.
---

You've designed a beautiful website, or your designer made a beautiful website design and then you get to implement it. It has a great font, a Webfont obviously. You go to Google Fonts or Adobe's Typekit or you just buy one and self host it. Then once you start writing code and previewing its results you notice one little pickle: the whole website shifts and flashes and janks all over the place when you refresh it or open it from a cold cache. That ain't pretty. Let's see how we can attenuate those effects.

## FOUT & FOIT

You probably heard of these terms, but if you didn't, every time you search for these kinds of issues on the web you will most likely find these acronyms: FOIT or FOUT.

They basically translate into:
* FOUT - flash of unstyled text. When your whole typography flashes from an unstyled state to your web font style
* FOIT - flash of invisible text. When your whole website has no fonts rendered until your web font loads.

An example, with FOIT on the left and FOUT on the right.

![FOIT vs FOUT](/images/fonts-side-by-side.gif)

All these issues boil down to one problem. What the hell does your browser do while your web font loads?

Let's remember what `font-family` does:

```css
html {
  font-family: "MyRadWebfont", Arial, sans-serif;
}
```

You are basically telling the browser to use my `MyRadWebFont` first, then `Arial` and finally, if none of these are available, any `sans-serif` font the user's device might have. `Arial` is safe because it's a font that's included in every major browser.

While the web font is loading, you either get a FOIT or FOUT. It usually depends on the user's browser. A couple of years ago most browsers applied the FOIT approach, detecting if the website is using a web font and then waiting for it until it becomes available and then swapping the invisible text with the font. Then, some browsers, mainly Firefox, started defaulting to the FOUT approach, to make sure users could see some text while fonts loaded.

At the time, if you wanted some control over this behavior, you had to do it yourself with custom Javascript, but nowadays there's a way to do it easily.

## `font-display` to the rescue

`font-display` is a relatively recent CSS property that can be used to control the way web fonts are loaded and how their fallback is handled. It has awesome [browser support](https://caniuse.com/#search=font-display). Of course, it doesn't work on IE. Life's not always great.

The property takes on these values:
* block - renders nothing at first, then shows the web font. If the web font loading timeouts, it shows the fallback font. An expected FOIT;
* swap - renders the fallback, then swaps when the web font is loaded. An expected FOUT;
* fallback - same thing as swap, but if the web font takes to long to load, it doesn't swap and it keeps the fallback. FOUT if it doesn't timeout;
* optional - this one is tricky. It's exactly the same as the fallback, but the browser *decides* if we have the ideal conditions to download web fonts. If we are on a slow internet connection, for example, the browser won't download it.

This is a short version of the explanation. You check out Monica's in-depth explanation, demo (and there is even a talk!) on [this website](https://font-display.glitch.me/).

Still, the same FOIT and FOUT happen, but now at least it's predictable. And you ensure all users will get the same behavior (as long as their browsers support the `font-display`).

And, if you use a font provider not named **Google Fonts**, chances are, you cannot specify a `font-display` property. Most font providers give you a CSS file with `@font-face` declarations, and you cannot modify it, and therefore, you cannot add the `font-display` property to it. This is an issue with Typekit (which I use at work all the time), where you cannot apply the `font-display` property. If you self host your fonts though, all is fine.

Then the only solution that's left is actually handling this stuff with Javascript. Controversial, but I'm gonna try and spin up a solution with a progressive enhancement mindset. Works great if you have JS, still works as expected without JS.

## Smoothing out the FOIT

I've had this idea where we knowingly apply a FOIT, by hiding the entire website until the font is available, and then fading in the entire thing.

We can use the `opacity` property for that and then we'll apply a simple `transition`. All with CSS. Then we somehow apply these styles with JS after the font is loaded.

So. I'll show the example that is powering my own website, you can check the entire source code on [my Github repo](https://github.com/jfranciscosousa/jfranciscosousa.com), which is an Eleventy + Webpack project.

First, we need to set up [fontfaceobserver](https://github.com/bramstein/fontfaceobserver), either with your favorite JS package manager or add it via [CDN](https://cdnjs.com/libraries/fontfaceobserver). Works on IE with a `Promise` polyfill. It's a small dependency, just 1.3kb gzipped.

The code:
```js
// if you can't require packages, load it via a CDN
const FontFaceObserver = require("fontfaceobserver");

const htmlElement = document.documentElement;

htmlElement.classList.remove("no-js");
htmlElement.classList.add("has-js");

function applyHasFont() {
  htmlElement.classList.remove("no-font");
  htmlElement.classList.add("has-font");
}

new FontFaceObserver("Muli").load().then(() => {
  applyHasFont();
});

setTimeout(applyHasFont, 2000);
```

With this, we replace a `no-js` class with a `has-js` class when the script is loaded. Then, we replace a `no-font` with a `has-font` class when we load our font, `Muli`. We also apply the `has-font` class after a 2-second timeout, just in case the user's internet is really slow and can't download the font in an acceptable time. The second argument of the `FontFaceObserver` constructor is the desired timeout in milliseconds. After that time elapses, the `load` function errors.

Then, on the CSS side of things:

```css
@import url("https://fonts.googleapis.com/css2?family=Muli:wght@200..900&display=swap");

html {
  font-family: "Muli", Arial, sans-serif;
}

.has-js.no-font {
  opacity: 0;
}

.has-js.has-font {
  transition: opacity 0.5s;
}
```

Notice that we only apply the styles **if** we have JS. This way, people that (for some reason) have their Javascript disabled, still can see the website. We are passing `display=swap` to the Google Fonts API, so that on the lack of Javascript, this will fall back to the `swap` behavior.




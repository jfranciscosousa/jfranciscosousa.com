---
layout: layouts/post.liquid
tags: posts
title: Dealing with webfont loading
date: 2020-06-25
description: Webfonts are amazing, but most websites using them suffer from weird layout shifts and flashes of unstyled or inivisble text. Let's dive in on ways to attenuate that and make your initial website load smoother.
keywords: webfonts, foit, fout, google fonts, typekit, web development, web design
---

The time has come to implement a beautiful website design. It has a great Webfont. So you go to Google Fonts or Adobe's Typekit or you just buy one and self host it. But once you start writing code and previewing its results, you notice one _little_ pickle: the whole website shifts, flashes, and janks all over the place when refreshed or opened from a cold cache. It ain't pretty. Let's see how we can attenuate those effects.

## FOIT & FOUT

FOIT and FOUT are acronyms likely to pop up when you search for the issues above. If you haven't heard of them before, this is what they mean:

- FOIT - flash of invisible text. When the website has no fonts rendered until the web font loads.
- FOUT - flash of unstyled text. When the whole typography flashes from an unstyled state to your web font style.

Examples of FOIT (left) and FOUT (right).

![FOIT vs FOUT](/images/fonts-side-by-side.gif)

These issues are manifestations of a root problem. What the hell does your browser do while your web font loads?

Let's remember what `font-family` does:

```css
html {
	font-family: 'MyRadWebfont', Arial, sans-serif;
}
```

You are telling the browser to use `MyRadWebFont` first, then `Arial` and, if none of these are available, any `sans-serif` font the user's device might have. `Arial` is a safe bet because it's a font that's included in every major browser.

While the web font is loading, you either get a FOIT or FOUT. It usually depends on the user's browser. A couple of years ago, most browsers applied the FOIT approach, detecting if the website is using a web font and then waiting for it until it becomes available and then swapping the invisible text with the font. Then, some browsers (mainly Firefox) started defaulting to the FOUT approach, to make sure users could see some text while fonts loaded.

At the time, if you wanted control over this behavior, you had to do it yourself with custom Javascript. Nowadays, there's an easy way to do it.

## `font-display` to the rescue

`font-display` is a somewhat recent CSS property that can be used to control the way web fonts are loaded and how their fallback is handled. It has awesome [browser support](https://caniuse.com/#search=font-display). However, it doesn't work on IE. What a surprise.

The property takes on these values:

- **block** - renders nothing at first, then shows the web font. If the web font loading timeouts, it shows the fallback font. An expected FOIT;
- **swap** - renders the fallback, then swaps when the web font is loaded. An expected FOUT;
- **fallback** - same as swap, but if the web font takes too long to load, it doesn't swap and it keeps the fallback. FOUT if it doesn't timeout;
- **optional** - same as fallback, but the browser _decides_ if the ideal conditions to download web fonts are present. On a slow internet connection, for example, the browser won't download it.

This is the gist of it. You can check out Monica's in-depth explanation, demo, and talk [on this website](https://font-display.glitch.me/).

Still, the same FOIT and FOUT happen, but now at least it's predictable. And you ensure all users will get the same behavior (as long as their browsers support the `font-display`).

If you don't use **Google Fonts**, you might be unable to specify a `font-display` property. Most font providers give you a CSS file with `@font-face` declarations that you cannot modify, meaning you cannot add the `font-display` property to it. This is an issue with Typekit (which I use at work all the time), where you cannot apply the `font-display` property. If you self host your fonts though, all is fine.

Then the only solution that's left is actually handling this stuff with Javascript. Controversial, but I'm gonna try and spin up a solution with a progressive enhancement mindset. Works great if you have JS, still works as expected without JS.

## Smoothing out the FOIT

I've had this idea where we knowingly apply a FOIT, by hiding the entire website until the font is available, and then fading in the entire thing. The regular FOIT behavior is a bit ugly, because you still have parts of the website rendered and then the whole thing janks and becomes visible. With this, we nicely fade in the entire website and avoid layout shifts.

We can use the `opacity` property for that and then we'll apply a simple `transition`. All with CSS. Then we somehow apply these styles with JS after the font is loaded.

So, I'll exemplify with what is powering my own website. The source code is available on [my Github repo](https://github.com/jfranciscosousa/jfranciscosousa.com), which is an Eleventy + Webpack project.

First, we need to set up [fontfaceobserver](https://github.com/bramstein/fontfaceobserver), either with your favorite JS package manager or by adding it via [CDN](https://cdnjs.com/libraries/fontfaceobserver). Works on IE with a `Promise` polyfill. It's a small dependency, just 1.3kb gzipped.

The code:

```js
// if you can't require packages, load it via a CDN
const FontFaceObserver = require('fontfaceobserver');

const htmlElement = document.documentElement;

htmlElement.classList.remove('no-js');
htmlElement.classList.add('has-js');

function applyHasFont() {
	htmlElement.classList.remove('no-font');
	htmlElement.classList.add('has-font');
}

new FontFaceObserver('Muli', 2000)
	.load()
	.then(() => {
		applyHasFont();
	})
	.catch(() => applyHasFont());
```

With this, we replace a `no-js` class with a `has-js` class when the script is loaded. Then, we replace a `no-font` with a `has-font` class when we load our font, `Muli`. We also apply the `has-font` class after a 2-second timeout, just in case the user's internet is really slow and can't download the font in an acceptable time. The second argument of the `FontFaceObserver` constructor is the desired timeout in milliseconds. After that time elapses, the `load` function errors.

Then, on the CSS side of things:

```css
@import url('https://fonts.googleapis.com/css2?family=Muli:wght@200..900&display=swap');

html {
	font-family: 'Muli', Arial, sans-serif;
}

.has-js.no-font body {
	opacity: 0;
}

.has-js.has-font body {
	opacity: 1;

	transition: opacity 0.5s;
}
```

Also don't forget to add the default classes to the HTML document:

```html
<html class="no-js no-font">
	...
</html>
```

Notice that we only apply the styles **if** we have JS. This way, people that (for some reason) have their Javascript disabled, still can see the website. We are passing `display=swap` to the Google Fonts API, so that on the lack of Javascript, this will fall back to the `swap` behavior.

## Wrapping up

I hope this post has been helpful. Personally, I avoid reinventing the wheel with JS for features that can be handled with just CSS, but in this case, a nice compromise can be reached. It respects all users in terms of connection speed and Javascript capabilities and supports different browsers.

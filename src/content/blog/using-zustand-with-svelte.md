---
title: Using zustand with Svelte
date: 2022-10-09T00:00:00.000+00:00
description: Svelte stores are amazing, but so are zustand stores. Let's check how to take your Svelte apps state management to the next level by combining the two!
keywords: svelte, zustand, stores, frontend, javascript, react
---

[zustand](https://github.com/pmndrs/zustand) is an excellent library primarily used in the React community. It's my go-to choice for any shared state management in React due to its ease of use, and for being a solution to most shared state issues like [zombie childs](https://react-redux.js.org/api/hooks#stale-props-and-zombie-children), [react concurrency](https://github.com/bvaughn/rfcs/blob/useMutableSource/text/0000-use-mutable-source.md), and [context loss](https://github.com/facebook/react/issues/13332) between mixed renderers.

For these same reasons, I also started using it in some Svelte projects. I like how short and simple most `zustand` stores look. Even though Svelte built-in store mechanisms are excellent, we can go up a level by combining the vanilla solution and `zustand`. We can have the best of both worlds.

## What's a Svelte store?

According to [Svelte's docs](https://svelte.dev/tutorial/writable-stores), which I recommend reading, a Svelte store can be any object with a subscribe method. However, it's recommended that you use Svelte's tools to create `writable`, `readable`, `derived`, or custom stores. Personally, I most often default to custom stores.

An example of one such store:
```ts:src/lib/counter.store.ts
import { writable } from 'svelte/store';

function createCount() {
  const { subscribe, set, update } = writable<number>(0);

  return {
    subscribe,
    increment: () => update((n) => n + 1),
    reset: () => set(0)
  };
}

const countStore = createCount();

export default countStore;
```

To use the store in Svelte, you can do this:

```svelte:src/routes/+page.svelte
<script>
  import counterStore from '../lib/counter.store';
</script>

<h1>Welcome!</h1>
<p>{$counterStore}</p>
<button on:click={() => counterStore.increment()}>Click</button>
```

The good thing about native Svelte stores is the `auto-subscription` feature. Within a Svelte component, you can automatically use the dollar sign to subscribe to a Svelte store. In the markup we use `$counterStore`. This allows us to read the store value immediately and react to its updates. That markup will always contain the latest `$counterStore` value.

In this example, our value is just a number, but the store's value can be anything, an object even!

## Zustand

These Svelte stores are more than good enough! I've shipped production apps that used this to great effect. However, `zustand` has some advantages that can be very useful! You can connect `zustand` stores to Redux devtools using their `devtools` middleware. There is also a [middleware](https://docs.pmnd.rs/zustand/recipes/recipes#persist-middleware) that you can use to persist any store with any storage provider. You can also easily craft your middleware, for example, to [connect your store to the URL hash](https://docs.pmnd.rs/zustand/guides/connect-to-state-with-url-hash) to save filters on a complex table component.

Let's turn our previous `counter` store into a `zustand` store:

```ts:src/lib/counter.store.ts
import create from 'zustand/vanilla';
import zustandToSvelte from './zustandToSvelte';

export interface CounterState {
  value: number;
  increment: () => void;
}

const counterStore = create<CounterState>((set) => ({
  value: 0,
  increment: () => set((state) => ({ value: state.value + 1 }))
}));

export default counterStore;
```

`zustand` can infer types from your store (if you use their `combine` utility), but it's recommended to write them yourself. You must also type the actions themselves, as values and actions are all part of the store.

Still, this is not ready to be used by Svelte. We need to turn this into a native store first! `zustand` stores have a `subscribe` method, but it's not natively compatible with Svelte. Let's create a wrapper that turns a `zustand` store into a compatible Svelte store.

```ts:src/lib/zustandToSvelte.ts
import { readable } from 'svelte/store';
import type { StoreApi } from 'zustand';

export default function zustandToSvelte<StateType>(zustandStore: StoreApi<StateType>) {
  const svelteStore = readable(zustandStore.getState(), (set) => {
    zustandStore.subscribe((value) => set(value));
  });

  return {
    ...zustandStore,
    subscribe: svelteStore.subscribe
  };
}
```

Here we create a readable Svelte store from our zustand store. `readable` takes two arguments: the initial state and a function that can `set` the state of the readable. In this function, we can `subscribe` to our store and `set` the state of the native Svelte readable store.

Then, we return the original `zustandStore` with the overridden `subscribe` method from our readable Svelte store. `zustand` subscribe doesn't work by default on Svelte components. That's why we need to go through all of these steps.

We can then use our store like this:

```svelte:src/routes/+page.svelte
<script>
  import counterStore from '../lib/counter.store';
</script>

<h1>Welcome!</h1>
<p>{$counterStore.value}</p>
<button on:click={() => $counterStore.increment()}>Click</button>
```

Unlike a native Svelte store, the whole store object must be subscribed to. In our native example, you can call `counterStore.increment()` without the dollar sign. With these new zustand stores, you'll always have to use the dollar sign: `$counterStore.increment()`.

Outside of Svelte components, you can use its methods as usual:
```ts
import counterStore from '../lib/counter.store';

// You can peek into the state or even call some actions
counterStore.getState().increment()

console.log(counterStore.getState().value)

// You can set the state
counterStore.setState({ value: 0 })

// You can also subscribe to it!
counterStore.subscribe((state) => console.log(state));
```

## Final thoughts

To be honest, `Svelte` custom stores are almost as powerful as `zustand`. I'm just more familiar with the latter, and their middleware tools are also a great nice to have. However, this pattern can be applied to many state management technologies. Whether you have some `redux` store or `xstate` machine that you want to use within Svelte components, you can reach for `svelte/readable` to try and make it work!

Stay safe!

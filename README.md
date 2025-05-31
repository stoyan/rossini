# Rossini

A minimal (less than 1K minified) DOM manipulation utility. 

The goal is to make the most common DOM tasks a little less verbose.

## Get

```sh
npm install rossini
```

or 

```html
<script src="../dist/rossini.umd.js"></script>
```

or 

```html
<script src="https://unpkg.com/rossini@latest/dist/rossini.umd.js"></script>

```


## Use

```js
// module
import { que, on, el, E } from 'rossini';

// commonjs
const { que, on, el, E } = require('rossini');

// browser
const {el, on, que, E} = window.rossini;
```

See `examples/tell.html` for more usage examples

## Scope

3 functions and an enum. 

## que(selector)

Pronounced `ke` as in "what?" in Spanish is an alias for `document.querySelector`

```
const b = que('#mybutton');
```

## el(tagName, attributes, ...children)

This is a convenience when creating DOM elements (hence `el`) with the goal to save some verbosity like `createElement()`, `setAttribute()` and `append()`. It returns the newly created element, ready to be added to the DOM.

```js
const br = el('hr');
const h1 = el('h1', {id: 'myhead'}, 'Hello from my Rossini!');
```

The `children` spread allow any number of elements (created with `el()` or not) or a string. If it's a string a text node is created and appended.

```js
document.body.append(
  el('div', null, el('p', {id: "para"}, 'Paragraph text'))
);

document.body.append(
  el('div', null, 
    el('p', {id: "para"}, 'Paragraph text'),
    el('span', {}, 'More text'),
  ),
);
// yes, I like trailing commas
```

The API follows pretty closely React's `createElement()` which is what creates elements behind the JSX sugar.

## on(elementOrSelector, eventName, callback)

This is a wrapper for addEventListener plus some extras:

 * It returns a function that contains `removeEventListener` so you can cleanup and tap memory leaks
 * The callback receives (in addition to the Event) also the element. This is convenient when you have nested elements and the `event.target` is not the element but a child

```js
on('#myButton', 'click', console.log);
on(document, 'DOMContentLoaded', (event, element) => console.log(event, element));
```

## E

This is an enumeration of the 3 most common event names. Goals:

 * Catch typos early, no one wants to debug why the `laod` event isn't firing
 * Benefit from your IDE's autocomplete
 * Typing `click` is a muscle memory but using `pointerdown` is better
 * `DOMContentLoaded` abbreviation
 
```js
on('#myButton', E.click, console.log);
on(document, E.dcl, console.log);
on(window, E.load, console.log);
```

## Why the name Rossini?

I was half asleep when I thought of this micro-library and, while still in bed, I started designing the API in my head.

Gioachino Rossini, the prolific Italian opera composer, was known for his habit of finishing an aria in the morning while still in bed.

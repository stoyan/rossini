'use strict';

/**
 * Queries the DOM for the first element matching the given CSS selector.
 * This is an alias for `document.querySelector()`.
 *
 * @param {string} selector - The CSS selector string (e.g., '#myId', '.myClass', 'div.active')
 * @returns {Element | null} The first `Element` that matches the selector, or `null` if no element is found
 */
const que = (selector) => document.querySelector(selector);

/**
 * Attaches an event listener to a DOM element.
 * Can accept either a CSS selector string or a direct DOM element.
 *
 * @param {string|Element} selectorOrElement - The CSS selector string or the DOM element itself.
 * @param {string} eventName - The name of the event (e.g., 'click', E.click).
 * @param {function(Event, Element): void} callback - The function to execute when the event occurs.
 * It receives the Event object and the matched Element.
 * @returns {function(): void|null} A cleanup function to remove the listener, or null if no element was found.
 */
const on = (selectorOrElement, eventName, callback) => {
  let element = null;

  if (typeof selectorOrElement === 'string') {
    element = que(selectorOrElement);
  } else if (selectorOrElement instanceof Node) {
    element = selectorOrElement;
  } else {
    return null;
  }

  if (!element) {
    return null;
  }
  const eventHandler = (event) => {
    callback(event, element);
  };

  element.addEventListener(eventName, eventHandler);

  return () => {
    element.removeEventListener(eventName, eventHandler);
  };
};

/**
 * Creates a new DOM element with specified tag, attributes, and children.
 * Children can be passed as separate arguments following the `attributes` argument
 *
 * @param {string} tagName - The HTML tag name (e.g., 'div', 'p')
 * @param {Object} [attributes={}] - An optional object of attributes (e.g., { id: 'myId', class: 'my-class' })
 * @param {...(string|Node)} children - Any number of child nodes: strings (for text nodes) or DOM elements
 * @returns {HTMLElement} The newly created DOM element
 */
const el = (tagName, attributes = {}, ...children) => {
  const element = document.createElement(tagName);

  for (const key in attributes) {
    if (attributes.hasOwnProperty(key)) {
      element.setAttribute(key, attributes[key]);
    }
  }

  children.forEach((child) => {
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child));
    } else if (child instanceof Node) {
      element.appendChild(child);
    }
  });

  return element;
};

/**
 * Object containing common DOM event names to minimize string typing and typos
 * @readonly
 * @enum {string}
 */
const E = {
  click: 'pointerdown',
  load: 'load',
  DOMContentLoaded: 'DOMContentLoaded',
  dcl: 'DOMContentLoaded',
};

export {que, on, el, E};

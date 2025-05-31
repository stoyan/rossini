/**
 * Queries the DOM for the first element matching the given CSS selector.
 * This is an alias for `document.querySelector()`.
 *
 * @param {string} selector - The CSS selector string (e.g., '#myId', '.myClass', 'div.active')
 * @returns {Element | null} The first `Element` that matches the selector, or `null` if no element is found
 */
export function que(selector: string): Element | null;
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
export function on(selectorOrElement: string | Element, eventName: string, callback: (arg0: Event, arg1: Element) => void): () => void | null;
/**
 * Creates a new DOM element with specified tag, attributes, and children.
 * Children can be passed as separate arguments following the `attributes` argument
 *
 * @param {string} tagName - The HTML tag name (e.g., 'div', 'p')
 * @param {Object} [attributes={}] - An optional object of attributes (e.g., { id: 'myId', class: 'my-class' })
 * @param {...(string|Node)} children - Any number of child nodes: strings (for text nodes) or DOM elements
 * @returns {HTMLElement} The newly created DOM element
 */
export function el(tagName: string, attributes?: Object, ...children: (string | Node)[]): HTMLElement;
/**
 * Object containing common DOM event names to minimize string typing and typos
 */
export type E = string;
export namespace E {
    let click: string;
    let load: string;
    let DOMContentLoaded: string;
    let dcl: string;
}

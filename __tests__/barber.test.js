const {el, que, on, E} = require('../dist/rossini.cjs.js');

describe('el function', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  test('should create a basic element with correct tag name', () => {
    const div = el('div');
    expect(div.tagName).toBe('DIV');
    expect(div instanceof HTMLDivElement).toBe(true);
  });

  test('should create an element with attributes', () => {
    const button = el('button', {id: 'test-btn', class: 'my-class'});
    expect(button.id).toBe('test-btn');
    expect(button.classList.contains('my-class')).toBe(true);
    expect(button.getAttribute('id')).toBe('test-btn');
  });

  test('should create an element with text content', () => {
    const p = el('p', {}, 'Hello World');
    expect(p.textContent).toBe('Hello World');
    expect(p.childNodes.length).toBe(1);
    expect(p.firstChild.nodeType).toBe(Node.TEXT_NODE);
  });

  test('should create an element with a single child element', () => {
    const span = el('span');
    const div = el('div', {}, span);
    expect(div.tagName).toBe('DIV');
    expect(div.children.length).toBe(1);
    expect(div.firstElementChild.tagName).toBe('SPAN');
    expect(div.firstElementChild).toBe(span);
  });

  test('should create an element with multiple mixed children', () => {
    const h2 = el('h2', {}, 'Title');
    const p = el('p', {}, 'Paragraph text.');
    const container = el('div', {}, h2, 'Some text', p);

    expect(container.children.length).toBe(2); // h2 and p are elements
    expect(container.childNodes.length).toBe(3); // h2, text node, p
    expect(container.firstElementChild).toBe(h2);
    expect(container.lastElementChild).toBe(p);
    expect(container.childNodes[1].nodeType).toBe(Node.TEXT_NODE);
    expect(container.childNodes[1].textContent).toBe('Some text');
  });
});

describe('que function', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="root">
        <span class="item">Item 1</span>
        <p class="item">Item 2</p>
      </div>
    `;
  });

  test('should return the first element matching the selector', () => {
    const root = que('#root');
    expect(root).not.toBeNull();
    expect(root.tagName).toBe('DIV');
  });

  test('should return null if no element matches the selector', () => {
    const nonExistent = que('#non-existent');
    expect(nonExistent).toBeNull();
  });

  test('should return the first of multiple matching elements', () => {
    const firstItem = que('.item');
    expect(firstItem).not.toBeNull();
    expect(firstItem.tagName).toBe('SPAN');
    expect(firstItem.textContent).toBe('Item 1');
  });
});

describe('on function', () => {
  let button;
  let cleanup; // To hold the cleanup function returned by 'on'
  let mockCallback;

  beforeEach(() => {
    document.body.innerHTML = '<button id="myButton">Click Me</button>';
    button = que('#myButton');
    mockCallback = jest.fn();
  });

  afterEach(() => {
    if (cleanup) {
      cleanup();
      cleanup = null;
    }
    jest.clearAllMocks();
  });

  test('should attach an event listener and call the callback with event and element', () => {
    cleanup = on('#myButton', 'click', mockCallback);

    // Simulate a click
    button.click();

    expect(mockCallback).toHaveBeenCalledTimes(1);
    // first arg is Event, second is the element
    expect(mockCallback).toHaveBeenCalledWith(expect.any(Event), button);
    expect(mockCallback.mock.calls[0][1]).toBe(button);
  });

  test('should return a cleanup function that removes the event listener', () => {
    cleanup = on('#myButton', 'click', mockCallback);

    button.click();
    expect(mockCallback).toHaveBeenCalledTimes(1);

    cleanup();
    cleanup = null; // you're welcome, GC

    button.click();
    expect(mockCallback).toHaveBeenCalledTimes(1); // still 1
  });

  test('should return null if the selector does not find an element', () => {
    const result = on('#nonExistent', 'click', mockCallback);
    expect(result).toBeNull();
    expect(mockCallback).not.toHaveBeenCalled();
  });

  test('should handle multiple listeners on the same element', () => {
    const mockCallback2 = jest.fn();
    cleanup = on('#myButton', 'click', mockCallback);
    const cleanup2 = on('#myButton', 'click', mockCallback2);

    button.click();

    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback2).toHaveBeenCalledTimes(1);

    cleanup();
    button.click(); // Only the second listener should fire
    expect(mockCallback).toHaveBeenCalledTimes(1); // Still 1
    expect(mockCallback2).toHaveBeenCalledTimes(2); // Now 2

    cleanup2(); // Remove the second listener
    button.click(); // No listeners should fire

    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback2).toHaveBeenCalledTimes(2);
  });

  test('should confirm E constants have expected string values', () => {
    expect(E.click).toBe('pointerdown');
    expect(E.load).toBe('load');
    expect(E.DOMContentLoaded).toBe('DOMContentLoaded');
    expect(E.dcl).toBe('DOMContentLoaded');
    expect(E.dcl).toBe(E.DOMContentLoaded);
  });
});

// Jest setup file
require('@testing-library/jest-dom');

// Mock fetch globally
global.fetch = jest.fn();

// Mock console methods to avoid noise in tests
global.console = {
  ...console,
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

// Mock DOM APIs
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  },
  writable: true,
});

// Mock HTML elements that might not exist in tests
global.document.getElementById = jest.fn((id) => {
  const mockElement = {
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    click: jest.fn(),
    focus: jest.fn(),
    blur: jest.fn(),
    value: '',
    textContent: '',
    innerHTML: '',
    checked: false,
    disabled: false,
    style: {},
    classList: {
      add: jest.fn(),
      remove: jest.fn(),
      contains: jest.fn(),
      toggle: jest.fn(),
    },
    appendChild: jest.fn(),
    removeChild: jest.fn(),
    querySelector: jest.fn(() => ({
      value: '',
      checked: false,
      addEventListener: jest.fn(),
      setAttribute: jest.fn(),
      getAttribute: jest.fn()
    })),
    querySelectorAll: jest.fn(() => []),
    getAttribute: jest.fn(),
    setAttribute: jest.fn(),
    removeAttribute: jest.fn(),
    children: [],
    options: []
  };
  return mockElement;
});

// Mock window.location
delete window.location;
window.location = {
  href: 'http://localhost:8080',
  origin: 'http://localhost:8080',
  pathname: '/',
  search: '',
  hash: '',
  reload: jest.fn(),
};

// Reset all mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
  fetch.mockClear();
});

const originalConsoleWarn = console.warn.bind(console);
console.warn = function(...args) {
  if (typeof args[0] === 'string' && args[0].includes('received an unexpected slot "default"')) {
    return;
  }
  originalConsoleWarn(...args);
};

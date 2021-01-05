(() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mocked = jest.createMockFromModule('../readPosts') as any;

  let deferredResolve: (x: any) => void;

  mocked.resolve = (x: any) => deferredResolve(x);

  mocked.default = async () => {
    return new Promise((resolve) => {
      deferredResolve = resolve;
    });
  };

  module.exports = mocked;
})();

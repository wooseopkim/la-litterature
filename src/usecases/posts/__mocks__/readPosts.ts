(() => {
  const mocked = jest.createMockFromModule('./readPosts') as any;

  let deferredResolve;

  mocked.resolve = (x) => deferredResolve(x);

  mocked.default = async () => {
    return new Promise((resolve) => {
      deferredResolve = resolve;
    });
  }

  module.exports = mocked;
})();

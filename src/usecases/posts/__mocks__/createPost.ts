(() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mocked = jest.createMockFromModule('../createPost') as any;

  let deferredResolve: () => void;
  let deferredReject: () => void;

  mocked.resolve = () => deferredResolve();
  mocked.reject = () => deferredReject();

  mocked.default = async () => {
    return new Promise<void>((resolve, reject) => {
      deferredResolve = resolve;
      deferredReject = reject;
    });
  };

  module.exports = mocked;
})();

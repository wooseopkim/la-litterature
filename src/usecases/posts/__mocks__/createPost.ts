(() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mocked = jest.createMockFromModule('../createPost') as any;

  let deferredResolve: () => void;
  let deferredReject: (x: any) => void;

  mocked.resolve = () => deferredResolve();
  mocked.reject = (x: any) => deferredReject(x);

  mocked.default = async () => {
    return new Promise<void>((resolve, reject) => {
      deferredResolve = resolve;
      deferredReject = reject;
    });
  };

  module.exports = mocked;
})();

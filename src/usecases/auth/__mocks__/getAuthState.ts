(() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mocked = jest.createMockFromModule('../getAuthState') as any;

  let deferredResolve: (x: any) => void;
  let deferredReject: () => void;

  mocked.resolve = (x: any) => deferredResolve(x);
  mocked.reject = () => deferredReject();

  mocked.default = async () => {
    return new Promise((resolve, reject) => {
      deferredResolve = resolve;
      deferredReject = reject;
    });
  };

  module.exports = mocked;
})();

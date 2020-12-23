(() => {
  const mocked = jest.createMockFromModule('./getAuthState') as any;

  let deferredResolve;
  let deferredReject;

  mocked.resolve = (x) => deferredResolve(x);
  mocked.reject = () => deferredReject();

  mocked.default = async () => {
    return new Promise((resolve, reject) => {
      deferredResolve = resolve;
      deferredReject = reject;
    });
  }

  module.exports = mocked;
})();

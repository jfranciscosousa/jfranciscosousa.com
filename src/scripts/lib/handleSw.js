const { navigator } = window;

module.exports = {
  init: () => {
    // unregister existing service workers
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((registration) => registration.unregister());
    });
  },
};

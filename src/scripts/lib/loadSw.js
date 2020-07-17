const { navigator, location } = window;

module.exports = {
  init: () => {
    if ("serviceWorker" in navigator && location.hostname !== "localhost") {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/service-worker.js");
      });
    }

    if (location.hostname === "localhost") {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => registration.unregister());
      });
    }
  },
};

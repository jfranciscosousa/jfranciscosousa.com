const { navigator, location } = window;
const SERVICE_WORKER_PATH = "/service-worker.js";

module.exports = {
  init: () => {
    if ("serviceWorker" in navigator && location.hostname !== "localhost") {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register(SERVICE_WORKER_PATH);
      });
    }

    if (location.hostname === "localhost") {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => registration.unregister());
      });
    }
  },
};

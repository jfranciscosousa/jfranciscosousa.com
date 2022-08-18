import "vite/client";

export {};

declare global {
  interface Window {
    handleThemeToggle: () => void;
  }
}

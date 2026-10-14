import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { HUB_PREFIX, bootHubFrame } from "./hubFrame";

if (location.pathname === HUB_PREFIX || location.pathname.startsWith(HUB_PREFIX + "/")) {
  bootHubFrame();
} else {
  createRoot(document.getElementById("root")!).render(<App />);
}

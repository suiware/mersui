import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MerSuiProvider } from "../lib/components/MerSuiProvider.tsx";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MerSuiProvider network="localnet">
      <App />
    </MerSuiProvider>
  </StrictMode>
);

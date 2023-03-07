import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { CookiesProvider } from "react-cookie";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </CookiesProvider>
  </React.StrictMode>
);

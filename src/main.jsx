import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import { RouterProvider } from "react-router-dom";

import AuthProvider from "@/features/auth/components/auth-provider";
import QueryProvider from "@/app/providers/query-provider";
import { ThemeProvider } from "@/app/providers/theme-provider";

import { router } from "@/app/router";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryProvider>
      <AuthProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </AuthProvider>
    </QueryProvider>
  </React.StrictMode>,
);

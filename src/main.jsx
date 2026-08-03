import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";

import AuthProvider from "@/features/auth/components/auth-provider";
import QueryProvider from "@/app/providers/query-provider";
import { ThemeProvider } from "@/app/providers/theme-provider";
import PageLoader from "@/components/common/page-loader";

import { router } from "@/app/router";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryProvider>
      <AuthProvider>
        <ThemeProvider>
          <Suspense fallback={<PageLoader />}>
            <RouterProvider router={router} />
          </Suspense>
        </ThemeProvider>
      </AuthProvider>
    </QueryProvider>

    <Toaster
      position="top-right"
      richColors
      closeButton
      toastOptions={{
        classNames: {
          toast: "rounded-2xl border shadow-lg",
        },
      }}
    />
  </React.StrictMode>,
);

import type { PropsWithChildren } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/lib/auth";

import store from "@/store.ts";

const queryClient = new QueryClient();

type AppProviderProps = PropsWithChildren<object>;

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>{children} </Router>
      </QueryClientProvider>
    </ReduxProvider>
  );
};

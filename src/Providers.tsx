import type { PropsWithChildren } from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import store from "@/store.ts";

const queryClient = new QueryClient();

type AppProviderProps = PropsWithChildren<object>;

const Providers = ({ children }: AppProviderProps) => {
  return (
    <ReduxProvider store={store}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </BrowserRouter>
    </ReduxProvider>
  );
};

export default Providers;

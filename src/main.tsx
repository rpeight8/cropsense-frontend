import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import store from "./store.ts";

import App from "./App.tsx";
import "./index.css";
import Coordinates from "@/pages/coordinates";
import Fields from "@/pages/coordinates/fields/";
import { startMirage } from "./mock/config.ts";
import { Sensors } from "@/pages/coordinates/sensors";

startMirage();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: ":coordinates",
        element: <Coordinates />,
        children: [
          {
            path: "fields/",
            element: <Fields />,
            children: [
              {
                // add / fiedlId
                path: ":param1",
                children: [
                  {
                    // edit / delete / display
                    path: ":param2",
                  },
                ],
              },
            ],
          },
          {
            path: "sensors/",
            element: <Sensors />,
          },
        ],
      },
    ],
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}></RouterProvider>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);

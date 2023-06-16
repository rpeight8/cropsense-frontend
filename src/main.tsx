import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { startMirage } from "./mock/config.ts";

import { Provider } from "react-redux";
import store from "./store.ts";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Fields } from "./pages/Fields.tsx";
import { Welcome } from "./pages/Welcome.tsx";
import { Sensors } from "./pages/Sensors.tsx";
startMirage();
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Welcome /> },
      {
        path: "/fields",
        element: <Fields />,
      },
      {
        path: "/sensors",
        element: <Sensors />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>
);

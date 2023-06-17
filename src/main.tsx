import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import store from "./store.ts";

import App from "./App.tsx";
import "./index.css";
import { Fields } from "./pages/Fields.tsx";
import { Welcome } from "./pages/Welcome.tsx";
import { Sensors } from "./pages/Sensors.tsx";
import { startMirage } from "./mock/config.ts";

startMirage();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Welcome /> },
      {
        path: "fields/",
        element: <Fields />,
        children: [{ path: ":action", children: [{ path: ":id" }] }],
      },
      {
        path: "sensors",
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

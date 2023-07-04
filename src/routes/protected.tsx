import Coordinates from "@/pages/coordinates";
import Fields from "@/pages/coordinates/fields";
import { Sensors } from "@/pages/coordinates/sensors";
import App from "../App.tsx";

export const protectedRoutes = [
  {
    path: "/app",
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
];

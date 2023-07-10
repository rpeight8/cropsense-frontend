import CoordinatesLayout from "@/components/CoordinatesPage";
import FieldsLayout from "@/features/fields/components/FieldsPage";
import SensorsLayout from "@/features/sensors/components/SensorsLayout";

export const protectedRoutes = [
  {
    path: ":coordinates",
    element: <CoordinatesLayout />,
    children: [
      {
        path: "fields",
        element: <FieldsLayout />,
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
        element: <SensorsLayout />,
      },
    ],
  },
];

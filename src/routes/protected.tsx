import CoordinatesLayout from "@/components/CoordinatesLayout";
import FieldsLayout from "@/features/fields/components/FieldsLayout";
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

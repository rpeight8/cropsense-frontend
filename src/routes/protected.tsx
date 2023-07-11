import RootLayout from "@/components/RootLayout";
import FieldsLayout from "@/features/fields/components/FieldsPage";
import SensorsLayout from "@/features/sensors/components/SensorsLayout";

export const protectedRoutes = [
  {
    path: ":coordinates",
    element: <RootLayout />,
    children: [
      {
        path: "workspace/:workspaceId",
        children: [
          {
            path: "seasons/:seasonId",
            children: [
              {
                path: "fields",
                element: <FieldsLayout />,
                children: [
                  {
                    // add / fiedlId
                    path: ":fieldParam1",
                    children: [
                      {
                        // edit / delete / display
                        path: ":fieldParam2",
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
        ],
      },
    ],
  },
];

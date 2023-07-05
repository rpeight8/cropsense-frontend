import { Navigate, Outlet, useLocation, useRoutes } from "react-router-dom";

import { protectedRoutes } from "./protected";
import { publicRoutes } from "./public";
import { useAppSelector } from "@/store";
import { selectUser } from "@/features/auth/authSlice";
import { useCallback } from "react";
import KeepLoginContainer from "@/features/auth/components/KeepLoginContainer";

const AppRoutes = () => {
  const user = useAppSelector(selectUser);

  const location = useLocation();

  const keepLogin = useCallback((routes: ReturnType<typeof protect>) => {
    return [
      {
        path: "/",
        element: <KeepLoginContainer />,
        children: routes,
      },
    ];
  }, []);

  const protect = useCallback(
    (routes: typeof protectedRoutes, roles?: any) => {
      return [
        {
          path: "/",
          element:
            user && user.id ? (
              <Outlet />
            ) : (
              <Navigate to="/auth" state={{ from: location }} replace />
            ),
          children: routes,
        },
      ];
    },
    [location, user]
  );

  const commonRoutes = [{ path: "*", element: <Navigate to="/" /> }];

  const element = useRoutes([
    ...publicRoutes,
    ...keepLogin(protect(protectedRoutes)),
    ...commonRoutes,
  ]);

  return <>{element}</>;
};

export default AppRoutes;

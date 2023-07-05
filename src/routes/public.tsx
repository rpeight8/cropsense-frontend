import AuthLayout from "@/features/auth/components/AuthLayout";
import { Navigate } from "react-router-dom";

export const publicRoutes = [
  {
    path: "/",
    element: <Navigate to="/20,11,15/fields" replace />,
  },
  {
    path: "/auth",
    element: <AuthLayout />,
  },
];

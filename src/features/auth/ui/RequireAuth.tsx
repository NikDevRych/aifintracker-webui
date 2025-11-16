import { Navigate, useLocation } from "react-router";
import { isAuthenticated } from "../lib/auth";
import type { ReactNode } from "react";

export default function RequireAuth({ children }: { children: ReactNode }) {
  const location = useLocation();

  if (isAuthenticated()) {
    return <>{children}</>;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
}

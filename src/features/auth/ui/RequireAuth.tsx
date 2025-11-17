import { Navigate, useLocation } from "react-router";
import { useEffect, useState } from "react";
import { verifyToken } from "../lib/auth";
import type { ReactNode } from "react";

export default function RequireAuth({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [checking, setChecking] = useState(true);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const valid = await verifyToken();
        setOk(valid);
      } finally {
        setChecking(false);
      }
    };

    checkToken();
  }, []);

  if (checking) return null;

  if (ok) return <>{children}</>;

  return <Navigate to="/login" state={{ from: location }} replace />;
}

import { useCallback } from "react";
import LoginForm from "../../features/login/ui/LoginForm";
import { useNavigate } from "react-router";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleSuccess = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6 dark:bg-gray-800">
      <LoginForm onSuccess={handleSuccess} />
    </div>
  );
}

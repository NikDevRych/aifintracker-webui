import { useCallback } from "react";
import RegisterForm from "../../features/register/ui/RegisterForm";
import { useNavigate } from "react-router";

export default function RegisterPage() {
  const navigate = useNavigate();

  const handleSuccess = useCallback(() => {
    navigate("/dashboard");
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6 dark:bg-gray-800">
      <RegisterForm onSuccess={handleSuccess} />
    </div>
  );
}

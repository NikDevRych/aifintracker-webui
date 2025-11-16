import { useCallback } from 'react';
import LoginForm from '../../features/login/ui/LoginForm';
import { useNavigate } from 'react-router';

export default function LoginPage() {
  const navigate = useNavigate();

  const handleSuccess = useCallback(() => {
    // Navigate to dashboard after successful login
    navigate('/dashboard');
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-800 p-6">
      <LoginForm onSuccess={handleSuccess} />
    </div>
  );
}

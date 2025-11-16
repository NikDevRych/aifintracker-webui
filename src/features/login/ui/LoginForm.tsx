import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormValues } from "../model/schema";
import useLogin from "../lib/useLogin";

export default function LoginForm({ onSuccess }: { onSuccess?: () => void }) {
  const { login, isLoading } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await login(data);
      onSuccess?.();
    } catch (err) {
      console.error(err);
      const message = (err as Error)?.message ?? "Login failed";
      // Simple feedback for now; replace with toast/inline error handling as needed
      alert(message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-lg rounded-md bg-white p-6 shadow-sm dark:bg-gray-900 dark:text-gray-50"
    >
      <h2 className="mb-4 text-2xl font-semibold">Sign in</h2>

      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          {...register("password")}
          className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting || isLoading}
        className="w-full rounded-md bg-blue-600 py-2 hover:bg-blue-700 disabled:opacity-60"
      >
        {isSubmitting || isLoading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}

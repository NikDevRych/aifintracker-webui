import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormValues } from "../model/schema";
import useRegister from "../lib/useRegister";

type Props = {
  onSuccess?: () => void;
};

export default function RegisterForm({ onSuccess }: Props) {
  const { register: doRegister, isLoading } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await doRegister(data);
      onSuccess?.();
    } catch (err) {
      console.error(err);
      alert((err as Error)?.message ?? "Registration failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-md rounded-md bg-white/80 p-6 shadow-sm dark:bg-gray-900/60"
    >
      <h2 className="mb-4 text-2xl font-semibold">Create account</h2>

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

      <div className="mb-4">
        <label
          className="mb-1 block text-sm font-medium"
          htmlFor="confirmPassword"
        >
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          {...register("confirmPassword")}
          className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting || isLoading}
        className="w-full rounded-md bg-green-600 py-2 text-white hover:bg-green-700 disabled:opacity-60"
      >
        {isSubmitting || isLoading ? "Creating account..." : "Create account"}
      </button>
    </form>
  );
}

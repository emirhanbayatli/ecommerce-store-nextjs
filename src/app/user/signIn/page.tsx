"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";
import { LockKeyhole, Mail, Lock, EyeOff, Eye } from "lucide-react";
import { toast } from "sonner";
import { useAuthContext } from "@/app/AuthContextProvider";

interface Auth {
  email: string;
  password: string;
}

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const { signIn } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Auth>({ mode: "all" });

  const onSubmit = async (data: Auth) => {
    try {
      await signIn(data.email, data.password);
      reset();
    } catch (error) {
      toast.error("Login failed.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <LockKeyhole
            className="mx-auto h-12 w-auto text-blue-600"
            strokeWidth={1.5}
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Welcome Back!
          </h2>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8 rounded-lg shadow-md space-y-6"
        >
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative mt-1">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Mail className="h-5 w-5 text-gray-400" strokeWidth={2} />
              </span>
              <input
                id="email"
                {...register("email", {
                  required: "Email is required!",
                  minLength: {
                    value: 5,
                    message: "Email must be at least 5 characters long",
                  },
                  maxLength: {
                    value: 150,
                    message: "Email must not exceed 150 characters",
                  },
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Unexpected email format",
                  },
                })}
                data-testid="email-input"
                type="email"
                placeholder="example@mail.com"
                className={`w-full rounded-md border p-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.email ? "border-gray-500" : "border-gray-300"
                }`}
              />
            </div>
            {errors.email?.message && (
              <p className="mt-1 text-sm text-gray-900">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative mt-1">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Lock className="h-5 w-5 text-gray-400" strokeWidth={2} />
              </span>
              <input
                id="password"
                {...register("password", {
                  required: "Password is required!",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                  maxLength: {
                    value: 60,
                    message: "Password must not exceed 60 characters",
                  },
                })}
                data-testid="password-input"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className={`w-full rounded-md border p-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.password ? "border-gray-500" : "border-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-500" strokeWidth={2} />
                ) : (
                  <Eye className="h-5 w-5 text-gray-500" strokeWidth={2} />
                )}
              </button>
            </div>
            {errors.password?.message && (
              <p className="mt-1 text-sm text-gray-900">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="text-sm text-right">
            <Link
              href="/user/reset-password"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Forgot your password?
            </Link>
          </div>
          <button
            data-testid="submit-button"
            disabled={isSubmitting}
            type="submit"
            className="w-full rounded-md p-3 font-semibold text-white transition duration-150 ease-in-out disabled:cursor-not-allowed disabled:bg-gray-400 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </button>

          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              href="/user/signUp"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

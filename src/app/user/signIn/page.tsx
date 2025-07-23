"use client";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthDispatchContext } from "@/app/AuthContextProvider";

interface Auth {
  email: string;
  password: string;
}

export default function SignIp(data: Auth) {
  const [error, setError] = useState<string>();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Auth>({ mode: "all" });

  const setUser = useAuthDispatchContext();

  async function signInAction(data: Auth) {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user.email);
        reset();
        router.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
        setUser(null);
        console.error(errorCode, errorMessage);
      });
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(signInAction)}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Sign In
        </h2>

        <div className="flex flex-col">
          <input
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
            })}
            type="email"
            placeholder="Email"
            className="border rounded p-2 "
          />
          {errors.email?.message && (
            <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <input
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
            type="password"
            placeholder="Password"
            className="border rounded p-2"
          />
          {errors.password?.message && (
            <p className="text-red-600 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          disabled={isSubmitting}
          type="submit"
          className={`w-full p-2 rounded font-semibold ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {isSubmitting ? "Signing In..." : "Sign In"}
        </button>

        <p className="text-center text-sm mt-2">
          Don't have an account?{" "}
          <Link href="/user/signUp" className="text-blue-600 ">
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
      </form>
    </div>
  );
}

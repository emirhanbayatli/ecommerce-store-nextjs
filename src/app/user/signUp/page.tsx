"use client";
import { createUserWithEmailAndPassword, User } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthDispatchContext } from "@/app/AuthContextProvider";
import { setDoc, doc } from "firebase/firestore";
import { collections, db, UserRoles } from "../../../utils/firebase";
import { getErrorMessageFromCode } from "@/utils/uiUtils";

interface Auth {
  email: string;
  password: string;
  role: string;
}
export default function SignUp() {
  const [error, setError] = useState<string>();
  const [message, setMessage] = useState<string>();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Auth>({ mode: "all" });

  const setUser = useAuthDispatchContext();
  const defaultUserRole = UserRoles.USER;

  async function userSaveToFirebase(user: User) {
    await setDoc(doc(db, collections.users, user.uid), {
      uid: user.uid,
      email: user.email,
      role: defaultUserRole,
      createdAt: new Date().toString(),
    });
  }

  async function signUpAction(data: Auth) {
    await createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem(
          "user",
          JSON.stringify({ email: user.email, id: user.uid }),
        );
        setUser(user.email ? { email: user.email, id: user.uid } : null);
        setMessage("User registration and login were successful.");
        userSaveToFirebase(user);
        reset();
        router.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
        setUser(null);
        setError(getErrorMessageFromCode(errorCode));
      });
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(signUpAction)}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Sign Up
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
            className="border rounded p-2"
            data-testid="email-input"
          />
          {errors.email?.message && (
            <p className="text-gray-600 text-sm mt-1">{errors.email.message}</p>
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
            data-testid="password-input"
          />
          {errors.password?.message && (
            <p className="text-gray-600 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          data-testid="submit-button"
          disabled={isSubmitting}
          type="submit"
          className={`w-full p-2 rounded font-semibold ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {isSubmitting ? "Signing Up..." : "Sign Up"}
        </button>

        <p className="text-center text-sm mt-2">
          Already have an account?{" "}
          <Link href="/user/signIn" className="text-blue-600">
            Sign In
          </Link>
        </p>

        {error && (
          <p
            data-testid="error-message-sign-up"
            className="text-gray-600 text-sm mt-1"
          >
            {error}
          </p>
        )}
        {message && (
          <p
            data-testid="success-message-sign-up"
            className="text-green-400 text-sm mt-1"
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

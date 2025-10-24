"use client";
import { LoadingSpinner } from "@/app/components/LoadingSpiner";
import { auth } from "@/utils/firebase";
import { getErrorMessageFromCode } from "@/utils/uiUtils";
import { FirebaseError } from "firebase/app";
import { sendPasswordResetEmail } from "firebase/auth";
import { Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError(null);
    setMessage(null);

    if (!email) {
      setError("Email address is required.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage(
        "Password reset link has been sent. Please check your inbox (and spam folder).",
      );
      setEmail("");
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(getErrorMessageFromCode(err.code));
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Forgot Your Password?
          </h1>
        </div>

        <form
          noValidate
          onSubmit={handleSubmit}
          className="mt-8 space-y-6 bg-white p-8 rounded-xl shadow-lg"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <div className="relative mt-1">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Mail className="h-5 w-5 text-gray-400" strokeWidth={2} />
              </span>
              <input
                id="email"
                data-testid="email-input"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@mail.com"
                className={`w-full rounded-md border p-3 pl-10 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  error ? "border-red-500 ring-red-500" : "border-gray-300"
                }`}
              />
            </div>
          </div>

          <div className="h-4 text-center">
            {error && (
              <p data-testid="error-message" className="text-sm text-red-600">
                {error}
              </p>
            )}
            {message && (
              <p
                data-testid="success-message"
                className="text-sm text-green-600"
              >
                {message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed transition-all duration-300"
          >
            {loading ? (
              <span className="ml-2">Sending...</span>
            ) : (
              "Send Reset Link"
            )}
          </button>

          <p className="text-sm text-gray-500 text-center">
            Remember your password?{" "}
            <Link
              href="/user/signIn"
              className="font-medium text-blue-600 hover:underline"
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}

"use client";
import { useForm } from "react-hook-form";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export interface Auth {
  email: string;
  password: string;
}

function signIn(data: Auth) {
  console.log(data.email, "data");

  const auth = getAuth();
  signInWithEmailAndPassword(auth, data.email, data.password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

export default function AuthForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm({ mode: "all" });

  return (
    <form onSubmit={handleSubmit(signIn)}>
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
      />
      {errors.email?.message && (
        <p className="text-red-600 text-sm">{errors.email.message as string}</p>
      )}
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
      />
      {errors.password?.message && (
        <p className="text-red-600 text-sm">
          {errors.password.message as string}
        </p>
      )}

      <button disabled={isSubmitting} type="submit">
        {isSubmitting ? "Signing In..." : "Sign In"}
      </button>
    </form>
  );
}

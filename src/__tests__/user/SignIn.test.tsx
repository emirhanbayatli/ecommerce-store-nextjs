import SignIn from "@/app/user/signIn/page";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "sonner";
import { TextEncoder, TextDecoder } from "util";

Object.assign(global, { TextEncoder, TextDecoder });

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  }),
) as jest.Mock;
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
}));

jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(),
  doc: jest.fn(),
  getDoc: jest.fn(),
}));

const mockSetUser = jest.fn();
jest.mock("../../app/AuthContextProvider", () => ({
  useAuthDispatchContext: () => mockSetUser,
}));

jest.mock("sonner", () => ({
  toast: { success: jest.fn(), error: jest.fn() },
}));

jest.mock("../../utils/uiUtils", () => ({
  auth: {},
  db: {},
  getErrorMessageFromCode: jest.fn((code) => `Error: ${code}`),
}));

describe("Sign In Functionality", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("renders form elements", () => {
    render(<SignIn />);
    expect(screen.getByText("Sign In")).toBeInTheDocument();
    expect(screen.getByTestId("email-input")).toBeInTheDocument();
    expect(screen.getByTestId("password-input")).toBeInTheDocument();
    expect(screen.getByTestId("submit-button")).toBeInTheDocument();
  });
  test("logs in successfully with valid credentials", async () => {
    (signInWithEmailAndPassword as jest.Mock).mockResolvedValue({
      user: { email: "emirhan@hotmail.com", uid: "123" },
    });

    render(<SignIn />);

    fireEvent.input(screen.getByTestId("email-input"), {
      target: { value: "emirhan@hotmail.com" },
    });
    fireEvent.input(screen.getByTestId("password-input"), {
      target: { value: "12345678" },
    });
    fireEvent.click(screen.getByTestId("submit-button"));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("User login was successful.");
    });
  });
  test("shows error with unregistered email", async () => {
    const error = new FirebaseError("auth/user-not-found", "User not found");
    (signInWithEmailAndPassword as jest.Mock).mockRejectedValue(error);

    render(<SignIn />);

    fireEvent.input(screen.getByTestId("email-input"), {
      target: { value: "emirhan123@hotmail.com" },
    });
    fireEvent.input(screen.getByTestId("password-input"), {
      target: { value: "12345678" },
    });
    fireEvent.click(screen.getByTestId("submit-button"));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalled();
    });
  });

  test("shows error with wrong password", async () => {
    const error = new FirebaseError("auth/wrong-password", "Wrong password");
    (signInWithEmailAndPassword as jest.Mock).mockRejectedValue(error);

    render(<SignIn />);

    fireEvent.input(screen.getByTestId("email-input"), {
      target: { value: "emirhan@hotmail.com" },
    });
    fireEvent.input(screen.getByTestId("password-input"), {
      target: { value: "12334567" },
    });
    fireEvent.click(screen.getByTestId("submit-button"));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalled();
    });
  });

  test("shows error when password is too short", async () => {
    render(<SignIn />);

    fireEvent.input(screen.getByTestId("email-input"), {
      target: { value: "emirhan@hotmail.com" },
    });
    fireEvent.input(screen.getByTestId("password-input"), {
      target: { value: "123" },
    });
    fireEvent.click(screen.getByTestId("submit-button"));

    await waitFor(() => {
      expect(
        screen.getByText("Password must be at least 8 characters long"),
      ).toBeInTheDocument();
    });
  });

  test("handles unexpected errors (non-firebase errors)", async () => {
    (signInWithEmailAndPassword as jest.Mock).mockRejectedValue(
      new Error("Network Error"),
    );

    render(<SignIn />);

    fireEvent.input(screen.getByTestId("email-input"), {
      target: { value: "test@test.com" },
    });
    fireEvent.input(screen.getByTestId("password-input"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByTestId("submit-button"));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Unexpected error occurred.");
    });
  });
});

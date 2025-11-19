import SignUp from "@/app/user/signUp/page";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import { toast } from "sonner";
import { TextEncoder, TextDecoder } from "util";
import { setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

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
  createUserWithEmailAndPassword: jest.fn(),
}));
jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(),
  doc: jest.fn(),
  getDoc: jest.fn(),
  setDoc: jest.fn(),
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
    render(<SignUp />);
    expect(screen.getByText("Welcome!")).toBeInTheDocument();
    expect(screen.getByTestId("email-input")).toBeInTheDocument();
    expect(screen.getByTestId("password-input")).toBeInTheDocument();
    expect(screen.getByTestId("submit-button")).toBeInTheDocument();
  });

  test("sign up successfully with valid credentials", async () => {
    (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue({
      user: { email: "newuser@test.com", uid: "new123" },
    });

    (setDoc as jest.Mock).mockResolvedValue({});

    render(<SignUp />);

    fireEvent.input(screen.getByTestId("email-input"), {
      target: { value: "newuser@test.com" },
    });
    fireEvent.input(screen.getByTestId("password-input"), {
      target: { value: "12345678" },
    });
    fireEvent.click(screen.getByTestId("submit-button"));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalled();
    });
  });

  test("shows error when password is too short", async () => {
    render(<SignUp />);

    fireEvent.input(screen.getByTestId("email-input"), {
      target: { value: "valid@test.com" },
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

    expect(createUserWithEmailAndPassword).not.toHaveBeenCalled();
  });

  test("handles unexpected errors (non-firebase errors)", async () => {
    (createUserWithEmailAndPassword as jest.Mock).mockRejectedValue(
      new Error("Network Error"),
    );

    render(<SignUp />);

    fireEvent.input(screen.getByTestId("email-input"), {
      target: { value: "test@test.com" },
    });
    fireEvent.input(screen.getByTestId("password-input"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByTestId("submit-button"));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Error: undefined");
    });
  });
});

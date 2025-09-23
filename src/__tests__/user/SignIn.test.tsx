import SignIn from "@/app/user/signIn/page";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";

describe("Sign In Functionality", () => {
  beforeEach(() => {
    render(<SignIn />);
  });
  test("renders form elements", () => {
    expect(screen.getByText("Sign In")).toBeInTheDocument();
    expect(screen.getByTestId("email-input")).toBeInTheDocument();
    expect(screen.getByTestId("password-input")).toBeInTheDocument();
    expect(screen.getByTestId("submit-button")).toBeInTheDocument();
  });
  test("logs in successfully with valid credentials", () => {
    fireEvent.input(screen.getByTestId("email-input"), {
      target: { value: "emirhan@hotmail.com" },
    });
    fireEvent.input(screen.getByTestId("password-input"), {
      target: { value: "12345678" },
    });
    fireEvent.click(screen.getByTestId("submit-button"));
    expect(screen.getByText("User login was successful.")).toBeInTheDocument();
  });
  test("shows error with unregistered email", () => {
    fireEvent.input(screen.getByTestId("email-input"), {
      target: { value: "emirhan123@hotmail.com" },
    });
    fireEvent.input(screen.getByTestId("password-input"), {
      target: { value: "12345678" },
    });
    fireEvent.click(screen.getByTestId("submit-button"));
    expect(
      screen.getByText("The provided credential is invalid. Please try again."),
    ).toBeInTheDocument();
  });

  test("shows error with wrong password", () => {
    fireEvent.input(screen.getByTestId("email-input"), {
      target: { value: "emirhan@hotmail.com" },
    });
    fireEvent.input(screen.getByTestId("password-input"), {
      target: { value: "12334567" },
    });
    fireEvent.click(screen.getByTestId("submit-button"));
    expect(
      screen.getByText("The provided credential is invalid. Please try again."),
    ).toBeInTheDocument();
  });

  test("shows error when password is too short", () => {
    fireEvent.input(screen.getByTestId("email-input"), {
      target: { value: "emirhan@hotmail.com" },
    });
    fireEvent.input(screen.getByTestId("password-input"), {
      target: { value: "123" },
    });
    fireEvent.click(screen.getByTestId("submit-button"));
    expect(
      screen.getByText("Password must be at least 8 characters long"),
    ).toBeInTheDocument();
  });
});

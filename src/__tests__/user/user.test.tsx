import SignIn from "@/app/user/signIn/page";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("User Functionality", () => {
  test("Sign in page test", () => {
    render(<SignIn email="test@test.com" password="12345678" />);
    expect(screen.getByText("Sign In")).toBeInTheDocument();
    expect(screen.getByTestId("email-input")).toBeInTheDocument();
    expect(screen.getByTestId("password-input")).toBeInTheDocument();
    expect(screen.getByTestId("submit-button")).toBeInTheDocument();
  });
  test("Sign up page test", () => {});
});

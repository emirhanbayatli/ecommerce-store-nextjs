import SignUp from "@/app/user/signUp/page";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("Sign In Functionality", () => {
  beforeEach(() => {
    render(<SignUp />);
  });
  test("Sign up page test", () => {
    expect(screen.getByText("Sign Up")).toBeInTheDocument();
  });
});

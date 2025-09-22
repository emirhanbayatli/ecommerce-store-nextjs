import { Button } from "@/app/components/Button";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

const handleSubmitMock = jest.fn();

describe("Button component test ", () => {
  test("Button component test ", () => {
    render(
      <Button
        label="Click"
        className="bg-blue-500"
        onClick={handleSubmitMock}
      />,
    );
    const button = screen.getByRole("button", { name: "Click" });
    expect(screen.getByText("Click")).toBeInTheDocument();
    expect(button).toHaveClass("bg-blue-500");
    expect(button).not.toHaveClass("bg-red-500");
    expect(handleSubmitMock).not.toHaveBeenCalled();
    fireEvent.click(button);
    expect(handleSubmitMock).toHaveBeenCalledTimes(1);
  });
});

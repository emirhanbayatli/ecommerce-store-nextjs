import { Button } from "@/app/components/Button";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

const handleSubmitMock = jest.fn();

describe("components test ", () => {
  test("Button component test ", () => {
    const { container } = render(
      <Button label="Click" onClick={handleSubmitMock} />,
    );
    expect(screen.getByText("Click")).toBeInTheDocument();
  });
});

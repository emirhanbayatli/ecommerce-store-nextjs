import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

const imagesMock = [
  "/first-image.jpg",
  "/second-image.jpg",
  "/third-image.jpg",
];

describe("ItemCard component test ", () => {
  test("ItemCard component test ", () => {
    render(
      <>
        <img src={imagesMock[0]} alt={imagesMock[0]} />
        <span>100 $</span>
        <span>Test Item Card</span>
      </>,
    );

    expect(screen.getByAltText(imagesMock[0])).toBeInTheDocument();
    expect(screen.getByText("100 $")).toBeInTheDocument();
    expect(screen.getByText("Test Item Card")).toBeInTheDocument();
  });
});

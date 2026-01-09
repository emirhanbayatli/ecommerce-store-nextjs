import Carousel from "@/app/components/Carousel";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

const imagesMock = [
  "/first-image.jpg",
  "/second-image.jpg",
  "/third-image.jpg",
];

describe("Carousel component test ", () => {
  test("Carousel component test ", () => {
    render(<Carousel images={imagesMock} />);
    const carousel = screen.getByTestId("carousel");
    expect(carousel).toBeInTheDocument();

    const prevButton = screen.getByTestId("carousel-prev-button");
    const nextButton = screen.getByTestId("carousel-next-button");
    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
    expect(screen.getByTestId("carousel-images-0")).toBeInTheDocument();
    fireEvent.click(prevButton);
    expect(screen.getByTestId("carousel-images-2")).toBeInTheDocument();
    fireEvent.click(nextButton);
    expect(screen.getByTestId("carousel-images-0")).toBeInTheDocument();
    fireEvent.click(nextButton);
    expect(screen.getByTestId("carousel-images-1")).toBeInTheDocument();
  });
});

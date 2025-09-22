import Highlight from "@/app/components/HighlightCard";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

const colorsMock = [
  "bg-blue-300",
  "bg-green-300",
  "bg-yellow-300",
  "bg-pink-300",
  "bg-purple-300",
  "bg-indigo-300",
  "bg-teal-300",
  "bg-red-300",
  "bg-orange-300",
];
const randomColorMock =
  colorsMock[Math.floor(Math.random() * colorsMock.length)];
const imagesMock = [
  "/first-image.jpg",
  "/second-image.jpg",
  "/third-image.jpg",
];

describe("HighlightCard component test ", () => {
  test("HighlightCard component test ", () => {
    render(
      <Highlight
        imgSrc={imagesMock[0]}
        imgAlt={imagesMock[0]}
        price={100}
        title="Test Card"
        discount={0}
        className={randomColorMock}
      />,
    );

    expect(screen.getByAltText(imagesMock[0])).toBeInTheDocument();
    expect(screen.getByText("100 $")).toBeInTheDocument();
    expect(screen.getByText("Test Card")).toBeInTheDocument();
    expect(screen.getByText("Limited Stock !")).toBeInTheDocument();
    const highlightCardInfo = screen.getByTestId("highlight-card-info");

    expect(highlightCardInfo).toHaveClass(randomColorMock);
  });
});

import { Button } from "@/app/components/Button";
import Carousel from "@/app/components/Carousel";
import Footer from "@/app/components/Footer";
import Highlight from "@/app/components/HighlightCard";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

const handleSubmitMock = jest.fn();
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
describe("components test ", () => {
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
  test("Carousel component test ", () => {
    render(<Carousel images={imagesMock} />);
    const carousel = screen.getByTestId("carousel");
    expect(carousel).toBeInTheDocument();
    expect(carousel).toHaveClass("relative");
    expect(carousel).not.toHaveClass("absolute");
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
  test("Navbar component test ", () => {
    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();
  });
  test("HighlightCard component test ", () => {
    <Highlight
      imgSrc={imagesMock[0]}
      imgAlt={imagesMock[0]}
      price={100}
      title="Test Card"
      discount={0}
      className={randomColorMock}
    />;

    expect(screen.getByAltText(imagesMock[0])).toBeInTheDocument();
    expect(screen.getByText("100 $")).toBeInTheDocument();
    expect(screen.getByText("Test Card")).toBeInTheDocument();
    expect(screen.getByText("Limited Stock !")).toBeInTheDocument();
    const highlightCardInfo = screen.getByTestId("highlight-card-info");

    expect(highlightCardInfo).toHaveClass(randomColorMock);
  });
  test("ItemCard component test ", () => {
    expect(screen.getByAltText(imagesMock[0])).toBeInTheDocument();
    expect(screen.getByText("100 $")).toBeInTheDocument();
    expect(screen.getByText("Test Item Card")).toBeInTheDocument();
  });
});

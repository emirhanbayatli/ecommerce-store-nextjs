import Footer from "@/app/components/Footer";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

describe("Footer component test ", () => {
  test("Navbar component test ", () => {
    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();
  });
});

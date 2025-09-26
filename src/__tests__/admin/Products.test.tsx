import AdminProducts from "@/app/admin/products/page";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

// const getProductsActionMock = jest.fn();
// const deleteProductActionMock = jest.fn();

describe("Admin products page test", () => {
  test("Loading indicator check", () => {
    render(<AdminProducts />);

    expect(screen.getByText("Loading")).toBeInTheDocument();
  });
});

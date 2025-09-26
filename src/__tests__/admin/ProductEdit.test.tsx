import EditProduct from "@/app/admin/products/[productId]/edit/page";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
describe("Admin products edit page test", () => {
  test("Form control", () => {
    render(<EditProduct />);

    expect(screen.getByText("ID")).toBeInTheDocument();
  });
});

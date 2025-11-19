import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";

import AdminProducts from "@/app/admin/products/page";

import { getProductsAction } from "../../app/actions/admin/products";

import { TextEncoder, TextDecoder } from "util";
Object.assign(global, { TextEncoder, TextDecoder });

const mockProducts = [
  {
    id: "1",
    title: "Mock Product A",
    price: 100,
    images: ["/img1.jpg"],
    description: "desc",
    category: "cat1",
  },
  {
    id: "2",
    title: "Mock Product B",
    price: 200,
    images: ["/img2.jpg"],
    description: "desc",
    category: "cat2",
  },
];

jest.mock("../../app/actions/admin/products", () => ({
  getProductsAction: jest.fn(),
}));

jest.mock("../../app/actions/admin/deleteAction", () => ({
  deleteProductAction: jest.fn(),
}));

describe("Admin products page test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("shows loading spinner when no products", () => {
    (getProductsAction as jest.Mock).mockReturnValue(new Promise(() => {}));

    render(<AdminProducts />);
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  test("renders Add New Product button, and title ", async () => {
    (getProductsAction as jest.Mock).mockResolvedValue([]);

    render(<AdminProducts />);
    expect(screen.getByTestId("addNewBtn")).toBeInTheDocument();
    expect(screen.getByText("Products")).toBeInTheDocument();
  });

  test("renders products after fetching", async () => {
    (getProductsAction as jest.Mock).mockResolvedValue(mockProducts);

    render(<AdminProducts />);

    const productA = await screen.findByText("Mock Product A");
    const productB = await screen.findByText("Mock Product B");

    expect(productA).toBeInTheDocument();
    expect(productB).toBeInTheDocument();
    expect(screen.getByText("100 $")).toBeInTheDocument();
  });
});

import EditProduct from "@/app/admin/products/[productId]/edit/page";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { getDoc } from "firebase/firestore";
import { useParams } from "next/navigation";

jest.mock("react", () => {
  const originalReact = jest.requireActual("react");
  return {
    ...originalReact,
    useActionState: (initialState: any) => [initialState, jest.fn(), false],
  };
});

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useParams: jest.fn(),
}));

jest.mock("sonner", () => ({
  toast: { success: jest.fn(), error: jest.fn() },
}));

jest.mock("firebase/firestore", () => ({
  doc: jest.fn(),
  getDoc: jest.fn(),
}));

jest.mock("../../utils/firebase", () => ({
  db: {},
}));

jest.mock("../../app/actions/admin/products", () => ({
  editProductAction: jest.fn(),
}));

const mockProductData = {
  title: "Test Product",
  description:
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad fugit vitae quidem tempore quasi, maiores id consequuntur. Minus fugiat accusamus, excepturi debitis odio nihil atque magni rem ut ipsa commodi!",
  category: "Electronics",
  price: 100,
  discountPercentage: 10,
  stock: 50,
  tags: ["Smartphones"],
  brand: "TestBrand",
  sku: "SKU-123",
  weight: 500,
  dimensions: { width: 10, height: 20, depth: 5 },
  warrantyInformation: "2 years",
  shippingInformation: "Ships in 3-5 business days",
  availabilityStatus: "In Stock",
  minimumOrderQuantity: 1,
  returnPolicy: "30 Days Return",
  images: ["img1.jpg"],
  thumbnail: "thumb.jpg",
};
describe("Admin products edit page test", () => {
  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({ productId: "12345" });
  });
  test("Form control", async () => {
    (getDoc as jest.Mock).mockResolvedValue({
      exists: () => true,
      data: () => mockProductData,
    });

    render(<EditProduct />);

    await waitFor(() => {
      expect(screen.getByDisplayValue("Test Product")).toBeInTheDocument();
    });
    expect(screen.getByDisplayValue("2 years")).toBeInTheDocument();
    expect(screen.getByDisplayValue("TestBrand")).toBeInTheDocument();
    expect(
      screen.getByDisplayValue("Ships in 3-5 business days"),
    ).toBeInTheDocument();

    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Stripe Product ID")).toBeInTheDocument();
    expect(screen.getByText("Stripe Price ID")).toBeInTheDocument();
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Category")).toBeInTheDocument();
    expect(screen.getByText("Price")).toBeInTheDocument();
    expect(screen.getByText("Stock")).toBeInTheDocument();
    expect(screen.getByText("Tags")).toBeInTheDocument();
    expect(screen.getByText("Brand")).toBeInTheDocument();
    expect(screen.getByText("SKU")).toBeInTheDocument();
    expect(screen.getByText("Weight")).toBeInTheDocument();
    expect(screen.getByText("Dimensions")).toBeInTheDocument();
    expect(screen.getByText("Warranty Information")).toBeInTheDocument();
    expect(screen.getByText("Shipping Information")).toBeInTheDocument();
    expect(screen.getByText("Availability Status")).toBeInTheDocument();
    expect(screen.getByText("Minimum Order Quantity")).toBeInTheDocument();
    expect(screen.getByText("Return Policy")).toBeInTheDocument();
    expect(screen.getByText("Product Status")).toBeInTheDocument();
    expect(screen.getByText("Images")).toBeInTheDocument();
    expect(screen.getByText("Thumbnail")).toBeInTheDocument();
  });
  test("Allows user to update form fields", async () => {
    (getDoc as jest.Mock).mockResolvedValue({
      exists: () => true,
      data: () => mockProductData,
    });

    render(<EditProduct />);

    await waitFor(() => {
      expect(screen.getByDisplayValue("Test Product")).toBeInTheDocument();
    });

    const titleInput = screen.getByTestId("title");

    fireEvent.change(titleInput, { target: { value: "iPhone 15 Pro" } });

    expect(titleInput).toHaveValue("iPhone 15 Pro");
  });

  test("Shows validation error when required field is empty", async () => {
    (getDoc as jest.Mock).mockResolvedValue({
      exists: () => true,
      data: () => mockProductData,
    });

    render(<EditProduct />);

    await waitFor(() => {
      expect(screen.getByDisplayValue("Test Product")).toBeInTheDocument();
    });

    const titleInput = screen.getByTestId("title");

    fireEvent.change(titleInput, { target: { value: "" } });

    const submitBtn = screen.getByRole("button", { name: /Update Product/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/Title is required/i));
    });
  });
});

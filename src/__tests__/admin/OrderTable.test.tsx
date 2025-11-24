import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import OrderTable from "@/app/components/OrderTable";

const mockOrders = [
  {
    id: "ORD-001",
    userName: "John Doe",
    createdAt: new Date("2024-01-15"),
    totalAmount: 150,
    status: "Delivered",
  },
  {
    id: "ORD-002",
    userName: "Test User",
    createdAt: new Date("2024-02-20"),
    totalAmount: 200.5,
    status: "Processing",
  },
];

describe("OrderTable Component Tests", () => {
  test("renders table headers correctly", () => {
    render(<OrderTable orders={[]} />);

    expect(screen.getByText("My Orders")).toBeInTheDocument();
    expect(screen.getByText("Order Number")).toBeInTheDocument();
    expect(screen.getByText("Customer")).toBeInTheDocument();
    expect(screen.getByText("Order Date")).toBeInTheDocument();
    expect(screen.getByText("Total Amount")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Actions")).toBeInTheDocument();
  });

  test("renders 'No orders found' message when orders list is empty", () => {
    render(<OrderTable orders={[]} />);

    const emptyMessage = screen.getByText("No orders found.");
    expect(emptyMessage).toBeInTheDocument();
  });

  test("renders order rows correctly when data is provided", () => {
    render(<OrderTable orders={mockOrders as any} />);

    expect(screen.getByText("ORD-001")).toBeInTheDocument();
    expect(screen.getByText("ORD-002")).toBeInTheDocument();

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Test User")).toBeInTheDocument();

    expect(screen.getByText("Delivered")).toBeInTheDocument();
    expect(screen.getByText("Processing")).toBeInTheDocument();

    const date1 = new Date("2024-01-15").toLocaleDateString();
    expect(screen.getByText(date1)).toBeInTheDocument();
  });
});

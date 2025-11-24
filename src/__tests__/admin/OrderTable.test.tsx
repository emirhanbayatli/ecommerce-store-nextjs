import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import OrderTable from "@/app/components/OrderTable";
import { OrderProps } from "@/types/types";

const mockOrders = [
  {
    id: "ORD-001",
    userName: "John Doe",
    userId: "test2",
    createdAt: new Date("2024-01-15"),
    totalAmount: 150,
    status: "Pending",
  },
  {
    id: "ORD-002",
    userName: "Test User",
    userId: "test",
    createdAt: new Date("2024-02-20"),
    totalAmount: 200.5,
    status: "Pending",
  },
] as OrderProps[];

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
    render(<OrderTable orders={mockOrders} />);

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

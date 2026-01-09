"use client";
import { db } from "@/utils/firebase";
import { CURRENCY_SYMBOL } from "@/utils/uiUtils";
import {
  collection,
  doc,
  getDocs,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { OrderStatus } from "@/app/actions/admin/postOrderAction";
import { Button } from "@/app/components/ui/button";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "@/app/components/LoadingSpinner";
import { Product } from "@/types/types";
import { toast } from "sonner";

export interface Order {
  id: string;
  userId: string;
  userName: string;
  totalAmount: number;
  status: OrderStatus;
  createdAt: Timestamp;
  items: Product[];
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedStatus, setSelectedStatus] = useState<{
    [orderId: string]: string;
  }>({});

  useEffect(() => {
    async function fetchOrders() {
      const snapshot = await getDocs(collection(db, "orders"));

      const data = snapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as Order),
      );
      setOrders(data);
      setLoading(false);
    }
    fetchOrders();
  }, []);

  const allOrderStatus = Object.values(OrderStatus);

  async function updateOrderStatus(orderId: string, newStatus: string) {
    try {
      await updateDoc(doc(db, "orders", orderId), { status: newStatus });

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId
            ? { ...order, status: newStatus as OrderStatus }
            : order,
        ),
      );

      setSelectedStatus((prev) => {
        const newState = { ...prev };
        delete newState[orderId];
        return newState;
      });

      toast.success("Order status updated successfully");
    } catch {
      toast.error("Order status update failed");
    }
  }

  const handleRadioChange = (orderId: string, newStatus: string) => {
    setSelectedStatus((prev) => ({
      ...prev,
      [orderId]: newStatus,
    }));
  };

  if (loading)
    return (
      <main className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </main>
    );

  return (
    <div className="min-h-screen flex flex-col bg-white font-inter overflow-x-hidden">
      <main className="flex-1 px-10 py-5 flex justify-center">
        <div className="flex flex-col max-w-4xl w-full">
          <div className="flex flex-col sm:flex-row justify-between gap-3 p-4">
            <div className="flex flex-col gap-1">
              <p className="text-2xl font-bold text-gray-900">Orders</p>
              <p className="text-sm text-gray-500">
                Manage and track all customer orders
              </p>
            </div>
          </div>

          <div className="overflow-x-auto px-4 py-3">
            <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-white">
                <tr>
                  {[
                    "Order Number",
                    "Customer",
                    "Order Date",
                    "Total Amount",
                    "Status",
                  ].map((col) => (
                    <th
                      key={col}
                      className="px-4 py-3 text-left text-sm font-medium text-gray-900"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map((order: Order) => {
                  const currentDisplayStatus =
                    selectedStatus[order.id] || order.status;

                  const isButtonDisabled =
                    !selectedStatus[order.id] ||
                    selectedStatus[order.id] === order.status;

                  return (
                    <tr key={order.id} className="border-t border-gray-200">
                      <td className="px-4 py-2 text-sm text-gray-900 align-top">
                        {order.id}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-500 align-top">
                        {order.userName}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-500 align-top">
                        {order.createdAt.toDate().toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-500 align-top">
                        {order.totalAmount + CURRENCY_SYMBOL}
                      </td>

                      <td className="px-4 py-2 text-sm">
                        <div className="flex flex-col gap-3">
                          <div className="flex flex-wrap gap-x-4 gap-y-2">
                            {allOrderStatus.map((status) => (
                              <label
                                key={status}
                                className="flex items-center gap-1 cursor-pointer"
                              >
                                <input
                                  type="radio"
                                  name={`status-${order.id}`}
                                  value={status}
                                  checked={currentDisplayStatus === status}
                                  onChange={() =>
                                    handleRadioChange(order.id, status)
                                  }
                                />
                                {status}
                              </label>
                            ))}
                          </div>
                        </div>
                      </td>
                      <td>
                        <Button
                          size="sm"
                          onClick={() =>
                            updateOrderStatus(
                              order.id,
                              selectedStatus[order.id],
                            )
                          }
                          disabled={isButtonDisabled}
                        >
                          Update Status
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

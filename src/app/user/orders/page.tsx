"use client";
import { useEffect, useState } from "react";
import { db } from "@/utils/firebase";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { useAuthContext } from "@/app/AuthContextProvider";
import { CURRENCY_SYMBOL } from "@/utils/uiUtils";

interface OrderProps {
  id: string;
  userName: string;
  userId: string;
  totalAmount: number;
  status: string;
  createdAt: Timestamp;
}

export default function OrdersPage() {
  const user = useAuthContext();
  const [orders, setOrders] = useState<OrderProps[]>([]);

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "orders"));
        const data: OrderProps[] = querySnapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as OrderProps),
        );

        const userOrders = data.filter((order) => order.userId === user.id);
        setOrders(userOrders);
      } catch (error) {
        console.warn("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [user]);

  //TODO: orders page is not showing orders, need to fix it
  return (
    <div className="px-10 py-5 flex justify-center">
      <div className="flex flex-col max-w-[960px] w-full">
        <h1 className="text-2xl font-bold mb-4">My Orders</h1>

        <div className="overflow-x-auto px-4 py-3">
          <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-white">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                  Order Number
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                  Customer
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                  Order Date
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                  Total Amount
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order.id} className="border-t border-gray-200">
                    <td className="px-4 py-2 text-sm">{order.id}</td>
                    <td className="px-4 py-2 text-sm">{order.userName}</td>
                    <td className="px-4 py-2 text-sm text-gray-500">
                      {order.createdAt.toDate().toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 text-sm">
                      {order.totalAmount + CURRENCY_SYMBOL}
                    </td>
                    <td className="px-4 py-2">
                      <button className="w-full h-8 rounded-lg bg-gray-200 text-gray-900 text-sm font-medium">
                        {order.status}
                      </button>
                    </td>
                    <td className="px-4 py-2 text-sm text-blue-600 cursor-pointer">
                      View Details
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-4 text-center text-gray-500"
                  >
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

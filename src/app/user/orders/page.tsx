"use client";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/app/AuthContextProvider";
import getOrders from "./Orders";
import { LoadingSpinner } from "@/app/components/LoadingSpinner";
import { OrderProps } from "@/types/types";
import OrderTable from "@/app/components/OrderTable";

export default function OrdersPage() {
  const { user } = useAuthContext();
  const [orders, setOrders] = useState<OrderProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      try {
        const allOrders = await getOrders();
        const userOrders = allOrders.filter(
          (order) => order.userId === user.id,
        );
        setOrders(userOrders);
      } catch (error) {
        console.warn("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return <OrderTable orders={orders} />;
}

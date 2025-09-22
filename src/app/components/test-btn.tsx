"use client";

import { useState } from "react";
import { saveOrderToFirestore } from "../actions/admin/postOrderAction"; // senin fonksiyonun yolu
import { OrderStatus as orderStatus } from "../actions/admin/postOrderAction"; // enum'un varsa

export default function TestOrderButton() {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const testOrder = {
        userName: "Test User",
        userId: "guest",
        items: [
          {
            productId: "123",
            name: "Test Product",
            stripePriceId: "price_test_001",
            quantity: 1,
            price: 50,
          },
        ],
        totalAmount: 50,
        status: orderStatus.Paid,
      };

      const orderId = await saveOrderToFirestore(testOrder);
      console.log("Order saved with ID:", orderId);
      alert(`Test order kaydedildi. ID: ${orderId}`);
    } catch (error) {
      console.error("Test order save failed:", error);
      alert("Order kaydedilemedi!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors"
    >
      {loading ? "Kaydediliyor..." : "Test Order Kaydet"}
    </button>
  );
}

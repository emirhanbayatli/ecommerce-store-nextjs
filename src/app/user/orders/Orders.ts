"use server";
import { OrderProps } from "@/types/types";
import { db } from "@/utils/firebase";
import { collection, getDocs, Timestamp } from "firebase/firestore";

export default async function getOrders() {
  try {
    const querySnapshot = await getDocs(collection(db, "orders"));

    const data: OrderProps[] = querySnapshot.docs.map((doc) => {
      const docData = doc.data();

      return {
        id: doc.id,
        userName: docData.userName,
        userId: docData.userId,
        totalAmount: docData.totalAmount,
        status: docData.status,

        createdAt: docData.createdAt?.toDate(),
      } as OrderProps;
    });

    return data;
  } catch (error) {
    console.warn("Error fetching orders:", error);
    return [];
  }
}

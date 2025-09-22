"use server";
import { getProductsAction } from "../admin/products";
import {
  doc,
  updateDoc,
  increment,
  collection,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../../utils/firebase";
import { Resend } from "resend";

interface OrderItem {
  stripePriceId: string;
  quantity: number;
  price: number;
}
export const enum OrderStatus {
  Pending = "Pending",
  Paid = "Paid",
  Shipped = "Shipped",
  Delivered = "Delivered",
  Canceled = "Canceled",
}
interface OrderData {
  userName: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
}

export default async function updateStockAction(
  stripePriceId: string,
  productsQuantity: number,
) {
  try {
    const products = await getProductsAction();

    for (const product of products) {
      if (product.stripePriceId === stripePriceId) {
        const productRef = doc(db, "products", product.id.toString());
        await updateDoc(productRef, {
          stock: increment(-productsQuantity),
        });
      }
    }

    console.log("Firebase increment stok action is sucsess");
  } catch (error) {
    console.warn(error, "Firebase increment stok action is failed ");
  }
}

export async function sendConfirmationEmail(
  to: string,
  subject: string,
  html: string,
) {
  const resend = new Resend(process.env.RESEND_API_KEY!);

  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to,
      subject,
      html,
    });

    if (error) {
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.warn("Error sending email:", err);
    return { success: false, error: err };
  }
}

//TODO: Siparisler firebase e kayit edilmiyor nedenini anlayamadim test edilip duzeltilecek

export async function saveOrderToFirestore(order: OrderData) {
  try {
    const docRef = await addDoc(collection(db, "orders"), {
      ...order,
      createdAt: Timestamp.now(),
    });

    console.log("Order added with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding order: ", error);
  }
}

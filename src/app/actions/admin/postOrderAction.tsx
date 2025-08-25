"use server";
import { getProductsAction } from "../admin/products";
import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "../../../utils//firebase";

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

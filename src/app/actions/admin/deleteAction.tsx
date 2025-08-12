"use server";
import { vercelBlobDeleteAction } from "../../../utils/vercelBlob";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../../utils/firebase";

export async function deleteProductAction(id: string) {
  const productRef = doc(db, "products", id);
  const docSnap = await getDoc(productRef);
  const product = docSnap.data();
  const imageUrls = product?.images;
  const thumbnailUrl = product?.thumbnail[0];

  try {
    await deleteDoc(productRef);
    for (const imageUrl of imageUrls) {
      await vercelBlobDeleteAction(imageUrl);
    }
    await vercelBlobDeleteAction(thumbnailUrl);

    return {
      success: true,
      message: `Product with ID ${id} was deleted successfully.`,
    };
  } catch (error) {
    console.error("Failed to delete product:", id, error);
    return { success: false, message: "Failed to delete product." };
  }
}

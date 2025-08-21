import { getProductsAction } from "../admin/products";
import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "../../../utils//firebase";
export default async function updateStockAction(
  productId: number,
  productsQuantity: number,
) {
  const products = await getProductsAction();

  products.map(async (product) => {
    if (product.id == productId) {
      const productRef = doc(db, "products", productId.toString());
      await updateDoc(productRef, {
        stock: increment(-productsQuantity),
      });
    }
  });
}

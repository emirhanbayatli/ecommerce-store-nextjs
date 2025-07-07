"use client";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../../utils/firebase";
import { useEffect, useState } from "react";
import { Button } from "../../../../components/Button";
export default function EditProduct() {
  const params = useParams<{ productId: string }>();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      const docRef = doc(db, "products", params.productId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProduct(docSnap.data());
      } else {
        console.log("No such document!");
      }
    }
    fetchData();
  }, []);

  console.log("Editing product with ID:", params.productId);
  return (
    <div>
      <h1>Edit Product</h1>
      {product ? <h1>{product.title}</h1> : <p>Loading...</p>}
    </div>
  );
}

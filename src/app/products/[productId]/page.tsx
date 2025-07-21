import ItemDesc from "@/app/components/ItemDesc";
import { showStar } from "../../../utils/uiUtils";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
export default async function ProductDetails({
  params,
}: {
  params: { productId: string };
}) {
  const productRef = doc(db, "products", params.productId);
  const docSnap = await getDoc(productRef);
  const product = docSnap.data();

  if (!product) {
    return (
      <h1 className="mt-4 text-3xl text-center text-gray-60">
        Loading product...
      </h1>
    );
  }

  return (
    <main>
      <div className="flex flex-wrap justify-center gap-4 p-6">
        <ItemDesc
          id={Number(params.productId)}
          imgSrc={product.images[0]}
          imgAlt={product.title}
          title={product.title}
          price={product.price + " $"}
          description={product.description}
          rating={`${
            product.rating !== undefined
              ? showStar(Number(product.rating))
              : showStar(0)
          }`}
        />
      </div>
    </main>
  );
}

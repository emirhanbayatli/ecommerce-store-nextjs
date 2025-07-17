import ItemDesc from "@/app/components/ItemDesc";
import { showStar } from "../../../utils/uiUtils";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
export default async function ProductDetails({
  params,
}: {
  params: { productId: string };
}) {
  if (Number(params.productId) >= 31) {
    const productRef = doc(db, "products", params.productId);
    const docSnap = await getDoc(productRef);
    const product = docSnap.data();
    console.log(product, "product details");
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
            id={product.id}
            imgSrc={product.images}
            imgAlt={product.title}
            title={product.title}
            price={product.price + " $"}
            description={product.description}
            rating={showStar(Number(product.rating))}
          />
        </div>
      </main>
    );
  } else {
    const res = await fetch(
      "https://dummyjson.com/products/" + params.productId,
    );
    const data = await res.json();
    return (
      <main>
        <div className="flex flex-wrap justify-center gap-4 p-6">
          <ItemDesc
            id={Number(data.product?.id)}
            imgSrc={data.product?.images[0]}
            imgAlt={data.product?.title}
            title={data.product?.title}
            price={data.product?.price + " $"}
            description={data.product?.description}
            rating={showStar(Number(data.product?.rating))}
          />
        </div>
      </main>
    );
  }
}

import ItemDesc from "@/app/components/ItemDesc";
import { Carousel, showStar } from "../../../utils/uiUtils";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import React from "react";

interface Review {
  reviewerName: string;
  date: string;
  comment: string;
  rating: number;
  reviewerEmail?: string;
}

export default async function ProductDetails({
  params,
}: {
  params: { productId: string };
}) {
  const productRef = doc(db, "products", params.productId);
  const docSnap = await getDoc(productRef);
  const product = docSnap.data();

  const reviews: Review[] | undefined = product?.reviews;
  const dimensions = product?.dimensions;

  if (!product) {
    return (
      <h1 className="mt-4 text-3xl text-center text-gray-600">
        Loading product...
      </h1>
    );
  }

  return (
    <main>
      <div className="flex flex-wrap justify-center">
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

      {reviews && reviews.length > 0 ? (
        <div className="flex flex-col gap-4 p-6 max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">Comments</h2>
          {reviews.map((review, index) => (
            <div
              key={index}
              className="border rounded-xl p-5 bg-white shadow-md text-gray-800 space-y-2"
            >
              <div className="flex justify-between text-xs text-gray-500">
                <span>{review.reviewerName}</span>
                <span>{new Date(review.date).toLocaleDateString()}</span>
              </div>

              <p className="text-sm text-gray-700 italic">{`"${review.comment}"`}</p>

              <div className="text-yellow-500">{showStar(review.rating)}</div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-6">No reviews yet.</p>
      )}

      <div className="flex flex-col gap-4 p-6 max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Product Information</h2>

        <div>
          <p>
            <span className="font-medium">Brand:</span> {product.brand}
          </p>

          <h3 className="mt-4 font-semibold">Dimensions</h3>
          <p>
            <span className="font-medium">Height:</span> {dimensions.height} cm
          </p>
          <p>
            <span className="font-medium">Depth:</span> {dimensions.depth} cm
          </p>
          <p>
            <span className="font-medium">Width:</span> {dimensions.width} cm
          </p>
        </div>

        <div>
          <h3 className="mt-4 font-semibold">Return Policy</h3>
          <p>{product.returnPolicy}</p>
        </div>

        <div>
          <h3 className="mt-4 font-semibold">Shipping Information</h3>
          <p>{product.shippingInformation}</p>
        </div>

        <div>
          <h3 className="mt-4 font-semibold">Warranty Information</h3>
          <p>{product.warrantyInformation}</p>
        </div>
      </div>
    </main>
  );
}

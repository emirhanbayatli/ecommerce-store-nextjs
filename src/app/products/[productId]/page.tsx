import ItemDesc from "@/app/components/ItemDesc";
import { showStar } from "../../../utils/uiUtils";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import Link from "next/link";
import {
  ShieldCheckIcon,
  ArrowUturnLeftIcon,
  TruckIcon,
  TagIcon,
  ArrowsPointingOutIcon,
} from "@heroicons/react/24/outline";
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
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const productRef = doc(db, "products", productId);
  const docSnap = await getDoc(productRef);
  const product = docSnap.data();

  const reviews: Review[] | undefined = product?.reviews;
  const dimensions = product?.dimensions;
  const getInitials = (name: string) => {
    const names = name.split(" ");
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl text-gray-600 text-center mb-6">
          Oops! Product not found.
        </h1>
        <Link
          href="/products"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow-md"
        >
          Browse Other Products
        </Link>
      </div>
    );
  }

  return (
    <main>
      <div>
        <ItemDesc
          stripePriceId={product?.stripePriceId}
          id={productId}
          imgSrc={product.images}
          imgAlt={product.title}
          title={product.title}
          price={product.price}
          discount={product.discountPercentage}
          description={product.description}
          rating={`${
            product.rating !== undefined
              ? showStar(Number(product.rating))
              : showStar(0)
          }`}
        />
      </div>

      {reviews && reviews.length > 0 ? (
        <div className="p-6 max-w-7xl mx-auto mt-10 space-y-4">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="flex gap-4 p-5 bg-white border border-gray-200 rounded-lg"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 text-indigo-600 font-bold rounded-full flex items-center justify-center">
                {getInitials(review.reviewerName)}
              </div>

              <div className="w-full">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">
                      {review.reviewerName}
                    </p>
                  </div>
                  <div className="text-yellow-500">
                    {showStar(review.rating)}
                  </div>
                </div>

                <p className="text-gray-700 mt-2 mb-3">{review.comment}</p>

                <p className="text-xs text-gray-400 text-right">
                  {new Date(review.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-6">No reviews yet.</p>
      )}

      <div className="flex flex-col md:flex-row gap-8 my-10 max-w-7xl mx-auto px-4">
        <section className="w-full md:w-1/2">
          <div className="bg-white p-6 rounded-lg border border-gray-200 h-full">
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <TruckIcon className="h-5 w-5 text-indigo-600" />
                  <h4 className="font-semibold text-gray-800">
                    Shipping Information
                  </h4>
                </div>
                <p className="text-sm text-gray-600 pl-7">
                  {product.shippingInformation}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <ArrowUturnLeftIcon className="h-5 w-5 text-indigo-600" />
                  <h4 className="font-semibold text-gray-800">Return Policy</h4>
                </div>
                <p className="text-sm text-gray-600 pl-7">
                  {product.returnPolicy}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheckIcon className="h-5 w-5 text-indigo-600" />
                  <h4 className="font-semibold text-gray-800">
                    Warranty Information
                  </h4>
                </div>
                <p className="text-sm text-gray-600 pl-7">
                  {product.warrantyInformation}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full md:w-1/2">
          <div className="bg-white p-6 rounded-lg border border-gray-200 h-full">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">
                Product Specifications
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-2">
                  <span className="font-medium text-gray-500 flex items-center gap-2">
                    <TagIcon className="h-4 w-4" /> Brand
                  </span>
                  <span className="text-gray-800 font-medium">
                    {product.brand || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-medium text-gray-500 flex items-center gap-2">
                    <ArrowsPointingOutIcon className="h-4 w-4" /> Height
                  </span>
                  <span className="text-gray-800">{dimensions.height} cm</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-medium text-gray-500 flex items-center gap-2">
                    <ArrowsPointingOutIcon className="h-4 w-4" /> Width
                  </span>
                  <span className="text-gray-800">{dimensions.width} cm</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-medium text-gray-500 flex items-center gap-2">
                    <ArrowsPointingOutIcon className="h-4 w-4" /> Depth
                  </span>
                  <span className="text-gray-800">{dimensions.depth} cm</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

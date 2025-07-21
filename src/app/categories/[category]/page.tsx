import { getProductsAction } from "@/app/actions/admin/products";
import ItemCard from "@/app/components/ItemCard";
import { Product } from "@/types/types";
import { showStar } from "@/utils/uiUtils";
import Link from "next/link";

export default async function Categories({
  params,
}: {
  params: { category: string };
}) {
  const products = await getProductsAction();

  return (
    <div className="grid grid-cols-4 gap-3 p-5">
      {products.map((product: Product) => {
        if (params.category === product.category) {
          return (
            <Link key={product.id} href={`/products/${product.id}`}>
              <ItemCard
                id={product.id}
                imgSrc={product.images[0]}
                imgAlt={product.title}
                title={product.title}
                price={product.price + " $"}
                rating={`${
                  product.rating !== undefined
                    ? showStar(Number(product.rating))
                    : showStar(0)
                }`}
              />
            </Link>
          );
        }

        return null;
      })}
    </div>
  );
}

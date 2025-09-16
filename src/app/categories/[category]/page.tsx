import { getProductsAction } from "@/app/actions/admin/products";
import ItemCard from "@/app/components/ItemCard";
import { Product } from "@/types/types";
import { discountCalculation, showStar } from "@/utils/uiUtils";
import Link from "next/link";

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export default async function Categories({ params }: CategoryPageProps) {
  const { category } = params;
  const products = await getProductsAction();

  return (
    <div className="grid grid-cols-4 gap-3 p-5">
      {products.map((product: Product) => {
        if (category === product.category) {
          return (
            <Link key={product.id} href={`/products/${product.id}`}>
              <ItemCard
                id={product.id.toString()}
                title={product.title}
                imgSrc={product.images[0]}
                imgAlt={product.title}
                price={`$${product.price}`}
                discount={
                  product?.discountPercentage && product.discountPercentage > 0
                    ? discountCalculation(
                        product.price,
                        product.discountPercentage,
                      )
                    : product?.price
                }
                rating={showStar(product.rating ?? 0)}
              />
            </Link>
          );
        }
        return null;
      })}
    </div>
  );
}

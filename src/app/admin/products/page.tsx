"use client";
import { getProductsAction } from "../../actions/admin/products";
import { Button } from "../../components/Button";
import Link from "next/link";
import { deleteProductAction } from "../../actions/admin/products";
import { useEffect, useState } from "react";
import { Product } from "../../../types/types";
import Image from "next/image";
export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    async function fetchProducts() {
      const data = await getProductsAction();
      setProducts(data);
    }
    fetchProducts();
  }, []);
  return (
    <main>
      <h1 className="text-3xl text-center my-6">Admin Products</h1>

      <div className="container mx-auto px-4 my-12 max-w-5xl">
        {products.length > 0 ? (
          <div className="border rounded-xl">
            <div className="min-w-full">
              <div className="bg-white divide-y divide-gray-100">
                <ul>
                  {products.map((product: Product) => (
                    <li
                      key={product.id}
                      className="grid justify-items-center grid-cols-5 gap-5 place-items-center p-4"
                    >
                      <div className="w-[100px] h-[100px] rounded-full overflow-hidden">
                        <Image
                          src={product.images}
                          alt={product.title}
                          width={100}
                          height={100}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-center">{product.title}</span>
                      <span>{product.price} $</span>

                      <Link href={`/admin/products/${product.id}/edit`}>
                        <Button label="Edit" />
                      </Link>
                      <Button
                        label="Delete"
                        onClick={() =>
                          deleteProductAction(product.id.toString())
                        }
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center my-12">
            <h2 className="text-2xl my-4">Product list is empty!</h2>
          </div>
        )}
      </div>
    </main>
  );
}

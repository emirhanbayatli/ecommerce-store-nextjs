"use client";
import { getProductsAction } from "../../actions/admin/products";
import { Button } from "../../components/Button";
import Link from "next/link";
import { deleteProductAction } from "../../actions/admin/deleteAction";
import { useEffect, useState } from "react";
import { Product } from "../../../types/types";
import Image from "next/image";
export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [message, setMessage] = useState<{
    text: string;
    success: boolean;
  } | null>(null);

  async function handleDelete(id: string) {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this product?",
    );
    if (!isConfirmed) return;

    const res = await deleteProductAction(id);
    setMessage({ text: res.message, success: res.success });
    setTimeout(() => setMessage(null), 3000);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  useEffect(() => {
    async function fetchProducts() {
      const data = await getProductsAction();
      setProducts(data);
    }
    fetchProducts();
  }, []);
  return (
    <main>
      <div className="flex justify-evenly">
        <h1 className="text-3xl">Products</h1>
        <Link href={"/admin/products/new"}>
          <Button label="Add New Product" />
        </Link>
      </div>
      {message && (
        <div
          className={`my-4 p-3 rounded text-center font-semibold ${
            message.success
              ? "bg-green-200 text-green-800 text-sm mt-1 fixed top-1/2 "
              : "bg-gray-200 text-gray-600 text-sm mt-1 fixed top-1/2 "
          }`}
        >
          {message.text}
        </div>
      )}
      <div className="container mx-auto px-4 my-12 max-w-5xl">
        {products.length > 0 ? (
          <div className="border rounded-xl">
            <div className="min-w-full">
              <div>
                <ul>
                  {products.map((product: Product) => (
                    <li
                      key={product.id}
                      className="grid justify-items-center grid-cols-5 gap-5 place-items-center p-4"
                    >
                      <div className="w-[100px] h-[100px] rounded-full overflow-hidden">
                        <Image
                          src={product.images[0]}
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
                        onClick={() => handleDelete(product.id.toString())}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center my-12">
            <h2 className="text-2xl my-4">Loading</h2>
          </div>
        )}
      </div>
    </main>
  );
}

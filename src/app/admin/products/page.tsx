"use client";
import { getProductsAction } from "../../actions/admin/products";
import Link from "next/link";
import { deleteProductAction } from "../../actions/admin/deleteAction";
import { useEffect, useState } from "react";
import { Product } from "../../../types/types";
import Image from "next/image";
import { LoadingSpinner } from "@/app/components/LoadingSpinner";
import { toast } from "sonner";

import {
  AlertDialogTrigger,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/components/ui/alert-dialog";
import { Button } from "@/app/components/ui/button";

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [message, setMessage] = useState<{
    text: string;
    success: boolean;
  } | null>(null);

  useEffect(() => {
    if (message) {
      if (message.success) {
        toast.success(message.text);
      } else {
        toast.error(message.text);
      }

      setMessage(null);
    }
  }, [message]);

  useEffect(() => {
    async function fetchProducts() {
      const data = await getProductsAction();
      setProducts(data);
    }
    fetchProducts();
  }, []);

  async function handleDelete(id: string) {
    const res = await deleteProductAction(id);
    setMessage({ text: res.message, success: res.success });
    if (res.success) {
      setProducts((currentProducts) =>
        currentProducts.filter((product) => product.id.toString() !== id),
      );
    }
  }

  return (
    <main>
      <div className="flex gap-44 justify-center">
        <h1 className="text-3xl">Products</h1>
        <Link href={"/admin/products/new"}>
          <Button data-testid="addNewBtn">Add New Product</Button>
        </Link>
      </div>

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
                      <span className="text-center">
                        <Link href={`/products/${product.id}`}>
                          {product.title}
                        </Link>
                      </span>
                      <span>{product.price} $</span>

                      <Link href={`/admin/products/${product.id}/edit`}>
                        <Button variant="outline">Edit</Button>
                      </Link>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive">Delete</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action is permanent and cannot be undone. Are
                              you sure you want to delete this product?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() =>
                                handleDelete(product.id.toString())
                              }
                            >
                              Yes, Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center text-center">
            <LoadingSpinner />
          </div>
        )}
      </div>
    </main>
  );
}

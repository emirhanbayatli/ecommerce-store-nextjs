"use client";
import { useParams, useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../../utils/firebase";
import { useEffect, useState, useActionState } from "react";
import { Button } from "../../../../components/Button";
import {
  allCategories,
  allTags,
  allAvailabilityStatus,
  allReturnPolicies,
  Product,
  Tags,
} from "../../../../../types/types";
import { editProductAction } from "../../../../actions/admin/products";
import Form from "next/form";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { LoadingSpinner } from "@/app/components/LoadingSpinner";
import { toast } from "sonner";

const initialState: EditProductFormState = {
  success: false,
  inputs: {},
  errors: {},
};

export interface EditProductFormState {
  success: boolean;
  message?: string;
  inputs?: Partial<Product>;
  errors?: {
    [K in keyof Product]?: string[];
  };
  data?: Product;
}

export default function EditProduct() {
  const {
    register,
    formState: { errors },
  } = useForm({ mode: "all" });
  const [state, formAction, isPending] = useActionState<
    EditProductFormState,
    FormData
  >(editProductAction, initialState);

  const params = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  const router = useRouter();

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success(state.message);
        router.push("/admin/products");
      } else {
        toast.error(state.message);
      }
    }
  }, [state, router]);

  useEffect(() => {
    async function fetchData() {
      const docRef = doc(db, "products", params.productId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProduct(docSnap.data() as Product);
      } else {
        console.log("No such document!");
      }
    }
    fetchData();
  }, []);

  const [imagePreviews, setImagePreviews] = useState<string[]>();
  const [thumbnailPreview, setThumbnailPreview] = useState<string>();

  useEffect(() => {
    if (product) {
      setImagePreviews(product.images ?? []);
      setThumbnailPreview(product.thumbnail ?? "");
    }
  }, [product]);

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const urls = Array.from(files).map((file) => URL.createObjectURL(file));
      setImagePreviews(urls);
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setThumbnailPreview(url);
    }
  };

  if (isPending) return <LoadingSpinner />;

  const inputClass =
    "my-1 mx-0.5 rounded-md border border-gray-300 bg-white p-2 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all";

  return (
    <main className="max-w-4xl mx-auto my-6 pb-12">
      {product ? (
        <div>
          <Form
            noValidate
            action={formAction}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-4 md:p-8 rounded-xl shadow-md"
          >
            <input
              id="stripeProductId"
              type="hidden"
              name="stripeProductId"
              value={product.stripeProductId || ""}
            />
            <input
              id="stripePriceId"
              type="hidden"
              name="stripePriceId"
              value={product.stripePriceId || ""}
            />
            <input
              id="productId"
              type="hidden"
              name="productId"
              value={params.productId}
            />

            <div className="flex flex-col col-span-2">
              <label htmlFor="productId" className="font-bold mb-1">
                ID
              </label>
              <p id="productId" className={inputClass}>
                {params.productId}
              </p>
              <label htmlFor="stripeProductId" className="font-bold mb-1">
                Stripe Product ID
              </label>
              <p className={inputClass}>
                {product.stripeProductId
                  ? product.stripeProductId
                  : "Not available"}
              </p>
              <label htmlFor="stripePriceId" className="font-bold mb-1">
                Stripe Price ID
              </label>
              <p className={inputClass}>
                {product.stripePriceId
                  ? product.stripePriceId
                  : "Not available"}
              </p>
              <label htmlFor="title" className="font-bold mb-1">
                Title
              </label>
              <input
                {...register("title", {
                  required: "Title is required",
                  minLength: {
                    value: 3,
                    message: "Title must be at least 3 characters long",
                  },
                  maxLength: {
                    value: 100,
                    message: "Title must not exceed 100 characters",
                  },
                })}
                data-testid="title"
                name="title"
                defaultValue={product.title}
                type="text"
                id="title"
                className={inputClass}
              />
              {state?.errors?.title && (
                <p className="text600 text-sm">{state.errors.title}</p>
              )}
              {errors.title?.message && (
                <p className="text600 text-sm">
                  {errors.title.message as string}
                </p>
              )}
            </div>

            <div className="flex flex-col col-span-2">
              <label htmlFor="description" className="font-bold mb-1">
                Description
              </label>
              <input
                {...register("description", {
                  required: "Description is required",
                  minLength: {
                    value: 50,
                    message: "Description must be at least 50 characters long",
                  },
                  maxLength: {
                    value: 500,
                    message: "Description must not exceed 500 characters",
                  },
                })}
                defaultValue={product.description}
                type="text"
                id="description"
                name="description"
                className={inputClass}
              />
              {state?.errors?.description && (
                <p className="text600 text-sm">{state.errors.description}</p>
              )}

              {errors.description?.message && (
                <p className="text600 text-sm">
                  {errors.description.message as string}
                </p>
              )}
            </div>

            <div className="flex flex-col col-span-2 md:col-span-1">
              <label htmlFor="category" className="font-bold mb-1">
                Category
              </label>
              <select
                {...register("category", {
                  required: "Category is required",
                  validate: (value) =>
                    allCategories.includes(value) ||
                    "Please select a valid category",
                })}
                defaultValue={product.category}
                id="category"
                name="category"
                className={inputClass}
              >
                {allCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {state?.errors?.category && (
                <p className="text600 text-sm">{state.errors.category}</p>
              )}
              {errors.category?.message && (
                <p className="text600 text-sm">
                  {errors.category.message as string}
                </p>
              )}
            </div>

            <div className="flex flex-col col-span-2 md:col-span-1">
              <label htmlFor="price" className="font-bold mb-1">
                Price
              </label>
              <input
                {...register("price", {
                  required: "Price is required",
                  min: {
                    value: 0,
                    message: "Price must be zero or a positive number",
                  },
                  max: {
                    value: 9999999999,
                    message: "Price cannot exceed 9,999,999,999",
                  },
                  valueAsNumber: true,
                })}
                defaultValue={product.price}
                type="number"
                id="price"
                name="price"
                className={inputClass}
              />
              {state?.errors?.price && (
                <p className="text600 text-sm">{state.errors.price}</p>
              )}
              {errors.price?.message && (
                <p className="text600 text-sm">
                  {errors.price.message as string}
                </p>
              )}
            </div>

            <div className="flex flex-col col-span-2 md:col-span-1">
              <label htmlFor="discountPercentage" className="font-bold mb-1">
                Discount Percentage
              </label>
              <input
                {...register("discountPercentage", {
                  required: "Discount Percentage is required",
                  min: {
                    value: 0,
                    message: "Discount must be at least 0%",
                  },
                  max: {
                    value: 100,
                    message: "Discount cannot exceed 100%",
                  },
                  valueAsNumber: true,
                })}
                defaultValue={product.discountPercentage}
                type="number"
                id="discountPercentage"
                name="discountPercentage"
                className={inputClass}
              />
              {state?.errors?.discountPercentage && (
                <p className="text600 text-sm">
                  {state.errors.discountPercentage}
                </p>
              )}
              {errors.discountPercentage?.message && (
                <p className="text600 text-sm">
                  {errors.discountPercentage.message as string}
                </p>
              )}
            </div>

            <div className="flex flex-col col-span-2 md:col-span-1">
              <label htmlFor="stock" className="font-bold mb-1">
                Stock
              </label>
              <input
                {...register("stock", {
                  required: "Stock is required",
                  min: {
                    value: 0,
                    message: "Stock must be zero or a positive number",
                  },
                  max: {
                    value: 9999999999,
                    message: "Stock cannot exceed 9,999,999,999",
                  },
                  valueAsNumber: true,
                })}
                defaultValue={product.stock}
                type="number"
                id="stock"
                name="stock"
                step="1"
                className={inputClass}
              />
              {state?.errors?.stock && (
                <p className="text600 text-sm">{state.errors.stock}</p>
              )}
              {errors.stock?.message && (
                <p className="text600 text-sm">
                  {errors.stock.message as string}
                </p>
              )}
            </div>

            <div className="flex flex-col col-span-2">
              <label htmlFor="tags" className="font-bold mb-1">
                Tags
              </label>
              <div className="gap-2 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2">
                {allTags.map((tag) => (
                  <label key={tag}>
                    <input
                      type="checkbox"
                      name="tags"
                      value={tag}
                      defaultChecked={product?.tags?.includes(tag as Tags)}
                      className={inputClass}
                    />
                    {tag.replace("_", " ")}
                  </label>
                ))}
              </div>
              {state?.errors?.tags && (
                <p className="text600 text-sm">{state.errors.tags}</p>
              )}
              {errors.tags?.message && (
                <p className="text600 text-sm">
                  {errors.tags.message as string}
                </p>
              )}
            </div>

            <div className="flex flex-col col-span-2 md:col-span-1">
              <label htmlFor="brand" className="font-bold mb-1">
                Brand
              </label>
              <input
                {...register("brand", {
                  required: "Brand is required",
                  minLength: {
                    value: 2,
                    message: "Brand must be at least 2 characters",
                  },
                  maxLength: {
                    value: 50,
                    message: "Brand must not exceed 50 characters",
                  },
                })}
                defaultValue={product.brand}
                type="text"
                id="brand"
                name="brand"
                className={inputClass}
              />
              {state?.errors?.brand && (
                <p className="text600 text-sm">{state.errors.brand}</p>
              )}
              {errors.brand?.message && (
                <p className="text600 text-sm">
                  {errors.brand.message as string}
                </p>
              )}
            </div>

            <div className="flex flex-col col-span-2 md:col-span-1">
              <label htmlFor="sku" className="font-bold mb-1">
                SKU
              </label>
              <input
                {...register("sku", {
                  required: "SKU is required",
                  minLength: {
                    value: 1,
                    message: "SKU must be at least 1 character",
                  },
                  maxLength: {
                    value: 100,
                    message: "SKU must not exceed 100 characters",
                  },
                })}
                defaultValue={product.sku}
                type="text"
                id="sku"
                name="sku"
                className={inputClass}
              />
              {state?.errors?.sku && (
                <p className="text600 text-sm">{state.errors.sku}</p>
              )}
              {errors.sku?.message && (
                <p className="text600 text-sm">
                  {errors.sku.message as string}
                </p>
              )}
            </div>

            <div className="flex flex-col col-span-2 md:col-span-1">
              <label htmlFor="weight" className="font-bold mb-1">
                Weight
              </label>
              <input
                {...register("weight", {
                  required: "Weight is required",
                  min: {
                    value: 0,
                    message: "Weight must be zero or a positive number",
                  },
                  max: {
                    value: 9999999999,
                    message: "Weight cannot exceed 9,999,999,999 grams",
                  },
                  valueAsNumber: true,
                })}
                defaultValue={product.weight}
                type="number"
                id="weight"
                name="weight"
                className={inputClass}
              />
              {state?.errors?.weight && (
                <p className="text600 text-sm">{state.errors.weight}</p>
              )}
              {errors.weight?.message && (
                <p className="text600 text-sm">
                  {errors.weight.message as string}
                </p>
              )}
            </div>

            <div className="flex flex-col col-span-2 md:col-span-1">
              <label htmlFor="dimensions" className="font-bold mb-1">
                Dimensions
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  {...register("dimensions_width", {
                    required: "Width is required",
                    min: {
                      value: 0,
                      message: "Width must be zero or positive",
                    },
                    max: {
                      value: 999999,
                      message: "Width cannot exceed 999999 cm",
                    },
                    valueAsNumber: true,
                  })}
                  defaultValue={product.dimensions?.width}
                  type="number"
                  id="width"
                  name="dimensions_width"
                  placeholder="Width"
                  className={`${inputClass} w-full`}
                />

                <input
                  {...register("dimensions_height", {
                    required: "Height is required",
                    min: {
                      value: 0,
                      message: "Height must be zero or positive",
                    },
                    max: {
                      value: 999999,
                      message: "Height cannot exceed 999999 cm",
                    },
                    valueAsNumber: true,
                  })}
                  defaultValue={product.dimensions?.height}
                  type="number"
                  id="height"
                  name="dimensions_height"
                  placeholder="Height"
                  className={`${inputClass} w-full`}
                />

                <input
                  {...register("dimensions_depth", {
                    required: "Depth is required",
                    min: {
                      value: 0,
                      message: "Depth must be zero or positive",
                    },
                    max: {
                      value: 999999,
                      message: "Depth cannot exceed 999999 cm",
                    },
                    valueAsNumber: true,
                  })}
                  defaultValue={product.dimensions?.depth}
                  type="number"
                  id="depth"
                  name="dimensions_depth"
                  placeholder="Depth"
                  className={`${inputClass} w-full`}
                />
              </div>
              {state?.errors?.dimensions && (
                <p className="text600 text-sm">{state.errors.dimensions}</p>
              )}
              {errors.dimensions_width?.message && (
                <p className="text600 text-sm">
                  {errors.dimensions_width.message as string}
                </p>
              )}
              {errors.dimensions_height?.message && (
                <p className="text600 text-sm">
                  {errors.dimensions_height.message as string}
                </p>
              )}
              {errors.dimensions_depth?.message && (
                <p className="text600 text-sm">
                  {errors.dimensions_depth.message as string}
                </p>
              )}
            </div>

            <div className="flex flex-col col-span-2 md:col-span-1">
              <label htmlFor="warrantyInformation" className="font-bold mb-1">
                Warranty Information
              </label>
              <input
                {...register("warrantyInformation", {
                  required: "Warranty information is required",
                  minLength: {
                    value: 1,
                    message:
                      "Warranty information must be at least 1 character",
                  },
                  maxLength: {
                    value: 500,
                    message:
                      "Warranty information must not exceed 500 characters",
                  },
                })}
                defaultValue={product.warrantyInformation}
                type="text"
                id="warrantyInformation"
                name="warrantyInformation"
                className={inputClass}
              />
              {state?.errors?.warrantyInformation && (
                <p className="text600 text-sm">
                  {state.errors.warrantyInformation}
                </p>
              )}
              {errors.warrantyInformation?.message && (
                <p className="text600 text-sm">
                  {errors.warrantyInformation.message as string}
                </p>
              )}
            </div>

            <div className="flex flex-col col-span-2 md:col-span-1">
              <label htmlFor="shippingInformation" className="font-bold mb-1">
                Shipping Information
              </label>
              <input
                {...register("shippingInformation", {
                  required: "Shipping information is required",
                  minLength: {
                    value: 1,
                    message:
                      "Shipping information must be at least 1 character",
                  },
                  maxLength: {
                    value: 500,
                    message:
                      "Shipping information must not exceed 500 characters",
                  },
                })}
                defaultValue={product.shippingInformation}
                type="text"
                id="shippingInformation"
                name="shippingInformation"
                className={inputClass}
              />
              {state?.errors?.shippingInformation && (
                <p className="text600 text-sm">
                  {state.errors.shippingInformation}
                </p>
              )}
              {errors.shippingInformation?.message && (
                <p className="text600 text-sm">
                  {errors.shippingInformation.message as string}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="availabilityStatus" className="font-bold mb-1">
                Availability Status
              </label>
              <div className="flex flex-wrap gap-2">
                {allAvailabilityStatus.map((availabilityStatus) => {
                  const id = `availabilityStatus-${availabilityStatus}`;
                  return (
                    <label
                      key={availabilityStatus}
                      htmlFor={id}
                      className="flex items-center gap-1"
                    >
                      <input
                        {...register("availabilityStatus", {
                          required: "Availability status is required",
                          validate: (value) =>
                            allAvailabilityStatus.includes(value) ||
                            "Please choose an availability status",
                        })}
                        defaultChecked={
                          product.availabilityStatus === availabilityStatus
                        }
                        id={id}
                        type="radio"
                        name="availabilityStatus"
                        value={availabilityStatus}
                        className={inputClass}
                      />
                      {availabilityStatus}
                    </label>
                  );
                })}
              </div>
              {state?.errors?.availabilityStatus && (
                <p className="text600 text-sm">
                  {state.errors.availabilityStatus.join(", ")}
                </p>
              )}
              {errors.availabilityStatus?.message && (
                <p className="text600 text-sm">
                  {errors.availabilityStatus.message as string}
                </p>
              )}
            </div>

            <div className="flex flex-col col-span-2 md:col-span-1">
              <label htmlFor="minimumOrderQuantity" className="font-bold mb-1">
                Minimum Order Quantity
              </label>
              <input
                {...register("minimumOrderQuantity", {
                  required: "Minimum order quantity is required",
                  min: {
                    value: 1,
                    message: "Minimum order must be at least 1",
                  },
                  max: {
                    value: 9999999999,
                    message: "Minimum order cannot exceed 9,999,999,999",
                  },
                  valueAsNumber: true,
                })}
                defaultValue={product.minimumOrderQuantity}
                type="number"
                id="minimumOrderQuantity"
                name="minimumOrderQuantity"
                className={inputClass}
              />
              {state?.errors?.minimumOrderQuantity && (
                <p className="text600 text-sm">
                  {state.errors.minimumOrderQuantity}
                </p>
              )}
              {errors.minimumOrderQuantity?.message && (
                <p className="text600 text-sm">
                  {errors.minimumOrderQuantity.message as string}
                </p>
              )}
            </div>

            <div className="flex flex-col col-span-2">
              <label htmlFor="returnPolicy" className="font-bold mb-1">
                Return Policy
              </label>
              <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-2">
                {allReturnPolicies.map((returnPolicy) => {
                  const id = `returnPolicy-${returnPolicy}`;

                  return (
                    <label
                      key={returnPolicy}
                      htmlFor={id}
                      className="flex items-center gap-1"
                    >
                      <input
                        {...register("returnPolicy", {
                          required: "Return policy is required",
                          validate: (value) =>
                            allReturnPolicies.includes(value) ||
                            "Please select a return policy",
                        })}
                        defaultChecked={product.returnPolicy === returnPolicy}
                        id={id}
                        type="radio"
                        name="returnPolicy"
                        value={returnPolicy}
                        className={inputClass}
                      />
                      {returnPolicy}
                    </label>
                  );
                })}
              </div>
              {state?.errors?.returnPolicy && (
                <p className="text600 text-sm">{state.errors.returnPolicy}</p>
              )}
              {errors.returnPolicy?.message && (
                <p className="text600 text-sm">
                  {errors.returnPolicy.message as string}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="status" className="font-bold mb-1">
                Product Status
              </label>
              <div className="flex items-center flex-wrap gap-4">
                <label className="flex items-center gap-1">
                  <input
                    {...register("status")}
                    type="radio"
                    value="Standard"
                    className={inputClass}
                  />
                  Standard
                </label>

                <label className="flex items-center gap-1">
                  <input
                    {...register("status")}
                    type="radio"
                    value="Explore"
                    className={inputClass}
                  />
                  Explore
                </label>

                <label className="flex items-center gap-1">
                  <input
                    {...register("status")}
                    type="radio"
                    value="Featured"
                    className={inputClass}
                  />
                  Featured
                </label>
              </div>
              {state?.errors?.status && (
                <p className="text600 text-sm">{state.errors.status}</p>
              )}
              {errors.status?.message && (
                <p className="text600 text-sm">
                  {errors.status.message as string}
                </p>
              )}
            </div>

            <div className="flex flex-col col-span-2">
              <label htmlFor="images" className="font-bold mb-1">
                Images
              </label>
              <input
                accept=".jpeg, .jpg, .webp"
                type="file"
                multiple
                id="images"
                name="images"
                className={inputClass}
                placeholder="Simply separate each link with a comma to add more than one."
                onChange={handleImagesChange}
              />
              {errors.images?.message && (
                <p className="text600 text-sm">
                  {errors.images.message as string}
                </p>
              )}
              <div className="flex gap-5 flex-wrap">
                {imagePreviews?.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`Image Preview ${index}`}
                    className="rounded shadow max-w-32 mt-4"
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col col-span-2">
              <label htmlFor="thumbnail" className="font-bold mb-1">
                Thumbnail
              </label>
              <input
                accept=".jpeg, .jpg, .webp"
                type="file"
                id="thumbnail"
                name="thumbnail"
                className={inputClass}
                placeholder="Simply separate each link with a comma to add more than one."
                onChange={handleThumbnailChange}
              />

              {errors.thumbnail?.message && (
                <p className="text600 text-sm">
                  {errors.thumbnail.message as string}
                </p>
              )}
              {state?.errors?.thumbnail && (
                <p className="text600 text-sm">{state.errors.thumbnail}</p>
              )}

              {thumbnailPreview && (
                <div className="mt-4">
                  <img
                    src={thumbnailPreview}
                    alt="Thumbnail Preview"
                    className="rounded shadow max-w-32"
                  />
                </div>
              )}
            </div>

            <Button
              data-testid="update-btn"
              label="Update Product"
              type="submit"
              className="col-span-2 md:col-span-1"
            />
            <Link className="col-span-2 md:col-span-1" href={"/admin/products"}>
              <Button className="w-full " label="Cancel" />
            </Link>
          </Form>
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </main>
  );
}

"use client";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../../utils/firebase";
import { useEffect, useState } from "react";
import { Button } from "../../../../components/Button";
import {
  allCategories,
  allTags,
  allAvailabilityStatus,
  allReturnPolicies,
} from "../../../../../types/types";
export default function EditProduct() {
  const params = useParams<{ productId: string }>();
  const [product, setProduct] = useState<any>();

  useEffect(() => {
    async function fetchData() {
      const docRef = doc(db, "products", params.productId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProduct(docSnap.data());
      } else {
        console.log("No such document!");
      }
    }
    fetchData();
  }, []);

  console.log("Editing product with ID:", params.productId);
  return (
    <div>
      {product ? (
        <div>
          <form
   
            className="grid grid-cols-2 gap-6 bg-white p-8 rounded-xl shadow-md"
          >
            <div className="flex flex-col col-span-2">
              <label htmlFor="title" className="font-bold mb-1">
                Title
              </label>
              <input
                // {...register("title", {
                //   required: "Title is required",
                //   minLength: {
                //     value: 3,
                //     message: "Title must be at least 3 characters long",
                //   },
                //   maxLength: {
                //     value: 100,
                //     message: "Title must not exceed 100 characters",
                //   },
                // })}
                defaultValue={product.title}
                type="text"
                id="title"
                className="bg-stone-200 text-stone-900 p-2 rounded"
              />
              {/* {state?.errors?.title && (
                <p className="text-red-600 text-sm">{state.errors.title}</p>
              )}
              {errors.title?.message && (
                <p className="text-red-600 text-sm">
                  {errors.title.message as string}
                </p>
              )} */}
            </div>

            <div className="flex flex-col col-span-2">
              <label htmlFor="description" className="font-bold mb-1">
                Description
              </label>
              <input
                // {...register("description", {
                //   required: "Description is required",
                //   minLength: {
                //     value: 50,
                //     message: "Description must be at least 50 characters long",
                //   },
                //   maxLength: {
                //     value: 500,
                //     message: "Description must not exceed 500 characters",
                //   },
                // })}
                defaultValue={product.description}
                type="text"
                id="description"
                name="description"
                className="dark:bg-stone-200 dark:text-stone-900 p-2 rounded"
              />
              {/* {state?.errors?.description && (
                <p className="text-red-600 text-sm">
                  {state.errors.description}
                </p>
              )}

              {errors.description?.message && (
                <p className="text-red-600 text-sm">
                  {errors.description.message as string}
                </p>
              )} */}
            </div>

            <div className="flex flex-col">
              <label htmlFor="category" className="font-bold mb-1">
                Category
              </label>
              <select
                // {...register("category", {
                //   required: "Category is required",
                //   validate: (value) =>
                //     allCategories.includes(value) ||
                //     "Please select a valid category",
                // })}

                defaultValue={product.category}
                id="category"
                name="category"
                className="dark:bg-stone-200 dark:text-stone-900 p-2 rounded"
              >
                {/* <option defaultValue="" disabled>
              Select Category
            </option> */}
                {allCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {/* {state?.errors?.category && (
                <p className="text-red-600 text-sm">{state.errors.category}</p>
              )}
              {errors.category?.message && (
                <p className="text-red-600 text-sm">
                  {errors.category.message as string}
                </p>
              )} */}
            </div>

            <div className="flex flex-col">
              <label htmlFor="price" className="font-bold mb-1">
                Price
              </label>
              <input
                // {...register("price", {
                //   required: "Price is required",
                //   min: {
                //     value: 0,
                //     message: "Price must be zero or a positive number",
                //   },
                //   max: {
                //     value: 9999999999,
                //     message: "Price cannot exceed 9,999,999,999",
                //   },
                //   valueAsNumber: true,
                // })}
                defaultValue={product.price}
                type="number"
                id="price"
                name="price"
                className="dark:bg-stone-200 dark:text-stone-900 p-2 rounded"
              />
              {/* {state?.errors?.price && (
                <p className="text-red-600 text-sm">{state.errors.price}</p>
              )}
              {errors.price?.message && (
                <p className="text-red-600 text-sm">
                  {errors.price.message as string}
                </p>
              )} */}
            </div>

            <div className="flex flex-col">
              <label htmlFor="discountPercentage" className="font-bold mb-1">
                Discount Percentage
              </label>
              <input
                // {...register("discountPercentage", {
                //   required: "Discount Percentage is required",
                //   min: {
                //     value: 0,
                //     message: "Discount must be at least 0%",
                //   },
                //   max: {
                //     value: 100,
                //     message: "Discount cannot exceed 100%",
                //   },
                //   valueAsNumber: true,
                // })}
                defaultValue={product.discountPercentage}
                type="number"
                id="discountPercentage"
                name="discountPercentage"
                className="dark:bg-stone-200 dark:text-stone-900 p-2 rounded"
              />
              {/* {state?.errors?.discountPercentage && (
                <p className="text-red-600 text-sm">
                  {state.errors.discountPercentage}
                </p>
              )}
              {errors.discountPercentage?.message && (
                <p className="text-red-600 text-sm">
                  {errors.discountPercentage.message as string}
                </p>
              )} */}
            </div>

            <div className="flex flex-col">
              <label htmlFor="stock" className="font-bold mb-1">
                Stock
              </label>
              <input
                // {...register("stock", {
                //   required: "Stock is required",
                //   min: {
                //     value: 0,
                //     message: "Stock must be zero or a positive number",
                //   },
                //   max: {
                //     value: 9999999999,
                //     message: "Stock cannot exceed 9,999,999,999",
                //   },
                //   valueAsNumber: true,
                // })}
                defaultValue={product.stock}
                type="number"
                id="stock"
                name="stock"
                className="dark:bg-stone-200 dark:text-stone-900 p-2 rounded"
              />
              {/* {state?.errors?.stock && (
                <p className="text-red-600 text-sm">{state.errors.stock}</p>
              )}
              {errors.stock?.message && (
                <p className="text-red-600 text-sm">
                  {errors.stock.message as string}
                </p>
              )} */}
            </div>

            <div className="flex flex-col col-span-2">
              <label htmlFor="tags" className="font-bold mb-1">
                Tags
              </label>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <label key={tag} className="flex items-center gap-1">
                    <input
                      // {...register("tags", {
                      //   required: "Tags is required",
                      //   validate: (value) =>
                      //     (Array.isArray(value) &&
                      //       value.every((v) => allTags.includes(v))) ||
                      //     "Please choose valid tags",
                      // })}
                      defaultChecked={product.tags?.includes(tag)}
                      id={`tag-${tag}`}
                      name="tags"
                      type="checkbox"
                      value={tag}
                      className="accent-stone-900"
                    />
                    {tag}
                  </label>
                ))}
              </div>
              {/* {state?.errors?.tags && (
                <p className="text-red-600 text-sm">{state.errors.tags}</p>
              )}
              {errors.tags?.message && (
                <p className="text-red-600 text-sm">
                  {errors.tags.message as string}
                </p>
              )} */}
            </div>

            <div className="flex flex-col">
              <label htmlFor="brand" className="font-bold mb-1">
                Brand
              </label>
              <input
                // {...register("brand", {
                //   required: "Brand is required",
                //   minLength: {
                //     value: 2,
                //     message: "Brand must be at least 2 characters",
                //   },
                //   maxLength: {
                //     value: 50,
                //     message: "Brand must not exceed 50 characters",
                //   },
                // })}
                defaultValue={product.brand}
                type="text"
                id="brand"
                name="brand"
                className="dark:bg-stone-200 dark:text-stone-900 p-2 rounded"
              />
              {/* {state?.errors?.brand && (
                <p className="text-red-600 text-sm">{state.errors.brand}</p>
              )}
              {errors.brand?.message && (
                <p className="text-red-600 text-sm">
                  {errors.brand.message as string}
                </p>
              )} */}
            </div>

            <div className="flex flex-col">
              <label htmlFor="sku" className="font-bold mb-1">
                SKU
              </label>
              <input
                // {...register("sku", {
                //   required: "SKU is required",
                //   minLength: {
                //     value: 1,
                //     message: "SKU must be at least 1 character",
                //   },
                //   maxLength: {
                //     value: 100,
                //     message: "SKU must not exceed 100 characters",
                //   },
                // })}
                defaultValue={product.sku}
                type="text"
                id="sku"
                name="sku"
                className="dark:bg-stone-200 dark:text-stone-900 p-2 rounded"
              />
              {/* {state?.errors?.sku && (
                <p className="text-red-600 text-sm">{state.errors.sku}</p>
              )}
              {errors.sku?.message && (
                <p className="text-red-600 text-sm">
                  {errors.sku.message as string}
                </p>
              )} */}
            </div>

            <div className="flex flex-col">
              <label htmlFor="weight" className="font-bold mb-1">
                Weight
              </label>
              <input
                // {...register("weight", {
                //   required: "Weight is required",
                //   min: {
                //     value: 0,
                //     message: "Weight must be zero or a positive number",
                //   },
                //   max: {
                //     value: 9999999999,
                //     message: "Weight cannot exceed 9,999,999,999 grams",
                //   },
                //   valueAsNumber: true,
                // })}
                defaultValue={product.weight}
                type="number"
                id="weight"
                name="weight"
                className="dark:bg-stone-200 dark:text-stone-900 p-2 rounded"
              />
              {/* {state?.errors?.weight && (
                <p className="text-red-600 text-sm">{state.errors.weight}</p>
              )}
              {errors.weight?.message && (
                <p className="text-red-600 text-sm">
                  {errors.weight.message as string}
                </p>
              )} */}
            </div>

            <div className="flex flex-col">
              <label htmlFor="dimensions" className="font-bold mb-1">
                Dimensions
              </label>
              <div className="flex gap-5 justify-center">
                <input
                  // {...register("dimensions_width", {
                  //   required: "Width is required",
                  //   min: {
                  //     value: 0,
                  //     message: "Width must be zero or positive",
                  //   },
                  //   max: {
                  //     value: 999999,
                  //     message: "Width cannot exceed 999999 cm",
                  //   },
                  //   valueAsNumber: true,
                  // })}
                  defaultValue={product.dimensions?.width}
                  type="number"
                  id="width"
                  name="dimensions_width"
                  placeholder="Width"
                  className="dark:bg-stone-200 dark:text-stone-900  p-2 rounded max-w-30"
                />

                <input
                  // {...register("dimensions_height", {
                  //   required: "Height is required",
                  //   min: {
                  //     value: 0,
                  //     message: "Height must be zero or positive",
                  //   },
                  //   max: {
                  //     value: 999999,
                  //     message: "Height cannot exceed 999999 cm",
                  //   },
                  //   valueAsNumber: true,
                  // })}
                  defaultValue={product.dimensions?.height}
                  type="number"
                  id="height"
                  name="dimensions_height"
                  placeholder="Height"
                  className="dark:bg-stone-200 dark:text-stone-900 p-2 rounded max-w-30"
                />

                <input
                  // {...register("dimensions_depth", {
                  //   required: "Depth is required",
                  //   min: {
                  //     value: 0,
                  //     message: "Depth must be zero or positive",
                  //   },
                  //   max: {
                  //     value: 999999,
                  //     message: "Depth cannot exceed 999999 cm",
                  //   },
                  //   valueAsNumber: true,
                  // })}
                  defaultValue={product.dimensions?.depth}
                  type="number"
                  id="depth"
                  name="dimensions_depth"
                  placeholder="Depth"
                  className="dark:bg-stone-200 dark:text-stone-900 p-2 rounded max-w-30"
                />
              </div>
              {/* {state?.errors?.dimensions && (
                <p className="text-red-600 text-sm">
                  {state.errors.dimensions}
                </p>
              )}
              {errors.dimensions_width?.message && (
                <p className="text-red-600 text-sm">
                  {errors.dimensions_width.message as string}
                </p>
              )}
              {errors.dimensions_height?.message && (
                <p className="text-red-600 text-sm">
                  {errors.dimensions_height.message as string}
                </p>
              )}
              {errors.dimensions_depth?.message && (
                <p className="text-red-600 text-sm">
                  {errors.dimensions_depth.message as string}
                </p>
              )} */}
            </div>

            <div className="flex flex-col">
              <label htmlFor="warrantyInformation" className="font-bold mb-1">
                Warranty Information
              </label>
              <input
                // {...register("warrantyInformation", {
                //   required: "Warranty information is required",
                //   minLength: {
                //     value: 1,
                //     message:
                //       "Warranty information must be at least 1 character",
                //   },
                //   maxLength: {
                //     value: 500,
                //     message:
                //       "Warranty information must not exceed 500 characters",
                //   },
                // })}
                defaultValue={product.warrantyInformation}
                type="text"
                id="warrantyInformation"
                name="warrantyInformation"
                className="dark:bg-stone-200 dark:text-stone-900 p-2 rounded"
              />
              {/* {state?.errors?.warrantyInformation && (
                <p className="text-red-600 text-sm">
                  {state.errors.warrantyInformation}
                </p>
              )}
              {errors.warrantyInformation?.message && (
                <p className="text-red-600 text-sm">
                  {errors.warrantyInformation.message as string}
                </p>
              )} */}
            </div>

            <div className="flex flex-col">
              <label htmlFor="shippingInformation" className="font-bold mb-1">
                Shipping Information
              </label>
              <input
                // {...register("shippingInformation", {
                //   required: "Shipping information is required",
                //   minLength: {
                //     value: 1,
                //     message:
                //       "Shipping information must be at least 1 character",
                //   },
                //   maxLength: {
                //     value: 500,
                //     message:
                //       "Shipping information must not exceed 500 characters",
                //   },
                // })}
                defaultValue={product.shippingInformation}
                type="text"
                id="shippingInformation"
                name="shippingInformation"
                className="dark:bg-stone-200 dark:text-stone-900 p-2 rounded"
              />
              {/* {state?.errors?.shippingInformation && (
                <p className="text-red-600 text-sm">
                  {state.errors.shippingInformation}
                </p>
              )}
              {errors.shippingInformation?.message && (
                <p className="text-red-600 text-sm">
                  {errors.shippingInformation.message as string}
                </p>
              )} */}
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
                        // {...register("availabilityStatus", {
                        //   required: "Availability status is required",
                        //   validate: (value) =>
                        //     allAvailabilityStatus.includes(value) ||
                        //     "Please choose an availability status",
                        // })}
                        defaultChecked={
                          product.availabilityStatus === availabilityStatus
                        }
                        id={id}
                        type="radio"
                        name="availabilityStatus"
                        value={availabilityStatus}
                        className="accent-stone-900"
                      />
                      {availabilityStatus}
                    </label>
                  );
                })}
              </div>
              {/* {state?.errors?.availabilityStatus && (
                <p className="text-red-600 text-sm">
                  {state.errors.availabilityStatus.join(", ")}
                </p>
              )}
              {errors.availabilityStatus?.message && (
                <p className="text-red-600 text-sm">
                  {errors.availabilityStatus.message as string}
                </p>
              )} */}
            </div>

            <div className="flex flex-col">
              <label htmlFor="minimumOrderQuantity" className="font-bold mb-1">
                Minimum Order Quantity
              </label>
              <input
                // {...register("minimumOrderQuantity", {
                //   required: "Minimum order quantity is required",
                //   min: {
                //     value: 1,
                //     message: "Minimum order must be at least 1",
                //   },
                //   max: {
                //     value: 9999999999,
                //     message: "Minimum order cannot exceed 9,999,999,999",
                //   },
                //   valueAsNumber: true,
                // })}
                defaultValue={product.minimumOrderQuantity}
                type="number"
                id="minimumOrderQuantity"
                name="minimumOrderQuantity"
                className="dark:bg-stone-200 dark:text-stone-900 p-2 rounded"
              />
              {/* {state?.errors?.minimumOrderQuantity && (
                <p className="text-red-600 text-sm">
                  {state.errors.minimumOrderQuantity}
                </p>
              )}
              {errors.minimumOrderQuantity?.message && (
                <p className="text-red-600 text-sm">
                  {errors.minimumOrderQuantity.message as string}
                </p>
              )} */}
            </div>

            <div className="flex flex-col col-span-2">
              <label htmlFor="returnPolicy" className="font-bold mb-1">
                Return Policy
              </label>
              <div className="flex flex-wrap gap-2">
                {allReturnPolicies.map((returnPolicy) => {
                  const id = `returnPolicy-${returnPolicy}`;

                  return (
                    <label
                      key={returnPolicy}
                      htmlFor={id}
                      className="flex items-center gap-1"
                    >
                      <input
                        // {...register("returnPolicy", {
                        //   required: "Return policy is required",
                        //   validate: (value) =>
                        //     allReturnPolicies.includes(value) ||
                        //     "Please select a return policy",
                        // })}
                        defaultChecked={product.returnPolicy === returnPolicy}
                        id={id}
                        type="radio"
                        name="returnPolicy"
                        value={returnPolicy}
                        className="accent-stone-900"
                      />
                      {returnPolicy}
                    </label>
                  );
                })}
              </div>
              {/* {state?.errors?.returnPolicy && (
                <p className="text-red-600 text-sm">
                  {state.errors.returnPolicy}
                </p>
              )}
              {errors.returnPolicy?.message && (
                <p className="text-red-600 text-sm">
                  {errors.returnPolicy.message as string}
                </p>
              )} */}
            </div>

            <div className="flex flex-col col-span-2">
              <label htmlFor="images" className="font-bold mb-1">
                Images
              </label>
              <input
                // {...register("images", {
                //   required: "At least one image URL is required",
                //   minLength: {
                //     value: 1,
                //     message: "Image URL must be at least 1 character",
                //   },
                //   maxLength: {
                //     value: 500,
                //     message: "Image URL must not exceed 500 characters",
                //   },
                // })}
                defaultValue={product.images}
                type="text"
                id="images"
                name="images"
                className="dark:bg-stone-200 dark:text-stone-900 p-2 rounded"
                placeholder="Simply separate each link with a comma to add more than one."
              />
              {/* {state?.errors?.images && (
                <p className="text-red-600 text-sm">{state.errors.images}</p>
              )}
              {errors.images?.message && (
                <p className="text-red-600 text-sm">
                  {errors.images.message as string}
                </p>
              )} */}
            </div>

            <div className="flex flex-col col-span-2">
              <label htmlFor="thumbnail" className="font-bold mb-1">
                Thumbnail
              </label>
              <input
                // {...register("thumbnail", {
                //   required: "Thumbnail URL is required",
                //   minLength: {
                //     value: 1,
                //     message: "Thumbnail URL must be at least 1 character",
                //   },
                //   maxLength: {
                //     value: 500,
                //     message: "Thumbnail URL must not exceed 500 characters",
                //   },
                // })}
                defaultValue={product.thumbnail}
                type="text"
                id="thumbnail"
                name="thumbnail"
                className="dark:bg-stone-200 dark:text-stone-900 p-2 rounded"
                placeholder="Simply separate each link with a comma to add more than one."
              />
              {/* {state?.errors?.thumbnail && (
                <p className="text-red-600 text-sm">{state.errors.thumbnail}</p>
              )}
              {errors.thumbnail?.message && (
                <p className="text-red-600 text-sm">
                  {errors.thumbnail.message as string}
                </p>
              )} */}
            </div>

            <Button
              type="submit"
              className="my-8 col-span-2"
              label="Update Product"
            />
          </form>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

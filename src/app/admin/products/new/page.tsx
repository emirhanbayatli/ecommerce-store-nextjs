"use client";
import {
  allCategories,
  allTags,
  Product,
  allAvailabilityStatus,
  allReturnPolicies,
} from "../../../../types/types";
import { useActionState } from "react";
import { addNewProductAction } from "../../../actions/admin/products";
import Form from "next/form";
import { Button } from "@/app/components/Button";

const initialState: NewProductFormState = {
  success: false,
  inputs: {},
  errors: {},
};

export interface NewProductFormState {
  success: boolean;
  message?: string;
  inputs?: Partial<Product>;
  errors?: {
    [K in keyof Product]?: string[];
  };
}

export default function Admin() {
  const [state, formAction, isPending] = useActionState<
    NewProductFormState,
    FormData
  >(addNewProductAction, initialState);

  if (isPending) return <p>Loading...</p>;

  console.log(state);

  return (
    <main className="max-w-4xl mx-auto">
      <h1 className="my-12 font-bold text-2xl text-center">
        Add a New Product
      </h1>
      <Form
        action={formAction}
        className="grid grid-cols-2 gap-6 bg-white p-8 rounded-xl shadow-md"
      >
        <div className="flex flex-col col-span-2">
          <label htmlFor="title" className="font-bold mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="bg-stone-200 text-stone-900 p-2 rounded"
            defaultValue={state?.inputs?.title ?? ""}
          />
          {state?.errors?.title && (
            <p className="text-red-600 text-sm">{state.errors.title}</p>
          )}
        </div>

        <div className="flex flex-col col-span-2">
          <label htmlFor="description" className="font-bold mb-1">
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            className="dark:bg-stone-200 dark:text-stone-900 p-2 rounded"
          />
          {state?.errors?.description && (
            <p className="text-red-600 text-sm">{state.errors.description}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="category" className="font-bold mb-1">
            Category
          </label>
          <select
            id="category"
            name="category"
            className="dark:bg-stone-200 dark:text-stone-900 p-2 rounded"
          >
            <option value="">Select Category</option>
            {allCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {state?.errors?.category && (
            <p className="text-red-600 text-sm">{state.errors.category}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="price" className="font-bold mb-1">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            className="dark:bg-stone-200 dark:text-stone-900 p-2 rounded"
          />
          {state?.errors?.price && (
            <p className="text-red-600 text-sm">{state.errors.price}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="discountPercentage" className="font-bold mb-1">
            Discount Percentage
          </label>
          <input
            type="number"
            id="discountPercentage"
            name="discountPercentage"
            className="dark:bg-stone-200 dark:text-stone-900 p-2 rounded"
          />
          {state?.errors?.discountPercentage && (
            <p className="text-red-600 text-sm">
              {state.errors.discountPercentage}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="stock" className="font-bold mb-1">
            Stock
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            className="dark:bg-stone-200 dark:text-stone-900 p-2 rounded"
          />
          {state?.errors?.stock && (
            <p className="text-red-600 text-sm">{state.errors.stock}</p>
          )}
        </div>

        <div className="flex flex-col col-span-2">
          <label htmlFor="tags" className="font-bold mb-1">
            Tags
          </label>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <label key={tag} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  name="tags"
                  value={tag}
                  className="accent-stone-900"
                />
                {tag}
              </label>
            ))}
          </div>
          {state?.errors?.tags && (
            <p className="text-red-600 text-sm">{state.errors.tags}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="brand" className="font-bold mb-1">
            Brand
          </label>
          <input
            type="text"
            id="brand"
            name="brand"
            className="dark:bg-stone-200 dark:text-stone-900 p-2 rounded"
          />
          {state?.errors?.brand && (
            <p className="text-red-600 text-sm">{state.errors.brand}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="sku" className="font-bold mb-1">
            SKU
          </label>
          <input
            type="text"
            id="sku"
            name="sku"
            className="dark:bg-stone-200 dark:text-stone-900 p-2 rounded"
          />
          {state?.errors?.sku && (
            <p className="text-red-600 text-sm">{state.errors.sku}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="weight" className="font-bold mb-1">
            Weight
          </label>
          <input
            type="number"
            id="weight"
            name="weight"
            className="dark:bg-stone-200 dark:text-stone-900 p-2 rounded"
          />
          {state?.errors?.weight && (
            <p className="text-red-600 text-sm">{state.errors.weight}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="dimensions" className="font-bold mb-1">
            Dimensions
          </label>
          <div className="flex gap-5 justify-center">
            <input
              type="number"
              id="width"
              name="dimensions_width"
              placeholder="Width"
              className="dark:bg-stone-200 dark:text-stone-900 max-w-30 p-2 rounded"
            />

            <input
              type="number"
              id="height"
              name="dimensions_height"
              placeholder="Height"
              className="dark:bg-stone-200 dark:text-stone-900 max-w-30 p-2 rounded"
            />

            <input
              type="number"
              id="depth"
              name="dimensions_depth"
              placeholder="Depth"
              className="dark:bg-stone-200 dark:text-stone-900 max-w-30 p-2 rounded"
            />
          </div>{" "}
          {state?.errors?.dimensions && (
            <p className="text-red-600 text-sm">{state.errors.dimensions}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="warrantyInformation" className="font-bold mb-1">
            Warranty Information
          </label>
          <input
            type="text"
            id="warrantyInformation"
            name="warrantyInformation"
            className="dark:bg-stone-200 dark:text-stone-900 p-2 rounded"
          />
          {state?.errors?.warrantyInformation && (
            <p className="text-red-600 text-sm">
              {state.errors.warrantyInformation}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="shippingInformation" className="font-bold mb-1">
            Shipping Information
          </label>
          <input
            type="text"
            id="shippingInformation"
            name="shippingInformation"
            className="dark:bg-stone-200 dark:text-stone-900 p-2 rounded"
          />
          {state?.errors?.shippingInformation && (
            <p className="text-red-600 text-sm">
              {state.errors.shippingInformation}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="availabilityStatus" className="font-bold mb-1">
            Availability Status
          </label>
          <div className="flex flex-wrap gap-2">
            {allAvailabilityStatus.map((availabilityStatus) => (
              <label
                key={availabilityStatus}
                className="flex items-center gap-1"
              >
                <input
                  type="radio"
                  name="availabilityStatus"
                  value={availabilityStatus}
                  className="accent-stone-900"
                />
                {availabilityStatus}
              </label>
            ))}
          </div>
          {state?.errors?.availabilityStatus && (
            <p className="text-red-600 text-sm">
              {state.errors.availabilityStatus}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="minimumOrderQuantity" className="font-bold mb-1">
            Minimum Order Quantity
          </label>
          <input
            type="number"
            id="minimumOrderQuantity"
            name="minimumOrderQuantity"
            className="dark:bg-stone-200 dark:text-stone-900 p-2 rounded"
          />
          {state?.errors?.minimumOrderQuantity && (
            <p className="text-red-600 text-sm">
              {state.errors.minimumOrderQuantity}
            </p>
          )}
        </div>

        <div className="flex flex-col col-span-2">
          <label htmlFor="returnPolicy" className="font-bold mb-1">
            Return Policy
          </label>
          <div className="flex flex-wrap gap-2">
            {allReturnPolicies.map((returnPolicy) => (
              <label key={returnPolicy} className="flex items-center gap-1">
                <input
                  type="radio"
                  name="returnPolicy"
                  value={returnPolicy}
                  className="accent-stone-900"
                />
                {returnPolicy}
              </label>
            ))}
          </div>
          {state?.errors?.returnPolicy && (
            <p className="text-red-600 text-sm">{state.errors.returnPolicy}</p>
          )}
        </div>

        <div className="flex flex-col col-span-2">
          <label htmlFor="images" className="font-bold mb-1">
            Images
          </label>
          <input
            type="text"
            id="images"
            name="images"
            className="dark:bg-stone-200 dark:text-stone-900 p-2 rounded"
            placeholder="Simply separate each link with a comma to add more than one."
          />
          {state?.errors?.images && (
            <p className="text-red-600 text-sm">{state.errors.images}</p>
          )}
        </div>

        <div className="flex flex-col col-span-2">
          <label htmlFor="thumbnail" className="font-bold mb-1">
            Thumbnail
          </label>
          <input
            type="text"
            id="thumbnail"
            name="thumbnail"
            className="dark:bg-stone-200 dark:text-stone-900 p-2 rounded"
            placeholder="Simply separate each link with a comma to add more than one."
          />
          {state?.errors?.thumbnail && (
            <p className="text-red-600 text-sm">{state.errors.thumbnail}</p>
          )}
        </div>

        <Button
          type="submit"
          className="my-8 col-span-2"
          label="Create Product"
        />
      </Form>
    </main>
  );
}

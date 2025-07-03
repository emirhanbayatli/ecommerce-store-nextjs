import { NewProductFormState } from "@/app/admin/products/new/page";
import {
  Category,
  Tags,
  Product,
  AvailabilityStatus,
  ReturnPolicy,
} from "../../../types/types";
import { z } from "zod";
import { setDoc, doc } from "firebase/firestore";
import { db, collections } from "../../../utils/firbase";
const productSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters long")
    .max(100, "Title must not exceed 100 characters"),
  description: z
    .string()
    .min(50, "Description must be at least 50 characters long")
    .max(500, "Description must not exceed 500 characters"),
  category: z.nativeEnum(Category, {
    errorMap: () => ({ message: "Please select a valid category" }),
  }),
  price: z.number().min(0, "Price must be zero or a positive number"),
  discountPercentage: z
    .number()
    .min(0, "Discount must be at least 0%")
    .max(100, "Discount cannot exceed 100%"),
  stock: z.number().min(0, "Stock must be zero or a positive number"),
  tags: z.nativeEnum(Tags, {
    errorMap: () => ({ message: "Please select a valid tag" }),
  }),
  brand: z.string().min(2, "Brand must be at least 2 characters"),
  sku: z.string().min(1, "SKU is required"),
  weight: z.number().min(0, "Weight must be zero or a positive number"),
  dimensions: z.object({
    width: z.number().min(0, "Width must be zero or positive"),
    height: z.number().min(0, "Height must be zero or positive"),
    depth: z.number().min(0, "Depth must be zero or positive"),
  }),
  warrantyInformation: z.string().min(1, "Warranty information is required"),
  shippingInformation: z.string().min(1, "Shipping information is required"),
  availabilityStatus: z.nativeEnum(AvailabilityStatus, {
    errorMap: () => ({ message: "Please choose an availability status" }),
  }),
  minimumOrderQuantity: z.number().min(1, "Minimum order must be at least 1"),
  returnPolicy: z.nativeEnum(ReturnPolicy, {
    errorMap: () => ({ message: "Please select a return policy" }),
  }),
  images: z.string().min(1, "At least one image URL is required"),
  thumbnail: z.string().min(1, "Thumbnail is required"),
});

export async function addNewProductAction(
  currentState: NewProductFormState,
  formData: FormData,
): Promise<NewProductFormState> {
  const rawData = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    category: formData.get("category") as string,
  };

  const result = productSchema.safeParse(rawData);

  if (!result.success) {
    console.error("Failed parsing form data when adding a new product", result);
    return {
      success: false,
      message: "Please correct the form input",
      inputs: { ...rawData },
      errors: result.error.flatten().fieldErrors,
    };
  }

  const id = Date.now().toString();
  const dateNow = Date.now();

  try {
    // TODO: query db for a product with the title that is entered in the form. If the title is already present in the DB, return an error and tell the user that product already exists

    await setDoc(doc(db, collections.products, id), {
      title: result.data.title,
      description: result.data.description,
      category: result.data.category,
      meta: {
        createdAt: dateNow,
        updatedAt: dateNow,
      },
    });

    return {
      success: true,
      message: "The product is created successfully",
      data: { id, ...result.data },
    };
  } catch (err) {
    console.error("Error adding a new product to Firebase", err);
    return {
      success: false,
      message: "Failed creating a new product in the database",
      inputs: { ...rawData },
    };
  }
}

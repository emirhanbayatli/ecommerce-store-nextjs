import { NewProductFormState } from "@/app/admin/products/new/page";
import { EditProductFormState } from "../../admin/products/[productId]/edit/page";
import {
  Category,
  Tags,
  Product,
  AvailabilityStatus,
  ReturnPolicy,
} from "../../../types/types";
import { z } from "zod";
import { put } from "@vercel/blob";

import { db, collections } from "../../../utils/firebase";
import {
  getDocs,
  collection,
  setDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

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
  price: z
    .number()
    .min(0, "Price must be zero or a positive number")
    .max(9999999999, "Price cannot exceed 9,999,999,999"),
  discountPercentage: z
    .number()
    .min(0, "Discount must be at least 0%")
    .max(100, "Discount cannot exceed 100%"),
  stock: z
    .number()
    .min(0, "Stock must be zero or a positive number")
    .max(9999999999, "Stock cannot exceed 9,999,999,999"),
  tags: z.array(z.nativeEnum(Tags), {
    errorMap: () => ({ message: "Please select valid tags" }),
  }),
  brand: z
    .string()
    .min(2, "Brand must be at least 2 characters")
    .max(50, "Brand must not exceed 50 characters"),
  sku: z
    .string()
    .min(1, "SKU is required")
    .max(100, "SKU must not exceed 100 characters"),
  weight: z
    .number()
    .min(0, "Weight must be zero or a positive number")
    .max(9999999999, "Weight cannot exceed 9,999,999,999 grams"),
  dimensions: z.object({
    width: z
      .number()
      .min(0, "Width must be zero or positive")
      .max(999999, "Width cannot exceed 999999 cm"),
    height: z
      .number()
      .min(0, "Height must be zero or positive")
      .max(999999, "Height cannot exceed 999999 cm"),
    depth: z
      .number()
      .min(0, "Depth must be zero or positive")
      .max(999999, "Depth cannot exceed 999999 cm"),
  }),
  warrantyInformation: z
    .string()
    .min(1, "Warranty information is required")
    .max(500, "Warranty information must not exceed 500 characters"),
  shippingInformation: z
    .string()
    .min(1, "Shipping information is required")
    .max(500, "Shipping information must not exceed 500 characters"),
  availabilityStatus: z.nativeEnum(AvailabilityStatus, {
    errorMap: () => ({ message: "Please choose an availability status" }),
  }),
  minimumOrderQuantity: z
    .number()
    .min(1, "Minimum order must be at least 1")
    .max(9999999999, "Minimum order cannot exceed 9,999,999,999"),
  returnPolicy: z.nativeEnum(ReturnPolicy, {
    errorMap: () => ({ message: "Please select a return policy" }),
  }),
  // images: z
  //   .string()
  //   .min(1, "At least one image URL is required")
  //   .max(500, "Image URL must not exceed 1000 characters"),
  // thumbnail: z
  //   .string()
  //   .min(1, "Thumbnail URL is required")
  //   .max(500, "Thumbnail URL must not exceed 1000 characters"),
});

export async function addNewProductAction(
  currentState: NewProductFormState,
  formData: FormData,
): Promise<NewProductFormState> {
  const rawData = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    category: formData.get("category") as Category,
    price: Number(formData.get("price")),
    discountPercentage: Number(formData.get("discountPercentage")),
    stock: Number(formData.get("stock")),
    tags: (formData.getAll("tags") as string[]).map((tag) => tag as Tags),
    brand: formData.get("brand") as string,
    sku: formData.get("sku") as string,
    weight: Number(formData.get("weight")),
    dimensions: {
      width: Number(formData.get("dimensions_width")),
      height: Number(formData.get("dimensions_height")),
      depth: Number(formData.get("dimensions_depth")),
    },
    warrantyInformation: formData.get("warrantyInformation") as string,
    shippingInformation: formData.get("shippingInformation") as string,
    availabilityStatus: formData.get(
      "availabilityStatus",
    ) as AvailabilityStatus,
    minimumOrderQuantity: Number(formData.get("minimumOrderQuantity")),
    returnPolicy: formData.get("returnPolicy") as ReturnPolicy,
    // images: formData.get("images") as string,
    // thumbnail: formData.get("thumbnail") as string,
  };

  console.table(rawData);

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

  let imageUrl = "";
  const MAX_ALLOWED_IMAGE_SIZE = 4.5 * 1024 * 1024;
  const image = formData.get("image") as File | null;
  // const thumbnail = formData.get("thumbnail") as File | null;
  const allowedImageTypes = [".jpeg", ".jpg", ".webp"];

  if (image && image.size > 0) {
    if (
      !allowedImageTypes.map((allowedType) =>
        image.name.toLowerCase().endsWith(allowedType),
      )
    ) {
      return {
        success: false,
        message: "Please update product image.",
        inputs: { ...rawData },
        errors: {
          images: ["Allowed image formats: .jpeg, .jpg, .webp."],
        },
      };
    }
    if (image.size > MAX_ALLOWED_IMAGE_SIZE) {
      return {
        success: false,
        message: "Please update product image, maximum allowed size 4.5 MB",
        inputs: { ...rawData },
        errors: {
          images: ["Maximum allowed size 4.5 MB"],
        },
      };
    }

    const imageName = id + "." + image.type.slice(6);

    const blob = await put(imageName, image, {
      access: "public",
      token: process.env.NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN,
    });

    console.log(blob, "blob");

    imageUrl = blob.url;
    console.log(imageUrl, "imageUrl");
  }

  try {
    // TODO: query db for a product with the title that is entered in the form. If the title is already present in the DB, return an error and tell the user that product already exists

    await setDoc(doc(db, collections.products, id), {
      title: result.data.title,
      description: result.data.description,
      category: result.data.category,
      price: result.data.price,
      discountPercentage: result.data.discountPercentage,
      stock: result.data.stock,
      tags: result.data.tags,
      brand: result.data.brand,
      sku: result.data.sku,
      weight: result.data.weight,
      dimensions: result.data.dimensions,
      warrantyInformation: result.data.warrantyInformation,
      shippingInformation: result.data.shippingInformation,
      availabilityStatus: result.data.availabilityStatus,
      minimumOrderQuantity: result.data.minimumOrderQuantity,
      returnPolicy: result.data.returnPolicy,
      images: [imageUrl],
      thumbnail: [imageUrl],
      meta: {
        createdAt: dateNow,
        updatedAt: dateNow,
      },
    });

    return {
      success: true,
      message: "The product is created successfully",
      data: {
        id: Number(id),
        ...result.data,
        rating: 0,
        images: imageUrl,
        thumbnail: imageUrl,
        meta: {
          createdAt: String(dateNow),
          updatedAt: String(dateNow),
          barcode: "",
          qrCode: "",
        },
      },
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

export async function getProducts(): Promise<Product[]> {
  const querySnapshot = await getDocs(collection(db, "products"));
  const products = querySnapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      id: Number(doc.id),
      title: data.title,
      description: data.description,
      category: data.category,
      price: data.price,
      discountPercentage: data.discountPercentage,
      stock: data.stock,
      tags: data.tags,
      brand: data.brand,
      sku: data.sku,
      weight: data.weight,
      dimensions: data.dimensions,
      warrantyInformation: data.warrantyInformation,
      shippingInformation: data.shippingInformation,
      availabilityStatus: data.availabilityStatus,
      minimumOrderQuantity: data.minimumOrderQuantity,
      returnPolicy: data.returnPolicy,
      images: data.images,
      thumbnail: data.thumbnail,
      meta: {
        createdAt: data.meta?.createdAt ?? 0,
        updatedAt: data.meta?.updatedAt ?? 0,
      },
    };
  });
  return products as Product[];
}

export async function editProduct(
  currentState: EditProductFormState | null,
  formData: FormData,
) {
  const imageFile = formData.get("image") as File | null;
  let imageUrl = currentState?.inputs?.images || "";
  const rawData = {
    productId: formData.get("productId") as string,
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    category: formData.get("category") as Category,
    price: Number(formData.get("price")),
    discountPercentage: Number(formData.get("discountPercentage")),
    stock: Number(formData.get("stock")),
    tags: (formData.getAll("tags") as string[]).map((tag) => tag as Tags),
    brand: formData.get("brand") as string,
    sku: formData.get("sku") as string,
    weight: Number(formData.get("weight")),
    dimensions: {
      width: Number(formData.get("dimensions_width")),
      height: Number(formData.get("dimensions_height")),
      depth: Number(formData.get("dimensions_depth")),
    },
    warrantyInformation: formData.get("warrantyInformation") as string,
    shippingInformation: formData.get("shippingInformation") as string,
    availabilityStatus: formData.get(
      "availabilityStatus",
    ) as AvailabilityStatus,
    minimumOrderQuantity: Number(formData.get("minimumOrderQuantity")),
    returnPolicy: formData.get("returnPolicy") as ReturnPolicy,
    images: imageUrl,
    thumbnail: imageUrl,
  };

  const result = productSchema.safeParse(rawData);

  if (!result.success) {
    console.log(result);
    return {
      success: false,
      message: "Error updating a new product to Firebase",
      inputs: { ...rawData },
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    const productId = formData.get("productId") as string;
    const productRef = doc(db, "products", productId);
    console.log(result);

    await updateDoc(productRef, {
      title: result.data.title,
      description: result.data.description,
      category: result.data.category,
      price: result.data.price,
      discountPercentage: result.data.discountPercentage,
      stock: result.data.stock,
      tags: result.data.tags,
      brand: result.data.brand,
      sku: result.data.sku,
      weight: result.data.weight,
      dimensions: result.data.dimensions,
      warrantyInformation: result.data.warrantyInformation,
      shippingInformation: result.data.shippingInformation,
      availabilityStatus: result.data.availabilityStatus,
      minimumOrderQuantity: result.data.minimumOrderQuantity,
      returnPolicy: result.data.returnPolicy,
      // images: imagesUrl,
      // thumbnail: imagesUrl,
      meta: {
        updatedAt: new Date(),
      },
    });
    return {
      success: true,
      message: "The product is updating successfully",
    };
  } catch (error) {
    console.error("Error updating a new product to Firebase", error);
  }
  return {
    success: false,
    message: "Failed updating a product in the database",
    inputs: { ...rawData },
  };
}

export async function deleteProduct(id: string) {
  const productRef = doc(db, "products", id);
  try {
    await deleteDoc(productRef);
    console.log(`Product with ID ${id} was deleted successfully.`);
  } catch (error) {
    console.error("Failed to delete product:", id, error);
  }
}

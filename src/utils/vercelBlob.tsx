import { put } from "@vercel/blob";
interface VercelBlobProps {
  formData: FormData;
  rawData: Record<string, any>;
  id: number;
}

export async function vercelBlob({ formData, rawData, id }: VercelBlobProps) {
  let imageUrl = "";
  let thumbnailUrl = "";
  const MAX_ALLOWED_IMAGE_SIZE = 4.5 * 1024 * 1024;
  const images = formData.get("images") as File | null;
  const thumbnail = formData.get("thumbnail") as File | null;
  const allowedImageTypes = [".jpeg", ".jpg", ".webp"];

  if (thumbnail && thumbnail.size > 0 && images && images.size > 0) {
    if (
      !allowedImageTypes.map((allowedType) =>
        images.name.toLowerCase().endsWith(allowedType),
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
    if (
      !allowedImageTypes.map((allowedType) =>
        thumbnail.name.toLowerCase().endsWith(allowedType),
      )
    ) {
      return {
        success: false,
        message: "Please update product thumbnail.",
        inputs: { ...rawData },
        errors: {
          images: ["Allowed thumbnail formats: .jpeg, .jpg, .webp."],
        },
      };
    }
    if (
      images.size > MAX_ALLOWED_IMAGE_SIZE ||
      thumbnail.size > MAX_ALLOWED_IMAGE_SIZE
    ) {
      return {
        success: false,
        message:
          "Please update product image or thumbnail, maximum allowed size 4.5 MB",
        inputs: { ...rawData },
        errors: {
          images: ["Maximum allowed size 4.5 MB"],
        },
      };
    }
    const imageType = images.type.slice(6);
    const thumbnailType = thumbnail.type.slice(6);
    const imageName = id + "." + imageType;
    const thumbnailName = id + "." + thumbnailType;

    const imageBlob = await put(imageName, images, {
      access: "public",
      token: process.env.NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN,
    });

    const thumbnailBlob = await put(thumbnailName, thumbnail, {
      access: "public",
      token: process.env.NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN,
    });
    imageUrl = imageBlob.url;
    thumbnailUrl = thumbnailBlob.url;
  }
  return {
    success: true,
    message: "Product images and thumbnail uploaded successfully.",
    inputs: { ...rawData },
    data: {
      images: imageUrl,
      thumbnail: thumbnailUrl,
    },
  };
}

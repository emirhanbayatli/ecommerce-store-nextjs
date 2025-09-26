import { put, del } from "@vercel/blob";
interface VercelBlobProps {
  formData: FormData;
  rawData: Record<string, unknown>;
  id: string;
}

export async function vercelBlobPutAction({
  formData,
  rawData,
  id,
}: VercelBlobProps) {
  const images = formData.getAll("images") as File[];
  const thumbnail = formData.get("thumbnail") as File | null;
  const imageUrls: string[] = [];
  let thumbnailUrl = "";
  const MAX_ALLOWED_IMAGE_SIZE = 4.5 * 1024 * 1024;
  const allowedImageTypes = [".jpeg", ".jpg", ".webp"];

  for (const image of images) {
    if (image && image.size > 0) {
      if (
        !allowedImageTypes.some((allowedType) =>
          image.name.toLowerCase().endsWith(allowedType),
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
      if (image.size > MAX_ALLOWED_IMAGE_SIZE) {
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
      const getExtension = (file: File) => {
        const match = file.name.match(/\.(jpeg|jpg|webp)$/i);
        return match ? match[1] : "jpg";
      };

      const imageName = `${id}-full-${Date.now()}.${getExtension(image)}`;
      const imagePutBlob = await put(imageName, image, {
        access: "public",
        token: process.env.NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN,
      });
      imageUrls.push(imagePutBlob.url);
    }
  }

  if (thumbnail && thumbnail.size > 0) {
    const getExtension = (file: File) => {
      const match = file.name.match(/\.(jpeg|jpg|webp)$/i);
      return match ? match[1] : "jpg";
    };
    const thumbnailName = thumbnail
      ? `${id}-thumb.${getExtension(thumbnail)}`
      : "";
    const thumbnailPutBlob = await put(thumbnailName, thumbnail, {
      access: "public",
      token: process.env.NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN,
    });
    thumbnailUrl = thumbnailPutBlob.url;
  }

  return {
    success: true,
    message: "Product images and thumbnail uploaded successfully.",
    inputs: { ...rawData },
    data: {
      images: imageUrls,
      thumbnail: thumbnailUrl,
    },
  };
}

export async function vercelBlobDeleteAction(url: string) {
  try {
    await del(url, {
      token: process.env.NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN,
    });
    console.log("Image deleted successfully.");
  } catch (error) {
    console.error("Error deleting image:", error);
  }
}

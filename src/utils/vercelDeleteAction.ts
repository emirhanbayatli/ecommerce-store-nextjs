"use server";
import { del } from "@vercel/blob";
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

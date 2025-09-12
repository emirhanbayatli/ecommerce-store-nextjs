"use server";

import { stripe } from "@/utils/stripe";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function checkout(formData: FormData) {
  const productsStr = formData.get("cartProducts") as string;
  const userId = formData.get("userId") as string;

  const products = JSON.parse(productsStr) as {
    id: string;
    stripePriceId: string;
    quantity: number;
  }[];

  const origin = (await headers()).get("origin");

  try {
    const line_items = products.map((p) => ({
      price: p.stripePriceId,
      quantity: p.quantity,
    }));
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?canceled=true`,
      metadata: {
        userId: userId,
        products: JSON.stringify(products.map((p) => p.id)),
      },
    });

    if (session.url) {
      redirect(session.url);
    } else {
      throw new Error("Session URL is null");
    }
  } catch (err) {
    console.error("Error creating checkout session", err);
    throw err;
  }
}

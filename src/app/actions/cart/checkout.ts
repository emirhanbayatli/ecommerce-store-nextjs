"use server";

import { stripe } from "@/utils/stripe";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function checkout(formData: FormData) {
  const origin = (await headers()).get("origin");
  const items: { price: string; quantity: number }[] = [];
  for (const [key, value] of formData.entries()) {
    if (key.includes("price")) {
      const index = Number(key.match(/\d+/)![0]); // items[0][price] -> 0
      if (!items[index]) items[index] = { price: "", quantity: 0 };
      items[index].price = value.toString();
    }

    if (key.includes("quantity")) {
      const index = Number(key.match(/\d+/)![0]); // items[0][quantity] -> 0
      if (!items[index]) items[index] = { price: "", quantity: 0 };
      items[index].quantity = Number(value);
    }
  }

  if (items.length === 0) {
    throw new Error("No items to checkout");
  }

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: items,
      mode: "payment",
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?canceled=true`,
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

"use server";

import { discountCalculation } from "@/utils/uiUtils";

interface StripeProductInput {
  data: {
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
  };
}
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function addProductStripe(result: StripeProductInput) {
  const product = await stripe.products.create({
    name: result.data.title,
    description: result.data.description,
  });
  const price = await stripe.prices.create({
    currency: "usd",
    unit_amount:
      discountCalculation(result.data.price, result.data.discountPercentage) *
      100,
    product: product.id,
  });
  return { stripeProductId: product.id, stripePriceId: price.id };
}

export async function updateProductStripe(
  stripeProductId: string,
  stripePriceId: string,
  result: StripeProductInput,
) {
  try {
    const updatedProduct = await stripe.products.update(stripeProductId, {
      name: result.data.title,
      description: result.data.description,
    });

    await stripe.prices.update(stripePriceId, {
      active: false,
    });

    const newPrice = await stripe.prices.create({
      currency: "usd",
      unit_amount:
        discountCalculation(result.data.price, result.data.discountPercentage) *
        100,
      product: updatedProduct.id,
    });

    return {
      success: true,
      newPriceId: newPrice.id,
      updatedProductId: updatedProduct.id,
    };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

export async function deleteProductStripe(
  stripeProductId: string,
  stripePriceId: string,
) {
  try {
    await stripe.prices.update(stripePriceId, { active: false });
    const archivedProduct = await stripe.products.update(stripeProductId, {
      active: false,
    });
    return archivedProduct;
  } catch (error) {
    console.error(error);
  }
}

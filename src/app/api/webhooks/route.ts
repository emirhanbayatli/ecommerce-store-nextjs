import updateStockAction, {
  sendConfirmationEmail,
} from "@/app/actions/admin/postOrderAction";
import { stripe } from "@/utils/stripe";
import { NextRequest } from "next/server";
import Stripe from "stripe";

export const POST = async (req: NextRequest) => {
  const body = await req.text();

  const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

  if (!STRIPE_WEBHOOK_SECRET) {
    console.warn("STRIPE_WEBHOOK_SECRET is not set");
    return new Response("Internal Server error", { status: 500 });
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    console.warn("Stripe signature is missing");
    return new Response("Bad Request", { status: 400 });
  }

  let event;
  try {
    event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    console.error("Error constructing Stripe event:", err);
    return new Response("Bad Request", { status: 400 });
  }

  console.log("Received Stripe event:", event.type);

  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object as Stripe.Checkout.Session;
      const lineItems = await stripe.checkout.sessions.listLineItems(
        session.id,
      );

      for (const item of lineItems.data) {
        await updateStockAction(item.price!.id, item.quantity!);
      }

      try {
        if (!session.customer_details?.email) {
          throw new Error("Customer email is missing");
        }

        const totalAmount = (Number(session.amount_total) / 100).toFixed(2);

        const htmlTemplate = `
<div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">

    <!-- HEADER -->
    <div style="background-color: #007BFF; color: white; padding: 15px; border-radius: 8px 8px 0 0; text-align: center;">
      <h2 style="margin: 0;">Your Order Has Been Confirmed!</h2>
    </div>

    <!-- BODY -->
    <div style="padding: 20px;">
      <p>Hello <strong>${
        session.customer_details?.name ?? "Valued Customer"
      }</strong>,</p>
      <p>Thank you for your purchase! Here are the details of your order:</p>

      <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
        <thead>
          <tr>
            <th style="text-align: left; border-bottom: 1px solid #ddd; padding: 8px;">Product</th>
            <th style="text-align: right; border-bottom: 1px solid #ddd; padding: 8px;">Quantity</th>
         
          </tr>
        </thead>
        <tbody>
          ${lineItems.data
            .map(
              (item) => `
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.description}</td>
              <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">${item.quantity}</td>
            </tr>
          `,
            )
            .join("")}
        </tbody>
      </table>

     <p style="margin-top: 20px; font-size: 16px;"><strong>Total: $${totalAmount}</strong></p>

      <p>If you have any questions, feel free to reply to this email.</p>
      <p>Best regards,<br>E-Commerce Team</p>
    </div>

    <!-- FOOTER -->
    <div style="text-align:center; padding: 15px; font-size: 12px; color: #888;">
      © ${new Date().getFullYear()} E-Commerce. All rights reserved.
    </div>
  </div>
</div>`;

        await sendConfirmationEmail(
          session.customer_details.email,
          "Order Confirmation - Thank you for your purchase!",
          htmlTemplate,
        );
      } catch (err) {
        console.warn("Error sending email:", err);
      }

      break;
    case "checkout.session.expired":
      const expiredSession = event.data.object;
      console.log("Checkout session completed:", expiredSession);
      // Handle the checkout session expired event
      break;
    default:
      console.warn(`Unhandled event type: ${event.type}`);
      return new Response("Event type not handled", { status: 400 });
  }

  return new Response("Event received", { status: 200 });
};

export const GET = () => {
  return new Response("Received webhook test request", { status: 200 });
};

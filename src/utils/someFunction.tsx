import Stripe from "stripe";

export async function saveOrderToFirestore(session: Stripe.Checkout.Session) {
  console.log("Firestore’a sipariş kaydediliyor:", session.id);
}

export async function sendConfirmationEmail(session: Stripe.Checkout.Session) {
  console.log(" Kullanıcıya mail gönderiliyor:", session.customer_email);
}

export async function updateStock(session: Stripe.Checkout.Session) {
  console.log(" Stok güncelleniyor...");

  console.log(session, "session");
}

export async function saveOrderToFirestore(session: any) {
  console.log("Firestore’a sipariş kaydediliyor:", session.id);
}

export async function sendConfirmationEmail(session: any) {
  console.log(" Kullanıcıya mail gönderiliyor:", session.customer_email);
}

export async function updateStock(session: any) {
  console.log(" Stok güncelleniyor...");

  console.log(session, "session");
}

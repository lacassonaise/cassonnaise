import { Resend } from "resend";
import { generateOrderPdf80mm } from "./generateOrderPdf80mm";

export async function sendOrderEmailWithPdf(order: any, items: any[]) {
  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY missing");
    return;
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const pdfBuffer = await generateOrderPdf80mm(order, items);

  await resend.emails.send({
    from: "Commandes <onboarding@resend.dev>",
    to: process.env.RESTAURANT_EMAIL!,
    subject: `🧾 Nouvelle commande – ${
      order.delivery_type === "delivery" ? "Livraison" : "À emporter"
    }`,
    html: `
      <h2>Nouvelle commande reçue</h2>
      <p><strong>Mode :</strong> ${
        order.delivery_type === "delivery" ? "Livraison" : "À emporter"
      }</p>
      <p><strong>Téléphone :</strong> ${order.phone}</p>
      ${
        order.delivery_type === "delivery"
          ? `<p><strong>Adresse :</strong> ${order.delivery_address}</p>`
          : ""
      }
      <p>📎 Voir le PDF joint pour impression.</p>
    `,
    attachments: [
      {
        filename: `commande-${order.id}.pdf`,
        content: pdfBuffer,
      },
    ],
  });
}


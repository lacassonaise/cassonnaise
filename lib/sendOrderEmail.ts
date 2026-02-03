import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendOrderEmail(order: any, items: any[]) {
  const isDelivery = order.delivery_type === "delivery";

  const itemsHtml = items
    .map(
      (i) => `
        <tr>
          <td>${i.quantity}×</td>
          <td>${i.name_snapshot}</td>
          <td>${(i.price_cents / 100).toFixed(2)}€</td>
        </tr>`
    )
    .join("");

  await resend.emails.send({
    from: "Commandes <commandes@tonsite.fr>",
    to: process.env.RESTAURANT_EMAIL!,
    subject: `🧾 Nouvelle commande ${isDelivery ? "– Livraison" : "– À emporter"}`,
    html: `
      <h2>Nouvelle commande</h2>

      <p><strong>Mode :</strong> ${
        isDelivery ? "🚚 Livraison" : "🍴 À emporter"
      }</p>

      ${
        isDelivery
          ? `<p><strong>Adresse :</strong> ${order.delivery_address}</p>`
          : ""
      }

      <p><strong>Téléphone :</strong> ${order.phone}</p>
      <p><strong>Note :</strong> ${order.note || "—"}</p>

      <table>
        ${itemsHtml}
      </table>

      <p><strong>Total :</strong> ${(order.total_cents / 100).toFixed(2)}€</p>
    `,
  });
}

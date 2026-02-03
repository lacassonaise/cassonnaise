import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function notifyRestaurant(orderId: string) {
  await resend.emails.send({
    from: "La Cassonnaise <no-reply@lacassonnaise.fr>",
    to: [process.env.RESTAURANT_EMAIL!],
    subject: "Nouvelle commande",
    html: `<p>Nouvelle commande : ${orderId}</p>`,
  });
}
export async function notifyCustomer(email: string, orderId: string) {
  await resend.emails.send({
    from: "La Cassonnaise <no-reply@lacassonaise@gmail.com>",
    to: [email],
    subject: "Confirmation de commande",
    html: `<p>Votre commande ${orderId} a été confirmée.</p>`,
  });
}
import { NextResponse } from "next/server";
import Stripe from "stripe";

// On initialise Stripe avec la version attendue par tes types TypeScript
const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-12-15.clover", // <-- Ajoute cette ligne ici
    })
  : null;

export async function POST(req: Request) {
  if (!stripe) {
    return NextResponse.json(
      { error: "Stripe non configuré" },
      { status: 500 }
    );
  }

  try {
    const { totalCents, orderId } = await req.json();

    if (!totalCents || totalCents <= 0 || !orderId) {
      return NextResponse.json({ error: "Données invalides" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"], // Optionnel : force le paiement par carte
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "eur",
            unit_amount: totalCents,
            product_data: { 
              name: "Commande La Cassonnaise",
              description: `Commande n°${orderId}`
            },
          },
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?orderId=${orderId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/payment`,
      metadata: { orderId },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Erreur Stripe Checkout:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

export async function POST(req: Request) {
  if (!stripe) {
    return NextResponse.json(
      { error: "Stripe not configured" },
      { status: 500 }
    );
  }

  const { totalCents, orderId } = await req.json();

  if (!totalCents || totalCents <= 0 || !orderId) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "eur",
          unit_amount: totalCents,
          product_data: { name: "Commande restaurant" },
        },
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/payment`,
    metadata: { orderId },
  });

  return NextResponse.json({ url: session.url });
}

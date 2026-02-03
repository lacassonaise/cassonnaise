export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const body = await req.json();

    const {
      items,
      totalCents,
      phone,
      note,
      userId,
      deliveryType,
      deliveryFeeCents,
      deliveryFree,
      address,
    } = body;

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Panier invalide" }, { status: 400 });
    }

    if (typeof totalCents !== "number" || totalCents <= 0) {
      return NextResponse.json({ error: "Total invalide" }, { status: 400 });
    }

    if (!["pickup", "delivery"].includes(deliveryType)) {
      return NextResponse.json({ error: "Mode invalide" }, { status: 400 });
    }

    if (deliveryType === "delivery" && (!phone || !address)) {
      return NextResponse.json(
        { error: "Téléphone et adresse requis" },
        { status: 400 }
      );
    }

    const { data: order, error } = await supabaseAdmin
      .from("orders")
      .insert({
        user_id: userId,
        status: "pending",
        total_cents: totalCents,
        phone,
        note,
        delivery_type: deliveryType,
        delivery_fee_cents: deliveryFeeCents,
        delivery_free: deliveryFree,
        delivery_address: deliveryType === "delivery" ? address : null,
      })
      .select()
      .single();

    if (error || !order) {
      console.error(error);
      return NextResponse.json(
        { error: "Erreur création commande" },
        { status: 500 }
      );
    }
for (const item of items) {
  if (
    typeof item.priceCents !== "number" ||
    item.priceCents <= 0 ||
    typeof item.quantity !== "number" ||
    item.quantity <= 0
  ) {
    return NextResponse.json(
      { error: "Article invalide (prix ou quantité)" },
      { status: 400 }
    );
  }
}


    const { error: itemsError } = await supabaseAdmin
      .from("order_items")
      .insert(orderItems);

    if (itemsError) {
  console.error("ORDER ITEMS ERROR:", itemsError.message, itemsError.details);
  return NextResponse.json(
    { error: itemsError.message },
    { status: 500 }
  );
}


    return NextResponse.json({ orderId: order.id });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}


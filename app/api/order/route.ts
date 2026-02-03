export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";


export async function POST(req: Request) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const body = await req.json();
    console.log("API /order BODY:", body);

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

    /* =====================
       VALIDATIONS
    ===================== */

    // panier
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Panier invalide" },
        { status: 400 }
      );
    }

    // total
    if (typeof totalCents !== "number" || totalCents <= 0) {
      return NextResponse.json(
        { error: "Total invalide" },
        { status: 400 }
      );
    }

    // mode
    if (!["pickup", "delivery"].includes(deliveryType)) {
      return NextResponse.json(
        { error: "Mode invalide" },
        { status: 400 }
      );
    }

    // téléphone UNIQUEMENT pour livraison
    if (
      deliveryType === "delivery" &&
      (!phone || typeof phone !== "string" || phone.trim() === "")
    ) {
      return NextResponse.json(
        { error: "Téléphone requis pour la livraison" },
        { status: 400 }
      );
    }

    // adresse UNIQUEMENT pour livraison
    if (
      deliveryType === "delivery" &&
      (!address || typeof address !== "string")
    ) {
      return NextResponse.json(
        { error: "Adresse requise pour la livraison" },
        { status: 400 }
      );
    }

    /* =====================
       INSERT ORDER
    ===================== */

    const { data: order, error: orderError } = await supabaseAdmin
      .from("orders")
      .insert({
        user_id: userId ?? null,
        status: "pending",
        total_cents: totalCents,
        phone: phone?.trim() || null,
        note: note?.trim() || null,
        delivery_type: deliveryType,
        mode: deliveryType,
        delivery_fee_cents: deliveryFeeCents ?? 0,
        delivery_free: deliveryFree ?? false,
        delivery_address:
          deliveryType === "delivery" ? address : null,
      })
      .select()
      .single();

    if (orderError || !order) {
      console.error("ORDER INSERT ERROR:", orderError);
      return NextResponse.json(
        { error: "Erreur création commande" },
        { status: 500 }
      );
    }

    /* =====================
       INSERT ORDER ITEMS
    ===================== */

    const orderItems = items.map((item: any) => ({
      order_id: order.id,
      product_id: null, // produits pas encore tous en DB
      name_snapshot: item.name,
      quantity: item.quantity,
      price_cents: item.priceCents,
      customizations_json: item.customizations ?? {},
    }));

    const { error: itemsError } = await supabaseAdmin
      .from("order_items")
      .insert(orderItems);

    if (itemsError) {
      console.error("ORDER ITEMS ERROR:", itemsError);
      return NextResponse.json(
        { error: "Erreur articles commande" },
        { status: 500 }
      );
    }

    /* =====================
       SUCCESS
    ===================== */

    return NextResponse.json({ orderId: order.id });
  } catch (err) {
    console.error("API /order CRASH:", err);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}

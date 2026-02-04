export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const body = await req.json();

    const { items, totalCents, phone, note, userId } = body;

    // ✅ Validations
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Panier invalide" }, { status: 400 });
    }

    if (typeof totalCents !== "number" || totalCents <= 0) {
      return NextResponse.json({ error: "Total invalide" }, { status: 400 });
    }

    // 1️⃣ Création commande
    const { data: order, error: orderError } = await supabaseAdmin
      .from("orders")
      .insert({
        user_id: userId,
        status: "pending",
        total_cents: totalCents,
        phone,
        note,
      })
      .select()
      .single();

    if (orderError || !order) {
      console.error(orderError);
      return NextResponse.json(
        { error: "Erreur création commande" },
        { status: 500 }
      );
    }

    // 2️⃣ Articles commande
    const orderItems = items.map((item: any) => {
      if (!item.id || !item.priceCents || !item.quantity) {
        throw new Error("Article invalide");
      }

      return {
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity,
        price_cents: item.priceCents,
        name: item.name ?? "Produit",
      };
    });

    const { error: itemsError } = await supabaseAdmin
      .from("order_items")
      .insert(orderItems);

    if (itemsError) {
      console.error(itemsError);
      return NextResponse.json(
        { error: "Erreur articles commande" },
        { status: 500 }
      );
    }

    return NextResponse.json({ orderId: order.id });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}

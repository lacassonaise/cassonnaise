export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const body = await req.json();

    const { items, totalCents, phone, note, userId } = body;

    // 1. Validation de base
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Le panier est vide" }, { status: 400 });
    }

    // 2. Création de la commande
    const { data: order, error: orderError } = await supabaseAdmin
      .from("orders")
      .insert({
        user_id: userId || null, // Évite de planter si userId est undefined
        status: "pending",
        total_cents: totalCents,
        phone: phone || "",
        note: note || "",
      })
      .select()
      .single();

    if (orderError) {
      console.error("Erreur table orders:", orderError.message);
      return NextResponse.json({ error: orderError.message }, { status: 500 });
    }

    // 3. Préparation des articles
    // On utilise un try/catch interne pour attraper l'erreur de validation des items
    const orderItems = items.map((item: any) => {
      if (!item.id || !item.priceCents || !item.quantity) {
        // Au lieu de throw, on peut vérifier avant
        return null;
      }
      return {
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity,
        price_cents: item.priceCents,
        name: item.name ?? "Produit",
      };
    });

    if (orderItems.includes(null)) {
      return NextResponse.json({ error: "Données d'articles incomplètes" }, { status: 400 });
    }

    // 4. Insertion des articles
    const { error: itemsError } = await supabaseAdmin
      .from("order_items")
      .insert(orderItems);

    if (itemsError) {
      console.error("Erreur table order_items:", itemsError.message);
      return NextResponse.json({ error: itemsError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, orderId: order.id });

  } catch (e: any) {
    console.error("Exception globale:", e);
    return NextResponse.json({ error: "Erreur interne", message: e.message }, { status: 500 });
  }
}
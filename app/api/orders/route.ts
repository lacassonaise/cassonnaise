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

    // 1. Validations de base
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Panier invalide" }, { status: 400 });
    }

    if (typeof totalCents !== "number" || totalCents <= 0) {
      return NextResponse.json({ error: "Total invalide" }, { status: 400 });
    }

    // 2. Création de la commande principale (Order)
    const { data: order, error: orderError } = await supabaseAdmin
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

    if (orderError || !order) {
      console.error("Erreur Order:", orderError);
      return NextResponse.json({ error: "Erreur création commande" }, { status: 500 });
    }

    // 3. Préparation des articles (C'est ici que se trouvait l'erreur)
    const orderItems = items.map((item) => {
      // Validation simple de chaque article pendant le mapping
      if (!item.priceCents || !item.quantity) {
          throw new Error("Article invalide");
      }

      return {
        order_id: order.id, // On lie l'article à l'ID de la commande créée au-dessus
        product_id: item.id, // Assurez-vous que vos items ont un id de produit
        quantity: item.quantity,
        price_cents: item.priceCents,
        name: item.name || "Bijou", // Optionnel : stocker le nom au moment de l'achat
      };
    });

    // 4. Insertion groupée des articles (Order Items)
    const { error: itemsError } = await supabaseAdmin
      .from("order_items")
      .insert(orderItems);

    if (itemsError) {
      console.error("ORDER ITEMS ERROR:", itemsError.message);
      return NextResponse.json({ error: "Erreur lors de l'enregistrement des articles" }, { status: 500 });
    }

    return NextResponse.json({ orderId: order.id });

  } catch (e: any) {
    console.error("Global Error:", e);
    return NextResponse.json({ error: e.message || "Erreur serveur" }, { status: 500 });
  }
}


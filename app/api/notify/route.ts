export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { sendOrderEmailWithPdf } from "@/lib/sendOrderEmailWithPdf";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  try {
    // ✅ Initialisation SUPABASE AU MOMENT DE LA REQUÊTE
    const supabaseAdmin = getSupabaseAdmin();

    // 1. Extraction sécurisée des données
    const body = await req.json();
    const { orderId } = body;

    if (!orderId) {
      return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
    }

    // 2. Récupération de la commande
    const { data: order, error: orderError } = await supabaseAdmin
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

    if (orderError || !order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (order.status !== "paid") {
      return NextResponse.json({ error: "Order is not paid" }, { status: 400 });
    }

    // 3. Récupération des items
    const { data: items, error: itemsError } = await supabaseAdmin
      .from("order_items")
      .select("*")
      .eq("order_id", orderId);

    if (itemsError) {
      console.error("Error fetching items:", itemsError);
      return NextResponse.json(
        { error: "Failed to fetch order items" },
        { status: 500 }
      );
    }

    // 4. Envoi de l'email
    try {
      await sendOrderEmailWithPdf(order, items ?? []);
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      // volontairement non bloquant
    }

    return NextResponse.json({
      success: true,
      message: "Notification sent",
    });

  } catch (error) {
    console.error("Global error in notify route:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

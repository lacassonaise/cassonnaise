"use client";

import { useEffect } from "react";

export default function PrintPage({ order, items }: any) {
  useEffect(() => {
    window.print();
  }, []);

  return (
    <div style={{ fontFamily: "monospace" }}>
      <h2>COMMANDE</h2>
      <p>{order.delivery_type === "delivery" ? "LIVRAISON" : "À EMPORTER"}</p>
      <p>{order.delivery_address}</p>
      <hr />
      {items.map((i: any) => (
        <p key={i.id}>
          {i.quantity}× {i.name_snapshot}
        </p>
      ))}
      <hr />
      <strong>
        Total : {(order.total_cents / 100).toFixed(2)}€
      </strong>
    </div>
  );
}



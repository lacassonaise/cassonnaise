// lib/delivery.ts
export type DeliveryResult =
  | { allowed: true; feeCents: number; free: boolean }
  | { allowed: false };

export function calculateDelivery(
  postalCode: string,
  cartTotalCents: number
): DeliveryResult {
  if (!postalCode) return { allowed: false };

  // ≤ 12 km (approximation locale)
  const IN_ZONE = postalCode.startsWith("44");

  if (!IN_ZONE) return { allowed: false };

  // Livraison gratuite ≥ 25 €
  if (cartTotalCents >= 2500) {
    return { allowed: true, feeCents: 0, free: true };
  }

  // Livraison payante sinon
  return { allowed: true, feeCents: 300, free: false };
}


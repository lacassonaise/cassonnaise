"use client";

import CartDrawer from "@/components/CartDrawer";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <CartDrawer />
    </>
  );
}

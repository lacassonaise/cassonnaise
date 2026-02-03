"use client";

import { useEffect } from "react";

export default function PrintClient() {
  useEffect(() => {
    window.print();
  }, []);

  return null;
}

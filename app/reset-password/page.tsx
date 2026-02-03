"use client";
import React from "react";
import { useState } from "react";
import { supabase } from "@/lib/supabase/client";

import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function reset(e: React.FormEvent) {
    e.preventDefault();

    await supabase.auth.updateUser({ password });
    router.push("/login");
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={reset}
        className="bg-white p-6 rounded-xl shadow w-full max-w-sm space-y-4"
      >
        <h1 className="text-xl font-bold">Nouveau mot de passe</h1>

        <input
          type="password"
          placeholder="Nouveau mot de passe"
          className="w-full border p-2 rounded"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <button className="w-full bg-black text-white py-2 rounded">
          Mettre à jour
        </button>
      </form>
    </main>
  );
}

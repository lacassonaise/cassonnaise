"use client";

import { useState } from "react";

import { supabase } from "@/lib/supabase/client";



export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function sendMessage() {
    setLoading(true);
    setError("");

    /*const supabase = getSupabaseClient();*/

    const { error } = await supabase.from("contact_messages").insert({
      name,
      email,
      message,
    });

    if (error) {
      setError("Erreur lors de l’envoi du message.");
      setLoading(false);
      return;
    }

    setSent(true);
    setName("");
    setEmail("");
    setMessage("");
    setLoading(false);
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
        Contact & Informations
      </h1>

      <p className="mt-2 text-sm text-gray-600">
        Une question, une commande spéciale ou un renseignement ? Contacte-nous
        facilement.
      </p>

      <div className="mt-10 grid gap-10 md:grid-cols-2">
        {/* INFOS */}
        <div className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-black/5 space-y-6">
          <h2 className="text-xl font-semibold">Le restaurant</h2>

          <div className="space-y-3 text-sm text-gray-700">
            <div>📍 3 rue Myotis, Casson 44390</div>
            <div>⏰ 11h–14h / 18h–22h</div>
            <div>📞 09 82 28 22 14</div>
          </div>

          <a
            href="tel:0982282214"
            className="block w-full rounded-2xl bg-[#1F5C3A] py-4 text-center text-sm font-semibold text-white"
          >
            Appeler le restaurant
          </a>

          <div className="overflow-hidden rounded-2xl border">
            <iframe
              title="Google Maps"
              src="https://www.google.com/maps?q=3%20rue%20Myotis%20Casson%2044390&output=embed"
              className="h-64 w-full border-0"
              loading="lazy"
            />
          </div>
        </div>

        {/* FORMULAIRE */}
        <div className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-black/5 space-y-6">
          <h2 className="text-xl font-semibold">Écrire un message</h2>

          {sent && (
            <div className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">
              Message envoyé avec succès ✅
            </div>
          )}

          {error && (
            <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nom"
            className="w-full rounded-2xl border px-4 py-3 text-sm"
          />

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full rounded-2xl border px-4 py-3 text-sm"
          />

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            placeholder="Votre message…"
            className="w-full rounded-2xl border px-4 py-3 text-sm"
          />

          <button
            disabled={loading}
            onClick={sendMessage}
            className="w-full rounded-2xl bg-[#C97A3A] py-4 text-sm font-semibold text-white disabled:opacity-50"
          >
            {loading ? "Envoi…" : "Envoyer"}
          </button>
        </div>
      </div>
    </div>
  );
}



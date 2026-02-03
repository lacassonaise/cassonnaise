"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";


import { eur } from "@/lib/format";
import { useRouter } from "next/navigation";

/* =====================
   TYPES
===================== */
type Order = {
  id: string;
  created_at: string;
  total_cents: number;
  status: string;
  delivery_type: string;
};

/* =====================
   PAGE
===================== */
export default function ComptePage() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loyaltyPoints, setLoyaltyPoints] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();

    // 🔐 Écoute les changements d’auth (login / logout)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);

      if (!session) {
        setOrders([]);
        setLoyaltyPoints(0);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function load() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUser(user);

    if (user) {
      // 📦 COMMANDES
      const { data: ordersData } = await supabase
        .from("orders")
        .select("id, created_at, total_cents, status, delivery_type")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      setOrders(ordersData || []);

      // 🎁 FIDÉLITÉ
      const { data: loyalty } = await supabase
        .from("loyalty_points")
        .select("points")
        .eq("user_id", user.id)
        .single();

      setLoyaltyPoints(loyalty?.points ?? 0);
    }

    setLoading(false);
  }

  async function logout() {
    const { error } = await supabase.auth.signOut();

    if (!error) {
      setUser(null);
      setOrders([]);
      setLoyaltyPoints(0);
      router.push("/compte");
    }
  }

  /* =====================
     STATES
  ===================== */

  if (loading) {
    return (
      <div className="p-12 text-center text-sm text-gray-500">
        Chargement…
      </div>
    );
  }

  if (!user) {
    return <AuthForm onAuth={load} />;
  }

  /* =====================
     RENDER
  ===================== */

  return (
    <div className="mx-auto max-w-4xl px-5 py-10 space-y-8">
      {/* PROFIL */}
      <div className="rounded-3xl bg-white p-6 shadow ring-1 ring-black/5">
        <h1 className="text-2xl font-bold">Mon compte</h1>
        <p className="mt-1 text-sm text-gray-600">{user.email}</p>

        <button
          onClick={logout}
          className="mt-4 rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white"
        >
          Se déconnecter
        </button>
      </div>

      {/* FIDÉLITÉ */}
      <div className="rounded-3xl bg-[#1F5C3A]/10 p-6 shadow">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-[#1F5C3A]">
              🎁 Fidélité
            </div>
            <div className="mt-1 text-xs text-gray-600">
              1 € dépensé = 1 point
            </div>
          </div>

          <div className="text-right">
            <div className="text-2xl font-bold text-[#1F5C3A]">
              {loyaltyPoints}
            </div>
            <div className="text-xs text-gray-600">points</div>
          </div>
        </div>
      </div>

      {/* COMMANDES */}
      <div className="rounded-3xl bg-white p-6 shadow ring-1 ring-black/5">
        <h2 className="text-xl font-semibold">Mes commandes</h2>

        {orders.length === 0 && (
          <p className="mt-4 text-sm text-gray-500">
            Aucune commande pour le moment.
          </p>
        )}

        <div className="mt-6 space-y-4">
          {orders.map((o) => (
            <button
              key={o.id}
              onClick={() => router.push(`/compte/commande/${o.id}`)}
              className="w-full flex justify-between rounded-xl border px-4 py-3 text-sm hover:bg-gray-50 transition"
            >
              <div>
                <div className="font-medium">
                  {new Date(o.created_at).toLocaleDateString("fr-FR")}
                </div>
                <div className="text-gray-500">
                  {o.delivery_type === "delivery"
                    ? "Livraison"
                    : "À emporter"}
                </div>
              </div>

              <div className="text-right">
                <div className="font-semibold">
                  {eur(o.total_cents)}
                </div>
                <div
                  className={`text-xs ${
                    o.status === "paid"
                      ? "text-green-600"
                      : "text-orange-600"
                  }`}
                >
                  {o.status === "paid" ? "Payée" : "En attente"}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =====================
   AUTH FORM
===================== */
function AuthForm({ onAuth }: { onAuth: () => void }) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  async function submit() {
    setLoading(true);
    setMsg("");

    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({ email, password });
      setMsg(error ? error.message : "Compte créé. Vérifie ton email.");
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) setMsg(error.message);
      else onAuth();
    }

    setLoading(false);
  }

  async function resetPassword() {
    if (!email) {
      setMsg("Entre ton email d’abord.");
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email);
    setMsg(error ? error.message : "Email de réinitialisation envoyé.");
  }

  return (
    <div className="mx-auto max-w-md rounded-3xl bg-white p-6 shadow ring-1 ring-black/5">
      <h1 className="text-2xl font-bold">
        {mode === "login" ? "Connexion" : "Créer un compte"}
      </h1>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => setMode("login")}
          className={`flex-1 rounded-xl border px-3 py-2 text-sm ${
            mode === "login" ? "bg-black text-white" : ""
          }`}
        >
          Connexion
        </button>
        <button
          onClick={() => setMode("signup")}
          className={`flex-1 rounded-xl border px-3 py-2 text-sm ${
            mode === "signup" ? "bg-black text-white" : ""
          }`}
        >
          Créer un compte
        </button>
      </div>

      <label className="mt-4 block text-sm font-semibold">Email</label>
      <input
        className="mt-2 w-full rounded-xl border px-3 py-2 text-sm"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email@exemple.com"
      />

      <label className="mt-4 block text-sm font-semibold">
        Mot de passe
      </label>
      <input
        className="mt-2 w-full rounded-xl border px-3 py-2 text-sm"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
      />

      {mode === "login" && (
        <button
          onClick={resetPassword}
          className="mt-3 text-xs text-gray-600 hover:underline"
        >
          Mot de passe oublié ?
        </button>
      )}

      <button
        onClick={submit}
        disabled={loading}
        className="mt-5 w-full rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white disabled:opacity-50"
      >
        {loading
          ? "Chargement…"
          : mode === "login"
          ? "Se connecter"
          : "Créer mon compte"}
      </button>

      {msg && <p className="mt-4 text-sm text-gray-700">{msg}</p>}
    </div>
  );
}




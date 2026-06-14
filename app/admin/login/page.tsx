"use client";

import { useActionState, useEffect } from "react";
import Image from "next/image";
import { loginAction } from "../actions";
import { Loader2, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const initial: { error?: string; success?: boolean } = {};

export default function LoginPage() {
  const [state, action, pending] = useActionState(loginAction, initial);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (state?.success) window.location.href = "/admin";
  }, [state]);

  return (
    <div
      className="admin-login min-h-screen flex items-center justify-center px-4"
      style={{
        background: "linear-gradient(135deg, #f5f3ff 0%, #eff6ff 50%, #f0fdfa 100%)",
      }}
    >
      {/* Décoration fond */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, #c4b5fd, transparent)" }} />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #67e8f9, transparent)" }} />
      </div>

      <div className="relative w-full max-w-md">

        {/* Logo + Marque */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-6">
            <Image src="/IMG-20260502-WA0007.jpg" alt="Alpha Tech" width={44} height={44} className="rounded-xl object-contain shadow-sm" />
            <div className="text-left">
              <p className="font-black text-black text-lg leading-none">Groupe Alpha</p>
              <p className="text-black text-xs font-semibold">Webinaire IA</p>
            </div>
          </div>
          <h1 className="text-3xl font-black text-black">Connexion</h1>
          <p className="text-black text-sm mt-2">Accès réservé à l'équipe Groupe Alpha</p>
        </div>

        {/* Carte formulaire */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8">

          <form action={action} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Lock className="w-4 h-4 text-slate-400" />
                </div>
                <input
                  type={show ? "text" : "password"}
                  name="password"
                  required
                  autoFocus
                  placeholder="Entrez votre mot de passe"
                  className="w-full pl-11 pr-12 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-violet-400 focus:bg-white focus:ring-3 focus:ring-violet-100 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {state?.error && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                {state.error}
              </div>
            )}

            <button
              type="submit"
              disabled={pending}
              className="w-full py-3.5 rounded-xl font-bold text-white text-sm flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              style={{
                background: "linear-gradient(135deg, #7c3aed 0%, #0891b2 100%)",
                boxShadow: "0 4px 20px rgba(124, 58, 237, 0.35)",
                color: "#ffffff",
              }}
            >
              {pending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
              {pending ? "Connexion…" : "Se connecter"}
            </button>
          </form>

          {/* Séparateur bas */}
          <div className="mt-6 pt-5 border-t border-slate-100 text-center">
            <a href="/" className="text-xs text-black hover:text-violet-600 transition-colors">
              ← Retour à la landing page
            </a>
          </div>
        </div>

        {/* Badge sécurité */}
        <p className="text-center text-xs text-black mt-5 flex items-center justify-center gap-1.5">
          <Lock className="w-3 h-3" />
          Accès sécurisé · Groupe Alpha {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}

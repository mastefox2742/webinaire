"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import type { InscriptionState } from "../actions";
import { CheckCircle, AlertCircle, Loader2, MessageCircle } from "lucide-react";

const initial: InscriptionState = { status: "idle" };

export function Formulaire({ whatsappGroupLink }: { whatsappGroupLink: string }) {
  const [state, setState] = useState<InscriptionState>(initial);
  const [pending, setPending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);

    try {
      const response = await fetch("/api/inscription", {
        method: "POST",
        body: new FormData(event.currentTarget),
      });
      const result = (await response.json()) as InscriptionState;
      setState(result);
    } catch {
      setState({
        status: "error",
        message: "Le service d'inscription est momentanément indisponible.",
      });
    } finally {
      setPending(false);
    }
  }

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
      if (state.whatsappLink) {
        setTimeout(() => { window.location.href = state.whatsappLink; }, 2000);
      }
    }
  }, [state]);

  return (
    <section id="inscription" className="py-24 px-4 sm:px-6">
      <hr className="section-divider mb-20 max-w-4xl mx-auto" />
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-violet-600 mb-4 bg-violet-50 border border-violet-200 rounded-full px-4 py-1.5">
            Inscription gratuite
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900">
            Réserve ta place <span className="gradient-text">maintenant</span>
          </h2>
          <p className="text-slate-500 mt-3 text-sm">Places limitées — inscription gratuite et sans engagement.</p>
        </div>

        <div className="card-glow rounded-3xl p-6 sm:p-8">
          {state.status === "success" ? (
            <div className="text-center py-8">
              <div className="w-20 h-20 rounded-full bg-green-50 border border-green-200 flex items-center justify-center mx-auto mb-5">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Tu es inscrit(e) !</h3>
              <p className="text-slate-600 leading-relaxed mb-6">{state.message}</p>
              {state.whatsappLink && (
                <div>
                  <p className="text-sm text-slate-400 mb-3">Redirection vers le groupe WhatsApp dans 2 secondes…</p>
                  <a href={state.whatsappLink}
                    className="inline-flex items-center gap-2 font-bold py-3 px-6 rounded-xl text-white transition-all hover:-translate-y-0.5"
                    style={{ background: "#25d366", boxShadow: "0 4px 20px rgba(37,211,102,0.35)" }}>
                    <MessageCircle className="w-5 h-5" />
                    Rejoindre le groupe WhatsApp
                  </a>
                </div>
              )}
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
              {[
                { name: "nom",       label: "Nom complet",          type: "text",  placeholder: "Ex. : Jean-Pierre Moukala", required: true },
                { name: "email",     label: "Email",                 type: "email", placeholder: "ton@email.com",             required: true },
                { name: "telephone", label: "Téléphone / WhatsApp",  type: "tel",   placeholder: "+242 06 XXX XX XX",         required: false },
              ].map(({ name, label, type, placeholder, required }) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    {label} {required && <span className="text-red-500">*</span>}
                    {name === "telephone" && <span className="text-slate-400 text-xs ml-2">(pour recevoir le lien J-1)</span>}
                  </label>
                  <input type={type} name={name} required={required} placeholder={placeholder}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all" />
                </div>
              ))}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Je suis… <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: "entrepreneur_pro", label: "Entrepreneur / Professionnel" },
                    { value: "lyceen_etudiant",  label: "Lycéen / Étudiant" },
                  ].map(({ value, label }) => (
                    <label key={value} className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-3 cursor-pointer hover:border-violet-400 hover:bg-violet-50 transition-all">
                      <input type="radio" name="profil" value={value} required className="accent-violet-600" />
                      <span className="text-sm text-slate-700">{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {state.status === "error" && (
                <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />{state.message}
                </div>
              )}

              {whatsappGroupLink && (
                <div className="flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-sm">
                  <MessageCircle className="w-4 h-4 flex-shrink-0" />
                  Après inscription tu seras redirigé(e) vers le groupe WhatsApp des participants.
                </div>
              )}

              <button type="submit" disabled={pending}
                className="btn-primary w-full flex items-center justify-center gap-2 !py-4 !rounded-xl disabled:opacity-70 disabled:cursor-not-allowed text-base">
                {pending
                  ? <><Loader2 className="w-4 h-4 animate-spin" />Inscription en cours…</>
                  : "Confirmer mon inscription gratuite →"}
              </button>
              <p className="text-center text-xs text-slate-400">Tes données restent confidentielles. Aucun spam.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const items = [
  { q: "C'est vraiment gratuit ?", a: "Oui, 100% gratuit et sans conditions cachées. Le webinaire est offert par le Groupe Alpha pour te donner une vision claire avant de décider si une masterclasse payante te correspond." },
  { q: "Je n'y connais rien en IA, c'est pour moi ?", a: "Absolument. Ce webinaire est conçu pour les débutants. Pas de jargon technique, pas de code. On parle d'usages concrets, d'outils gratuits, et de stratégie personnelle." },
  { q: "Le replay sera-t-il disponible ?", a: "Un replay de 48h est prévu pour les inscrits uniquement. Passé ce délai, le replay ne sera plus accessible — c'est volontaire pour favoriser la participation en direct." },
  { q: "Faut-il du matériel particulier ?", a: "Un smartphone ou ordinateur avec connexion internet suffit. Pas de logiciel à installer. On te communique le lien de connexion par email et WhatsApp la veille du live." },
  { q: "Quelle est la différence avec Reboot Business et Génération IA ?", a: "Le webinaire est une introduction gratuite de 2h. Reboot Business (Décembre 2026) et Génération IA (Janvier–Février 2027) sont des masterclasses payantes approfondies, spécifiques à chaque profil." },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="card-dark rounded-2xl overflow-hidden" style={open ? { borderColor: "rgba(124,58,237,0.35)", background: "rgba(124,58,237,0.04)" } : {}}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left">
        <span className="font-semibold text-slate-900">{q}</span>
        <ChevronDown className={`w-5 h-5 text-violet-500 flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="px-6 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">{a}</div>
      </div>
    </div>
  );
}

export function FAQ() {
  return (
    <section className="py-24 px-4 sm:px-6">
      <hr className="section-divider mb-20 max-w-4xl mx-auto" />
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-cyan-700 mb-4 bg-cyan-50 border border-cyan-200 rounded-full px-4 py-1.5">FAQ</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900">
            Tes questions, <span className="gradient-text">nos réponses</span>
          </h2>
        </div>
        <div className="space-y-3">
          {items.map((item) => <FAQItem key={item.q} {...item} />)}
        </div>
      </div>
    </section>
  );
}

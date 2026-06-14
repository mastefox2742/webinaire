import { Eye, Wrench, BarChart3, Star } from "lucide-react";

const items = [
  { icon: Eye,      color: "#7c3aed", bg: "rgba(124,58,237,0.08)", border: "rgba(124,58,237,0.2)", label: "Vision claire",          text: "Compréhension concrète de ce que l'IA change, sans jargon ni blabla technique." },
  { icon: Wrench,   color: "#0891b2", bg: "rgba(8,145,178,0.08)",  border: "rgba(8,145,178,0.2)",  label: "3 outils offerts",        text: "3 outils IA gratuits que tu peux utiliser dès le lendemain du webinaire." },
  { icon: BarChart3,color: "#059669", bg: "rgba(5,150,105,0.08)",  border: "rgba(5,150,105,0.2)",  label: "Grille d'auto-évaluation",text: '"Subir ou Piloter ?" — exercice collectif pour savoir exactement où tu en es.' },
  { icon: Star,     color: "#d97706", bg: "rgba(217,119,6,0.08)",  border: "rgba(217,119,6,0.2)",  label: "Accès prioritaire",       text: "Accès en avant-première aux masterclasses Reboot Business & Génération IA." },
];

export function Benefices() {
  return (
    <section className="py-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-cyan-700 mb-4 bg-cyan-50 border border-cyan-200 rounded-full px-4 py-1.5">
            Ce que tu repars avec
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900">
            2 heures qui changent{" "}
            <span className="gradient-text">ta trajectoire</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {items.map(({ icon: Icon, color, bg, border, label, text }) => (
            <div key={label} className="flex items-start gap-4 card-dark rounded-2xl p-6">
              <div className="w-11 h-11 rounded-xl flex-shrink-0 flex items-center justify-center mt-0.5"
                style={{ background: bg, border: `1px solid ${border}` }}>
                <Icon className="w-5 h-5" style={{ color }} />
              </div>
              <div>
                <p className="font-bold text-slate-900 mb-1">{label}</p>
                <p className="text-slate-600 text-sm leading-relaxed">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

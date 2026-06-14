import { Briefcase, GraduationCap, TrendingUp } from "lucide-react";

const cards = [
  {
    icon: Briefcase,
    color: "#7c3aed",
    bg: "rgba(124,58,237,0.08)",
    border: "rgba(124,58,237,0.2)",
    title: "Au travail",
    content: "Des postes entiers sont automatisés pendant que d'autres professionnels utilisent l'IA pour produire 10× plus vite. Le fossé se creuse chaque semaine.",
    stat: "30% des tâches",
    statLabel: "déjà automatisables aujourd'hui",
  },
  {
    icon: GraduationCap,
    color: "#0891b2",
    bg: "rgba(8,145,178,0.08)",
    border: "rgba(8,145,178,0.2)",
    title: "Aux études",
    content: "Tes camarades utilisent déjà l'IA pour apprendre plus vite, mieux rédiger et préparer leurs examens. Les recruteurs de demain verront la différence.",
    stat: "65% des étudiants",
    statLabel: "dans les grandes villes utilisent l'IA",
  },
  {
    icon: TrendingUp,
    color: "#059669",
    bg: "rgba(5,150,105,0.08)",
    border: "rgba(5,150,105,0.2)",
    title: "En affaires",
    content: "Tes concurrents testent des outils IA pour gérer leurs clients, créer du contenu et automatiser leur admin. Certains réduisent leurs coûts de 40%.",
    stat: "3× plus rapide",
    statLabel: "pour les entrepreneurs qui adoptent l'IA",
  },
];

export function Constat() {
  return (
    <section className="relative py-24 px-4 sm:px-6">
      <hr className="section-divider mb-20 max-w-4xl mx-auto" />
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-violet-600 mb-4 bg-violet-50 border border-violet-200 rounded-full px-4 py-1.5">
            Le constat
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900">
            Pendant que tu hésites,{" "}
            <span className="gradient-text">le monde avance déjà</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {cards.map(({ icon: Icon, color, bg, border, title, content, stat, statLabel }) => (
            <div
              key={title}
              className="card-dark rounded-2xl p-6 flex flex-col gap-4 group cursor-default"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                style={{ background: bg, border: `1px solid ${border}` }}>
                <Icon className="w-6 h-6" style={{ color }} />
              </div>
              <h3 className="text-xl font-bold text-slate-900">{title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{content}</p>
              <div className="mt-auto pt-4 border-t border-slate-100">
                <span className="font-black text-2xl gradient-text">{stat}</span>
                <p className="text-xs text-slate-500 mt-0.5">{statLabel}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

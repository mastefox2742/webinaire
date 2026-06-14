import { Briefcase, BookOpen } from "lucide-react";

export function PourQui() {
  return (
    <section className="py-24 px-4 sm:px-6">
      <hr className="section-divider mb-20 max-w-4xl mx-auto" />
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-cyan-700 mb-4 bg-cyan-50 border border-cyan-200 rounded-full px-4 py-1.5">
            Pour qui
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900">
            Ce webinaire est fait <span className="gradient-text">pour toi</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {/* Entrepreneurs */}
          <div className="card-dark rounded-2xl p-8 flex flex-col gap-4" style={{ borderColor: "rgba(124,58,237,0.3)" }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.25)" }}>
              <Briefcase className="w-6 h-6 text-violet-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Entrepreneur · Professionnel</h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              Tu diriges, tu vends, tu gères une équipe — et tu veux que l'IA
              <strong className="text-slate-800"> travaille pour ton business</strong>, pas contre toi.
            </p>
            <div className="mt-1">
              <p className="text-xs text-slate-400 mb-2">Ce que tu trouveras ici :</p>
              <ul className="space-y-1.5 text-sm text-slate-600">
                {["Automatiser les tâches répétitives", "Produire plus avec moins d'équipe", "Masterclass Reboot Business (Décembre 2026)"].map(t => (
                  <li key={t} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-500 flex-shrink-0" />{t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Étudiants */}
          <div className="card-dark rounded-2xl p-8 flex flex-col gap-4" style={{ borderColor: "rgba(8,145,178,0.3)" }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "rgba(8,145,178,0.1)", border: "1px solid rgba(8,145,178,0.25)" }}>
              <BookOpen className="w-6 h-6 text-cyan-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Lycéen · Étudiant</h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              Tu prépares ton avenir — et tu veux savoir quelles compétences
              <strong className="text-slate-800"> développer dès maintenant</strong> pour ne pas être dépassé.
            </p>
            <div className="mt-1">
              <p className="text-xs text-slate-400 mb-2">Ce que tu trouveras ici :</p>
              <ul className="space-y-1.5 text-sm text-slate-600">
                {["Apprendre plus vite avec l'IA", "Les métiers de demain qui recrutent", "Masterclass Génération IA (Janv.–Fév. 2027)"].map(t => (
                  <li key={t} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 flex-shrink-0" />{t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <p className="text-center mt-8 text-slate-500 text-sm">
          Ce webinaire s'adresse aux deux —{" "}
          <span className="text-slate-700 font-medium">chacun y trouve une suite adaptée à la fin.</span>
        </p>
      </div>
    </section>
  );
}

const steps = [
  { time: "19h30", color: "#7c3aed", bg: "rgba(124,58,237,0.08)", border: "rgba(124,58,237,0.2)", title: "Le monde a changé",        desc: "3 exemples concrets et frappants de ce que l'IA a déjà transformé en Afrique et dans le monde." },
  { time: "20h00", color: "#0891b2", bg: "rgba(8,145,178,0.08)",  border: "rgba(8,145,178,0.2)",  title: "Démo en direct",           desc: "Démonstration live de 3 outils IA gratuits : comment les utiliser immédiatement dans ton quotidien." },
  { time: "20h45", color: "#059669", bg: "rgba(5,150,105,0.08)",  border: "rgba(5,150,105,0.2)",  title: "Grille d'auto-évaluation", desc: 'Exercice collectif : "Subir ou Piloter ?" — où en es-tu vraiment par rapport à l\'IA ?' },
  { time: "21h15", color: "#d97706", bg: "rgba(217,119,6,0.08)",  border: "rgba(217,119,6,0.2)",  title: "Q&A + Prochaines étapes",  desc: "Questions en direct, conseils personnalisés, et présentation des masterclasses (double CTA)." },
];

export function Programme() {
  return (
    <section className="py-24 px-4 sm:px-6">
      <hr className="section-divider mb-20 max-w-4xl mx-auto" />
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-green-700 mb-4 bg-green-50 border border-green-200 rounded-full px-4 py-1.5">
            Programme
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900">
            2 heures, <span className="gradient-text">structurées pour l'action</span>
          </h2>
        </div>

        <div className="relative">
          <div className="absolute left-[68px] top-6 bottom-6 w-px hidden sm:block"
            style={{ background: "linear-gradient(to bottom, #7c3aed, #0891b2, #059669, #d97706)", opacity: 0.3 }} />

          <div className="space-y-5">
            {steps.map(({ time, color, bg, border, title, desc }, i) => (
              <div key={i} className="flex gap-4 sm:gap-6 items-start">
                <div className="flex-shrink-0 w-[80px] sm:w-[104px] text-right">
                  <span className="font-black text-lg tabular-nums" style={{ color }}>{time}</span>
                </div>
                <div className="flex-shrink-0 w-3 h-3 rounded-full mt-1.5 hidden sm:block"
                  style={{ background: color, boxShadow: `0 0 8px ${color}60` }} />
                <div className="flex-1 card-dark rounded-2xl p-5" style={{ borderColor: border, background: bg }}>
                  <h3 className="font-bold text-slate-900 mb-1">{title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

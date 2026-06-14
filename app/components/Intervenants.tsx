import Image from "next/image";
import type { Intervenant } from "../lib/intervenants";

export function Intervenants({ intervenants }: { intervenants: Intervenant[] }) {
  if (intervenants.length === 0) return null;

  return (
    <section className="py-24 px-4 sm:px-6">
      <hr className="section-divider mb-20 max-w-4xl mx-auto" />
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-violet-600 mb-4 bg-violet-50 border border-violet-200 rounded-full px-4 py-1.5">
            {intervenants.length > 1 ? "Intervenants" : "Intervenant"}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900">
            Qui va vous <span className="gradient-text">guider ce jour-là ?</span>
          </h2>
        </div>

        <div className={`grid gap-6 ${intervenants.length === 1 ? "max-w-2xl mx-auto" : "sm:grid-cols-2"}`}>
          {intervenants.map((p) => (
            <div key={p.id} className="card-dark rounded-3xl p-8 sm:p-10">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl flex-shrink-0 overflow-hidden flex items-center justify-center ring-2 ring-violet-200"
                  style={{ background: "linear-gradient(135deg, #7c3aed, #0891b2)" }}>
                  {p.photo ? (
                    <Image src={p.photo} alt={p.nom} width={112} height={112} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-white font-black text-3xl">
                      {p.nom.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                    </span>
                  )}
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-2xl font-black text-slate-900">{p.nom}</h3>
                  <p className="gradient-text font-semibold mt-1">{p.titre}</p>
                  {p.bio && <p className="text-slate-600 text-sm mt-3 leading-relaxed">{p.bio}</p>}
                  {p.badges.length > 0 && (
                    <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-4">
                      {p.badges.map((badge) => (
                        <span key={badge} className="inline-flex items-center text-xs font-medium text-violet-700 bg-violet-50 border border-violet-200 rounded-full px-3 py-1.5">
                          {badge}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

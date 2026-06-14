import { Calendar, Clock, Wifi, Zap } from "lucide-react";

const TZ = "Africa/Brazzaville";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: TZ,
  });
}
function formatTime(iso: string) {
  const start = new Date(iso).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit", timeZone: TZ });
  const end = new Date(new Date(iso).getTime() + 2 * 3600 * 1000).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit", timeZone: TZ });
  return `${start} – ${end}`;
}

export function Hero({ date, title }: { date: string; title: string }) {
  const dateStr = formatDate(date);
  const timeStr = formatTime(date);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center py-20">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 border border-violet-300 bg-violet-50 rounded-full px-5 py-2 mb-8">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <Zap className="w-3.5 h-3.5 text-violet-600" />
          <span className="text-sm text-violet-700 font-semibold capitalize">Webinaire Gratuit · {dateStr}</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-tight mb-6 text-slate-900">
          Le monde change{" "}
          <span className="shimmer-text">avec l'IA.</span>
          <br />
          <span className="text-3xl sm:text-4xl md:text-5xl mt-2 block">
            Allez-vous{" "}
            <span className="gradient-text">subir ou piloter ?</span>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          Un webinaire gratuit en direct sur l'impact de l'IA sur le{" "}
          <strong className="text-slate-800">travail</strong>, les{" "}
          <strong className="text-slate-800">études</strong> et les{" "}
          <strong className="text-slate-800">affaires</strong> en Afrique.
        </p>

        {/* Chips */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12 text-sm">
          <div className="flex items-center gap-2 bg-white/80 border border-violet-200 backdrop-blur-sm rounded-full px-4 py-2.5 text-slate-700">
            <Calendar className="w-4 h-4 text-violet-500" />
            <span className="capitalize">{dateStr}</span>
          </div>
          <div className="flex items-center gap-2 bg-white/80 border border-cyan-200 backdrop-blur-sm rounded-full px-4 py-2.5 text-slate-700">
            <Clock className="w-4 h-4 text-cyan-600" />
            <span>{timeStr} (Brazzaville)</span>
          </div>
          <div className="flex items-center gap-2 bg-white/80 border border-slate-200 backdrop-blur-sm rounded-full px-4 py-2.5 text-slate-700">
            <Wifi className="w-4 h-4 text-violet-500" />
            <span>100% en ligne · Gratuit</span>
          </div>
        </div>

        {/* CTA */}
        <a href="#inscription" className="btn-primary text-lg !py-5 !px-12 shadow-2xl float inline-block">
          Je réserve ma place gratuite →
        </a>
        <p className="mt-5 text-xs text-slate-400">Aucune carte bancaire. Gratuit. 2 minutes pour s'inscrire.</p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 mt-16 pt-8 border-t border-violet-100">
          {[
            { val: "100%", label: "Gratuit" },
            { val: "2h", label: "De contenu live" },
            { val: "3", label: "Outils IA offerts" },
          ].map(({ val, label }) => (
            <div key={label} className="text-center">
              <p className="text-3xl font-black gradient-text">{val}</p>
              <p className="text-xs text-slate-500 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

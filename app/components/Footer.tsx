import Image from "next/image";
import { Globe, Share2, MessageSquareShare, Link } from "lucide-react";

export function Footer() {
  return (
    <>
      {/* CTA Final */}
      <section className="py-28 px-4 sm:px-6 text-center">
        <hr className="section-divider mb-20 max-w-4xl mx-auto" />
        <div className="max-w-3xl mx-auto">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-violet-600 mb-6 bg-violet-50 border border-violet-200 rounded-full px-4 py-1.5">
            Dernière chance
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 leading-tight mb-6">
            Le monde change avec l'IA.{" "}
            <span className="shimmer-text block mt-2">Et toi, tu fais quoi ?</span>
          </h2>
          <p className="text-slate-600 mb-10 max-w-xl mx-auto text-lg">
            Rejoins les inscrits qui ont déjà choisi de piloter leur avenir.
            C'est gratuit, en direct, et ça peut tout changer.
          </p>
          <a href="#inscription" className="btn-primary text-xl !py-5 !px-14 shadow-2xl inline-block">
            Je réserve ma place gratuite →
          </a>
          <p className="mt-5 text-xs text-slate-400">Gratuit · 100% en ligne · Sans engagement</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-10 px-4 sm:px-6 bg-white/70 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <Image src="/IMG-20260502-WA0007.jpg" alt="Alpha Tech" width={36} height={36} className="rounded-lg object-contain" />
              <div>
                <p className="font-bold text-slate-800 text-sm">Groupe Alpha</p>
                <p className="text-xs text-slate-400">Brazzaville, République du Congo</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {[
                { Icon: Globe,              href: "#", label: "Site web" },
                { Icon: Share2,             href: "#", label: "Partager" },
                { Icon: MessageSquareShare, href: "#", label: "WhatsApp" },
                { Icon: Link,               href: "#", label: "Liens" },
              ].map(({ Icon, href, label }) => (
                <a key={label} href={href} aria-label={label}
                  className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-violet-600 hover:border-violet-300 hover:bg-violet-50 transition-all">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
            <p>© {new Date().getFullYear()} Groupe Alpha · Tous droits réservés</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-slate-600 transition-colors">Mentions légales</a>
              <a href="#" className="hover:text-slate-600 transition-colors">Politique de confidentialité</a>
              <a href="/admin" className="hover:text-slate-500 transition-colors opacity-40 hover:opacity-70">Admin</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

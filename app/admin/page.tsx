import { redirect } from "next/navigation";
import { isAuthenticated, getAdminData, logoutAction } from "./actions";
import { ConfigForm } from "./ConfigForm";
import { EmailPanel } from "./EmailPanel";
import { IntervenantsPanel } from "./IntervenantsPanel";
import { getIntervenants } from "../lib/intervenants";
import Image from "next/image";
import { Users, Briefcase, BookOpen, LogOut, Download, Settings, Mail, CheckCircle, XCircle, Mic } from "lucide-react";

export default async function AdminPage() {
  const auth = await isAuthenticated();
  if (!auth) redirect("/admin/login");

  const data = await getAdminData();
  if (!data) redirect("/admin/login");

  const { config, inscrits, stats } = data;
  const intervenants = await getIntervenants();
  const hasResend = !!(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD);

  const webinarDate = new Date(config.date);
  const dateStr = webinarDate.toLocaleDateString("fr-FR", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });
  const timeStr = webinarDate.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 bg-[#06060e]/95 backdrop-blur border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
          <div className="flex items-center gap-2">
            <Image src="/IMG-20260502-WA0007.jpg" alt="Alpha Tech" width={28} height={28} className="rounded-lg object-contain" />
            <span className="font-bold text-white text-sm">Admin</span>
            <span className="text-gray-600 text-sm hidden sm:inline">— Webinaire IA</span>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" target="_blank" className="text-xs text-gray-500 hover:text-gray-300 transition-colors hidden sm:block">
              Voir la page →
            </a>
            <form action={logoutAction}>
              <button type="submit" className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-red-400 transition-colors">
                <LogOut className="w-3.5 h-3.5" />
                Déconnexion
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-6">

          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Inscrits total", value: stats.total, icon: Users, color: "#6c63ff" },
                { label: "Entrepreneurs / Pros", value: stats.entrepreneurs, icon: Briefcase, color: "#00d4ff" },
                { label: "Lycéens / Étudiants", value: stats.etudiants, icon: BookOpen, color: "#a78bfa" },
                { label: "Rappels envoyés", value: stats.rappelsSent, icon: Mail, color: "#34d399" },
              ].map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="card-dark rounded-2xl p-4">
                  <Icon className="w-5 h-5 mb-2" style={{ color }} />
                  <p className="text-2xl font-black text-white">{value}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{label}</p>
                </div>
              ))}
            </div>

            <div className="card-dark rounded-2xl p-5">
              <h2 className="font-bold text-white mb-3 flex items-center gap-2">
                <Settings className="w-4 h-4 text-[#6c63ff]" />
                Configuration actuelle
              </h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Date</span>
                  <span className="text-white font-medium capitalize">{dateStr} à {timeStr}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Lien call</span>
                  {config.callLink ? (
                    <a href={config.callLink} target="_blank" className="text-[#00d4ff] underline truncate max-w-[200px]">
                      {config.callLink}
                    </a>
                  ) : (
                    <span className="flex items-center gap-1 text-yellow-500 text-xs">
                      <XCircle className="w-3.5 h-3.5" /> Non configuré
                    </span>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Email API</span>
                  {hasResend ? (
                    <span className="flex items-center gap-1 text-green-400 text-xs">
                      <CheckCircle className="w-3.5 h-3.5" /> Gmail configuré ✓
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-yellow-500 text-xs">
                      <XCircle className="w-3.5 h-3.5" /> Gmail non configuré
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="card-dark rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
                <h2 className="font-bold text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#6c63ff]" />
                  Inscrits ({stats.total})
                </h2>
                <a href="/admin/export" className="text-xs text-gray-500 hover:text-gray-300 flex items-center gap-1 transition-colors">
                  <Download className="w-3.5 h-3.5" />
                  Export CSV
                </a>
              </div>

              {inscrits.length === 0 ? (
                <p className="text-gray-600 text-sm text-center py-10">Aucun inscrit pour l'instant.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/5">
                        <th className="text-left text-gray-500 font-medium px-5 py-3">Nom</th>
                        <th className="text-left text-gray-500 font-medium px-3 py-3 hidden sm:table-cell">Email</th>
                        <th className="text-left text-gray-500 font-medium px-3 py-3 hidden md:table-cell">Téléphone</th>
                        <th className="text-left text-gray-500 font-medium px-3 py-3">Profil</th>
                        <th className="text-left text-gray-500 font-medium px-3 py-3 hidden md:table-cell">Inscrit le</th>
                        <th className="text-center text-gray-500 font-medium px-3 py-3">Mails</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inscrits.map((i, idx) => (
                        <tr key={idx} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                          <td className="px-5 py-3 text-white font-medium">{i.nom}</td>
                          <td className="px-3 py-3 text-gray-400 hidden sm:table-cell">{i.email}</td>
                          <td className="px-3 py-3 text-gray-400 hidden md:table-cell">{i.telephone || <span className="text-gray-700">—</span>}</td>
                          <td className="px-3 py-3">
                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                              i.profil === "entrepreneur_pro"
                                ? "bg-[#6c63ff]/20 text-[#a78bfa]"
                                : "bg-[#00d4ff]/15 text-[#67e8f9]"
                            }`}>
                              {i.profil === "entrepreneur_pro" ? "Pro" : "Étudiant"}
                            </span>
                          </td>
                          <td className="px-3 py-3 text-gray-500 text-xs hidden md:table-cell">
                            {new Date(i.date).toLocaleDateString("fr-FR")}
                          </td>
                          <td className="px-3 py-3">
                            <div className="flex items-center justify-center gap-1.5">
                              <span title="Confirmation" className={`w-2 h-2 rounded-full ${i.emailConfirmationSent ? "bg-green-400" : "bg-gray-700"}`} />
                              <span title="Rappel J-1" className={`w-2 h-2 rounded-full ${i.emailRappelSent ? "bg-[#00d4ff]" : "bg-gray-700"}`} />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="card-dark rounded-2xl p-5">
              <h2 className="font-bold text-white mb-5 flex items-center gap-2">
                <Settings className="w-4 h-4 text-[#6c63ff]" />
                Modifier la config
              </h2>
              <ConfigForm config={config} />
            </div>

            <div className="card-dark rounded-2xl p-5">
              <h2 className="font-bold text-white mb-5 flex items-center gap-2">
                <Mic className="w-4 h-4 text-[#a78bfa]" />
                Intervenants ({intervenants.length})
              </h2>
              <IntervenantsPanel intervenants={intervenants} />
            </div>

            <div className="card-dark rounded-2xl p-5">
              <h2 className="font-bold text-white mb-5 flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#00d4ff]" />
                Emails
              </h2>
              <EmailPanel stats={stats} hasCallLink={!!config.callLink} hasResend={hasResend} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

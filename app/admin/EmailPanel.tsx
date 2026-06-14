"use client";

import { useState, useTransition } from "react";
import { sendRappelAction, sendConfirmationsAction } from "./actions";
import { Send, Loader2, CheckCircle, AlertCircle, Mail } from "lucide-react";

type Stats = {
  total: number;
  rappelsSent: number;
  confirmationsSent: number;
};

export function EmailPanel({ stats, hasCallLink, hasResend }: { stats: Stats; hasCallLink: boolean; hasResend: boolean }) {
  const [rappelResult, setRappelResult] = useState<{ sent: number; errors: number } | null>(null);
  const [confResult, setConfResult] = useState<{ sent: number; errors: number } | null>(null);
  const [isPendingRappel, startRappel] = useTransition();
  const [isPendingConf, startConf] = useTransition();

  const pendingRappels = stats.total - stats.rappelsSent;
  const pendingConfs = stats.total - stats.confirmationsSent;

  return (
    <div className="space-y-4">
      {!hasResend && (
        <div className="flex items-start gap-3 bg-yellow-500/10 border border-yellow-500/30 rounded-xl px-4 py-3 text-sm text-yellow-400">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <div>
            <strong>Gmail non configuré</strong> — les emails ne seront pas envoyés.
            <br />
            <span className="text-yellow-600">Vérifie <code>GMAIL_USER</code> et <code>GMAIL_APP_PASSWORD</code> dans <code>.env.local</code></span>
          </div>
        </div>
      )}

      {/* Email confirmation */}
      <div className="card-dark rounded-2xl p-5">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Mail className="w-4 h-4 text-[#6c63ff]" />
              <h3 className="font-semibold text-white text-sm">Emails de confirmation</h3>
            </div>
            <p className="text-xs text-gray-500">
              {pendingConfs} inscription(s) sans email de confirmation
            </p>
          </div>
          <span className="text-2xl font-black gradient-text">{stats.confirmationsSent}/{stats.total}</span>
        </div>
        <button
          disabled={isPendingConf || pendingConfs === 0 || !hasResend}
          onClick={() => startConf(async () => {
            const r = await sendConfirmationsAction();
            setConfResult(r);
          })}
          className="btn-primary !py-2 !px-4 !text-sm !rounded-xl flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPendingConf ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
          Envoyer aux {pendingConfs} restant(s)
        </button>
        {confResult && (
          <p className="text-xs mt-2 text-green-400 flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5" />
            {confResult.sent} envoyé(s), {confResult.errors} échec(s)
          </p>
        )}
      </div>

      {/* Rappel J-1 */}
      <div className="card-dark rounded-2xl p-5">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Send className="w-4 h-4 text-[#00d4ff]" />
              <h3 className="font-semibold text-white text-sm">Rappel J-1 avec lien de connexion</h3>
            </div>
            <p className="text-xs text-gray-500">
              {pendingRappels} inscription(s) sans rappel envoyé
              {!hasCallLink && " — ajoute le lien de connexion d'abord"}
            </p>
          </div>
          <span className="text-2xl font-black gradient-text">{stats.rappelsSent}/{stats.total}</span>
        </div>
        <button
          disabled={isPendingRappel || pendingRappels === 0 || !hasCallLink || !hasResend}
          onClick={() => startRappel(async () => {
            const r = await sendRappelAction();
            setRappelResult(r);
          })}
          className="btn-primary !py-2 !px-4 !text-sm !rounded-xl flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPendingRappel ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
          Envoyer le rappel à {pendingRappels} inscrit(s)
        </button>
        {rappelResult && (
          <p className="text-xs mt-2 text-green-400 flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5" />
            {rappelResult.sent} envoyé(s), {rappelResult.errors} échec(s)
          </p>
        )}
      </div>
    </div>
  );
}

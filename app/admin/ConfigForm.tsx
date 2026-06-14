"use client";

import { useActionState } from "react";
import { updateConfigAction } from "./actions";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import type { WebinarConfig } from "../lib/config";

const initial: { success?: boolean; error?: string } = {};

export function ConfigForm({ config }: { config: WebinarConfig }) {
  const [state, action, pending] = useActionState(updateConfigAction, initial);

  const localDate = config.date
    ? new Date(config.date).toISOString().slice(0, 16)
    : "";

  return (
    <form action={action} className="space-y-5">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">Titre du webinaire</label>
        <input
          type="text"
          name="title"
          defaultValue={config.title}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#6c63ff] transition-colors"
        />
      </div>

      {/* Date */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">
          Date & heure du webinaire <span className="text-red-400">*</span>
        </label>
        <input
          type="datetime-local"
          name="date"
          required
          defaultValue={localDate}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#6c63ff] transition-colors"
        />
        <p className="text-xs text-gray-600 mt-1">Heure locale (Brazzaville GMT+1)</p>
      </div>

      {/* Call Link */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">
          🔗 Lien de connexion (Zoom / Meet / YouTube Live)
        </label>
        <input
          type="url"
          name="callLink"
          defaultValue={config.callLink}
          placeholder="https://zoom.us/j/..."
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#6c63ff] transition-colors"
        />
        <p className="text-xs text-gray-600 mt-1">Ce lien sera inclus dans les emails de rappel J-1</p>
      </div>

      {/* WhatsApp Group */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">
          💬 Lien du groupe WhatsApp participants
        </label>
        <input
          type="url"
          name="whatsappGroupLink"
          defaultValue={config.whatsappGroupLink}
          placeholder="https://chat.whatsapp.com/..."
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#6c63ff] transition-colors"
        />
        <p className="text-xs text-gray-600 mt-1">Les inscrits seront redirigés ici après inscription</p>
      </div>

      {/* Replay Link */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">
          🎬 Lien du replay (après le webinaire)
        </label>
        <input
          type="url"
          name="replayLink"
          defaultValue={config.replayLink}
          placeholder="https://youtube.com/..."
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#6c63ff] transition-colors"
        />
      </div>

      {state?.error && (
        <div className="flex items-center gap-2 text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3 text-sm">
          <AlertCircle className="w-4 h-4" />
          {state.error}
        </div>
      )}
      {state?.success && (
        <div className="flex items-center gap-2 text-green-400 bg-green-400/10 border border-green-400/20 rounded-xl px-4 py-3 text-sm">
          <CheckCircle className="w-4 h-4" />
          Configuration sauvegardée avec succès.
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="btn-primary flex items-center gap-2 !py-3 !px-6 !rounded-xl"
      >
        {pending ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
        Sauvegarder
      </button>
    </form>
  );
}

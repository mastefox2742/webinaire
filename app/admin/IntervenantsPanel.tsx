"use client";

import { useState, useActionState, useTransition, useRef } from "react";
import { saveIntervenantAction, deleteIntervenantAction } from "./intervenants-actions";
import { Plus, Pencil, Trash2, X, Loader2, Upload, UserCircle } from "lucide-react";
import type { Intervenant } from "../lib/intervenants";
import Image from "next/image";

type FormState = { error?: string; success?: boolean };
const initial: FormState = {};

function IntervenantForm({
  existing,
  onClose,
}: {
  existing?: Intervenant;
  onClose: () => void;
}) {
  const [state, action, pending] = useActionState(saveIntervenantAction, initial);
  const [photoUrl, setPhotoUrl] = useState(existing?.photo ?? "");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  // Close on success
  if (state.success) { onClose(); return null; }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError("");
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok || !data.url) {
        setUploadError(data.error ?? "Impossible d'ajouter cette photo.");
        return;
      }
      setPhotoUrl(data.url);
    } catch {
      setUploadError("Impossible d'ajouter cette photo.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="card-dark rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <h3 className="font-bold text-white">{existing ? "Modifier" : "Ajouter"} un intervenant</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form action={action} className="p-6 space-y-4">
          <input type="hidden" name="id" value={existing?.id ?? ""} />
          <input type="hidden" name="photo" value={photoUrl} />

          {/* Photo */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Photo</label>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-2xl overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                {photoUrl ? (
                  <Image src={photoUrl} alt="photo" width={80} height={80} className="w-full h-full object-cover" />
                ) : (
                  <UserCircle className="w-10 h-10 text-gray-600" />
                )}
              </div>
              <div className="flex-1">
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  disabled={uploading}
                  className="flex items-center gap-2 text-sm border border-white/10 bg-white/5 hover:bg-white/10 text-gray-300 px-4 py-2 rounded-xl transition-colors disabled:opacity-50"
                >
                  {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  {uploading ? "Envoi…" : "Choisir une photo"}
                </button>
                {photoUrl && (
                  <button type="button" onClick={() => setPhotoUrl("")} className="mt-1 text-xs text-red-400 hover:text-red-300 block">
                    Supprimer la photo
                  </button>
                )}
                <p className="mt-2 text-xs text-gray-500">JPG, PNG ou WebP · 650 Ko maximum</p>
                {uploadError && <p className="mt-1 text-xs text-red-400">{uploadError}</p>}
              </div>
            </div>
          </div>

          {/* Nom */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Nom complet <span className="text-red-400">*</span>
            </label>
            <input
              type="text" name="nom" required defaultValue={existing?.nom ?? ""}
              placeholder="Ex. : Marie Ngoma"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#6c63ff] transition-colors"
            />
          </div>

          {/* Titre */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Titre / Rôle <span className="text-red-400">*</span>
            </label>
            <input
              type="text" name="titre" required defaultValue={existing?.titre ?? ""}
              placeholder="Ex. : Directrice Innovation — Groupe Alpha"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#6c63ff] transition-colors"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Bio</label>
            <textarea
              name="bio" rows={4} defaultValue={existing?.bio ?? ""}
              placeholder="Présentation en 2-3 phrases…"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#6c63ff] transition-colors resize-none"
            />
          </div>

          {/* Badges */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Badges / Stats
              <span className="text-gray-600 text-xs ml-2">(1 par ligne)</span>
            </label>
            <textarea
              name="badges" rows={3} defaultValue={existing?.badges.join("\n") ?? ""}
              placeholder={"500+ accompagnés\n5 ans d'expérience\nFormateur IA"}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#6c63ff] transition-colors resize-none font-mono text-sm"
            />
          </div>

          {state?.error && (
            <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">{state.error}</p>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="submit" disabled={pending || uploading}
              className="btn-primary flex items-center gap-2 !py-3 !px-5 !rounded-xl flex-1 justify-center disabled:opacity-60"
            >
              {pending ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              {existing ? "Mettre à jour" : "Ajouter"}
            </button>
            <button type="button" onClick={onClose} className="px-5 py-3 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-colors">
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function IntervenantsPanel({ intervenants: initial }: { intervenants: Intervenant[] }) {
  const [list, setList] = useState(initial);
  const [editing, setEditing] = useState<Intervenant | "new" | null>(null);
  const [deleting, startDelete] = useTransition();

  async function handleDelete(id: string) {
    if (!confirm("Supprimer cet intervenant ?")) return;
    startDelete(async () => {
      await deleteIntervenantAction(id);
      setList((prev) => prev.filter((i) => i.id !== id));
    });
  }

  function handleClose() {
    setEditing(null);
    // Reload list via soft navigation
    window.location.reload();
  }

  return (
    <div>
      <div className="space-y-3 mb-4">
        {list.length === 0 && (
          <p className="text-gray-600 text-sm text-center py-6">Aucun intervenant. Ajoute-en un.</p>
        )}
        {list.map((p) => (
          <div key={p.id} className="flex items-center gap-3 bg-white/3 border border-white/8 rounded-xl p-3">
            {/* Avatar */}
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-white/5 flex-shrink-0 flex items-center justify-center">
              {p.photo ? (
                <Image src={p.photo} alt={p.nom} width={48} height={48} className="w-full h-full object-cover" />
              ) : (
                <span className="gradient-text font-black text-sm">
                  {p.nom.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-white text-sm truncate">{p.nom}</p>
              <p className="text-gray-500 text-xs truncate">{p.titre}</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => setEditing(p)}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#6c63ff]/20 flex items-center justify-center text-gray-400 hover:text-[#6c63ff] transition-colors"
              >
                <Pencil className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleDelete(p.id)}
                disabled={deleting}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-red-500/20 flex items-center justify-center text-gray-400 hover:text-red-400 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => setEditing("new")}
        className="w-full flex items-center justify-center gap-2 border border-dashed border-white/15 hover:border-[#6c63ff]/50 text-gray-500 hover:text-gray-300 rounded-xl py-3 text-sm transition-colors"
      >
        <Plus className="w-4 h-4" />
        Ajouter un intervenant
      </button>

      {editing !== null && (
        <IntervenantForm
          existing={editing === "new" ? undefined : editing}
          onClose={handleClose}
        />
      )}
    </div>
  );
}

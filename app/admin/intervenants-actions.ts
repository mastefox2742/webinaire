"use server";

import { isAuthenticated } from "./actions";
import { getIntervenants, saveIntervenants, type Intervenant } from "../lib/intervenants";
import { randomUUID } from "crypto";

export async function saveIntervenantAction(
  _prev: { error?: string; success?: boolean },
  formData: FormData
): Promise<{ error?: string; success?: boolean }> {
  if (!(await isAuthenticated())) return { error: "Non autorisé." };

  const id = String(formData.get("id") ?? "").trim() || randomUUID();
  const nom = String(formData.get("nom") ?? "").trim();
  const titre = String(formData.get("titre") ?? "").trim();
  const bio = String(formData.get("bio") ?? "").trim();
  const photo = String(formData.get("photo") ?? "").trim();
  const badgesRaw = String(formData.get("badges") ?? "").trim();
  const badges = badgesRaw.split("\n").map((b) => b.trim()).filter(Boolean);

  if (!nom || !titre) return { error: "Nom et titre obligatoires." };

  const list = await getIntervenants();
  const idx = list.findIndex((i) => i.id === id);
  const entry: Intervenant = { id, nom, titre, bio, photo, badges };

  if (idx >= 0) list[idx] = entry;
  else list.push(entry);

  await saveIntervenants(list);
  return { success: true };
}

export async function deleteIntervenantAction(id: string): Promise<void> {
  if (!(await isAuthenticated())) return;
  const list = (await getIntervenants()).filter((i) => i.id !== id);
  await saveIntervenants(list);
}

export async function getIntervenantsAction(): Promise<Intervenant[]> {
  if (!(await isAuthenticated())) return [];
  return getIntervenants();
}

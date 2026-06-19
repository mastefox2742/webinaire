"use server";

import { addInscrit, getInscrits } from "./lib/inscrits";
import { getConfig } from "./lib/config";
import { sendConfirmationEmail } from "./lib/email";

export type InscriptionState =
  | { status: "idle" }
  | { status: "success"; message: string; whatsappLink: string }
  | { status: "error"; message: string };

export async function inscrire(
  prevState: InscriptionState,
  formData: FormData
): Promise<InscriptionState> {
  const nom = String(formData.get("nom") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const telephone = String(formData.get("telephone") ?? "").trim();
  const profil = String(formData.get("profil") ?? "").trim();

  if (!nom || !email || !profil) {
    return { status: "error", message: "Merci de remplir tous les champs obligatoires." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { status: "error", message: "Adresse email invalide." };
  }

  const existing = await getInscrits();
  if (existing.some((i) => i.email.toLowerCase() === email.toLowerCase())) {
    return { status: "error", message: "Cette adresse email est déjà inscrite." };
  }

  try {
    await addInscrit({ nom, email, telephone, profil, date: new Date().toISOString() });
  } catch (err) {
    console.error("[inscription] addInscrit failed:", err);
    return { status: "error", message: "Erreur lors de l'enregistrement. Réessaie dans quelques instants." };
  }

  const config = await getConfig();

  // Email de confirmation (best-effort)
  try {
    await sendConfirmationEmail(
      { nom, email, telephone, profil, date: new Date().toISOString(), emailConfirmationSent: false, emailRappelSent: false },
      config
    );
  } catch {}

  return {
    status: "success",
    message: `Félicitations ${nom} ! Ta place est réservée. Un email de confirmation arrive dans ta boîte.`,
    whatsappLink: config.whatsappGroupLink,
  };
}

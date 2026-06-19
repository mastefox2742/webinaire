"use server";

import {
  addInscrit,
  getInscrits,
  markEmailConfirmationSent,
  type Inscrit,
} from "./lib/inscrits";
import { getConfig } from "./lib/config";
import { sendConfirmationEmail } from "./lib/email";
import { sendInscriptionToN8n } from "./lib/n8n";

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

  let existing: Inscrit[];
  try {
    existing = await getInscrits();
  } catch (err) {
    console.error("[inscription] getInscrits failed:", err);
    return {
      status: "error",
      message: "Le service d'inscription est momentanément indisponible. Réessaie dans quelques instants.",
    };
  }

  if (existing.some((i) => i.email.toLowerCase() === email.toLowerCase())) {
    return { status: "error", message: "Cette adresse email est déjà inscrite." };
  }

  const inscrit: Inscrit = {
    nom,
    email,
    telephone,
    profil,
    date: new Date().toISOString(),
    emailConfirmationSent: false,
    emailRappelSent: false,
  };

  try {
    await addInscrit(inscrit);
  } catch (err) {
    const msg = err instanceof Error ? err.message + " | " + err.stack : String(err);
    console.error("[inscription] addInscrit failed: " + msg);
    return { status: "error", message: "Erreur lors de l'enregistrement. Réessaie dans quelques instants." };
  }

  const config = await getConfig();

  let confirmationSent = false;
  try {
    confirmationSent = await sendInscriptionToN8n(inscrit, config);

    if (!confirmationSent) {
      confirmationSent = await sendConfirmationEmail(inscrit, config);
    }

    if (confirmationSent) await markEmailConfirmationSent(email);
  } catch (err) {
    console.error("[inscription] confirmation email failed:", err);
  }

  return {
    status: "success",
    message: confirmationSent
      ? `Félicitations ${nom} ! Ta place est réservée. Un email de confirmation arrive dans ta boîte.`
      : `Félicitations ${nom} ! Ta place est réservée. L'email de confirmation te sera envoyé prochainement.`,
    whatsappLink: config.whatsappGroupLink,
  };
}

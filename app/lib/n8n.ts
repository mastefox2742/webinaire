import type { WebinarConfig } from "./config";
import type { Inscrit } from "./inscrits";

const WEBHOOK_TIMEOUT_MS = 10_000;

export async function sendInscriptionToN8n(
  inscrit: Inscrit,
  config: WebinarConfig
): Promise<boolean> {
  const webhookUrl = process.env.N8N_INSCRIPTION_WEBHOOK_URL;
  const webhookSecret = process.env.N8N_WEBHOOK_SECRET;

  if (!webhookUrl || !webhookSecret) {
    console.warn(
      "[n8n] N8N_INSCRIPTION_WEBHOOK_URL ou N8N_WEBHOOK_SECRET manquant."
    );
    return false;
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${webhookSecret}`,
    },
    body: JSON.stringify({
      event: "inscription.created",
      inscrit: {
        nom: inscrit.nom,
        email: inscrit.email,
        telephone: inscrit.telephone,
        profil: inscrit.profil,
        date: inscrit.date,
      },
      webinaire: {
        title: config.title,
        date: config.date,
        callLink: config.callLink,
        whatsappGroupLink: config.whatsappGroupLink,
      },
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error(`Le webhook n8n a répondu avec le statut ${response.status}.`);
  }

  return true;
}

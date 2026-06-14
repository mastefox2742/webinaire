"use server";

import { cookies } from "next/headers";
import crypto from "crypto";
import { getConfig, saveConfig, type WebinarConfig } from "../lib/config";
import { getInscrits, saveInscrits } from "../lib/inscrits";
import { sendRappelEmail, sendConfirmationEmail } from "../lib/email";

const SESSION_COOKIE = "ga_admin_session";
const SESSION_VALUE = "authenticated";

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password + "ga_salt_2026").digest("hex");
}

function getAdminPasswordHash(): string {
  const raw = process.env.ADMIN_PASSWORD ?? "admin123";
  return hashPassword(raw);
}

export async function loginAction(
  _prev: { error?: string; success?: boolean },
  formData: FormData
): Promise<{ error?: string; success?: boolean }> {
  const password = String(formData.get("password") ?? "");
  if (hashPassword(password) !== getAdminPasswordHash()) {
    return { error: "Mot de passe incorrect." };
  }
  const jar = await cookies();
  jar.set(SESSION_COOKIE, SESSION_VALUE, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 8, // 8h
    path: "/admin",
  });
  return { success: true };
}

export async function logoutAction(): Promise<void> {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
}

export async function isAuthenticated(): Promise<boolean> {
  const jar = await cookies();
  return jar.get(SESSION_COOKIE)?.value === SESSION_VALUE;
}

export async function updateConfigAction(
  _prev: { success?: boolean; error?: string },
  formData: FormData
): Promise<{ success?: boolean; error?: string }> {
  if (!(await isAuthenticated())) return { error: "Non autorisé." };

  const date = String(formData.get("date") ?? "").trim();
  const callLink = String(formData.get("callLink") ?? "").trim();
  const replayLink = String(formData.get("replayLink") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const whatsappGroupLink = String(formData.get("whatsappGroupLink") ?? "").trim();

  if (!date) return { error: "La date est obligatoire." };

  saveConfig({ date, callLink, replayLink, title, whatsappGroupLink });
  return { success: true };
}

export async function sendRappelAction(): Promise<{ sent: number; errors: number }> {
  if (!(await isAuthenticated())) return { sent: 0, errors: 0 };

  const config = getConfig();
  if (!config.callLink) return { sent: 0, errors: 0 };

  const inscrits = getInscrits();
  let sent = 0;
  let errors = 0;

  for (const inscrit of inscrits) {
    if (inscrit.emailRappelSent) continue;
    const ok = await sendRappelEmail(inscrit, config);
    if (ok) {
      inscrit.emailRappelSent = true;
      sent++;
    } else {
      errors++;
    }
  }

  saveInscrits(inscrits);
  return { sent, errors };
}

export async function sendConfirmationsAction(): Promise<{ sent: number; errors: number }> {
  if (!(await isAuthenticated())) return { sent: 0, errors: 0 };

  const config = getConfig();
  const inscrits = getInscrits();
  let sent = 0;
  let errors = 0;

  for (const inscrit of inscrits) {
    if (inscrit.emailConfirmationSent) continue;
    const ok = await sendConfirmationEmail(inscrit, config);
    if (ok) {
      inscrit.emailConfirmationSent = true;
      sent++;
    } else {
      errors++;
    }
  }

  saveInscrits(inscrits);
  return { sent, errors };
}

export async function getAdminData() {
  if (!(await isAuthenticated())) return null;
  const config = getConfig();
  const inscrits = getInscrits();
  const entrepreneurs = inscrits.filter((i) => i.profil === "entrepreneur_pro").length;
  const etudiants = inscrits.filter((i) => i.profil === "lyceen_etudiant").length;
  const rappelsSent = inscrits.filter((i) => i.emailRappelSent).length;
  const confirmationsSent = inscrits.filter((i) => i.emailConfirmationSent).length;
  return { config, inscrits, stats: { total: inscrits.length, entrepreneurs, etudiants, rappelsSent, confirmationsSent } };
}

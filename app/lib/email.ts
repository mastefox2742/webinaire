import nodemailer from "nodemailer";
import type { WebinarConfig } from "./config";
import type { Inscrit } from "./inscrits";

function getTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) return null;
  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}

const FROM = process.env.EMAIL_FROM ?? "Alpha Tech <zlatobambi@gmail.com>";

const TZ = "Africa/Brazzaville";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: TZ,
  });
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit", timeZone: TZ });
}

export async function sendConfirmationEmail(inscrit: Inscrit, config: WebinarConfig): Promise<boolean> {
  const transporter = getTransporter();
  if (!transporter) return false;

  const date = formatDate(config.date);
  const time = formatTime(config.date);

  const html = `
<!DOCTYPE html><html lang="fr">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:#06060e;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#06060e;padding:40px 20px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#0f0f1a;border:1px solid rgba(108,99,255,0.3);border-radius:16px;overflow:hidden;max-width:600px;">
  <tr><td style="background:linear-gradient(135deg,#6c63ff,#00d4ff);padding:32px 40px;text-align:center;">
    <img src="https://webinaire-ia-subir-piloter.vercel.app/IMG-20260502-WA0007.jpg" width="180" alt="Alpha Tech" style="display:block;margin:0 auto 8px;max-width:180px;height:auto;border-radius:8px;" />
    <p style="color:#fff;margin:8px 0 0;font-size:13px;font-weight:700;letter-spacing:2px;">ALPHA TECH</p>
  </td></tr>
  <tr><td style="padding:40px;">
    <h1 style="color:#fff;font-size:24px;margin:0 0 8px;">🎉 Ta place est confirmée, ${inscrit.nom} !</h1>
    <p style="color:#a0a0b0;margin:0 0 24px;line-height:1.6;">Votre inscription au webinaire gratuit d'Alpha Tech est bien enregistrée.</p>
    <div style="background:rgba(108,99,255,0.1);border:1px solid rgba(108,99,255,0.3);border-radius:12px;padding:20px;margin-bottom:24px;">
      <p style="color:#6c63ff;font-weight:700;font-size:14px;margin:0 0 12px;text-transform:uppercase;letter-spacing:1px;">Détails du webinaire</p>
      <p style="color:#fff;font-size:20px;font-weight:900;margin:0 0 8px;">${config.title}</p>
      <p style="color:#a0a0b0;margin:4px 0;">📅 ${date}</p>
      <p style="color:#a0a0b0;margin:4px 0;">🕙 ${time} (heure de Brazzaville)</p>
      <p style="color:#a0a0b0;margin:4px 0;">💻 100% en ligne · Gratuit</p>
    </div>
    ${config.callLink ? `
    <div style="background:rgba(0,212,255,0.08);border:1px solid rgba(0,212,255,0.3);border-radius:12px;padding:20px;margin-bottom:24px;text-align:center;">
      <p style="color:#00d4ff;font-weight:700;margin:0 0 12px;">🔗 Ton lien de connexion</p>
      <a href="${config.callLink}" style="background:linear-gradient(135deg,#6c63ff,#00d4ff);color:#fff;text-decoration:none;padding:12px 28px;border-radius:50px;font-weight:700;display:inline-block;">Rejoindre le webinaire →</a>
      <p style="color:#666;font-size:12px;margin:12px 0 0;">${config.callLink}</p>
    </div>` : `
    <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:20px;margin-bottom:24px;">
      <p style="color:#a0a0b0;margin:0;text-align:center;">📩 Le lien de connexion te sera envoyé par email la veille du webinaire.</p>
    </div>`}
    <p style="color:#a0a0b0;line-height:1.6;">En attendant, ajoute cet événement à ton agenda et partage l'info autour de toi !</p>
  </td></tr>
  <tr><td style="border-top:1px solid rgba(255,255,255,0.05);padding:24px 40px;text-align:center;">
    <p style="color:#555;font-size:12px;margin:0;">© ${new Date().getFullYear()} Alpha Tech · Brazzaville, République du Congo</p>
  </td></tr>
</table>
</td></tr>
</table>
</body></html>`;

  try {
    await transporter.sendMail({ from: FROM, to: inscrit.email, replyTo: process.env.GMAIL_USER, subject: `Confirmation de votre inscription — ${config.title}`, html });
    return true;
  } catch {
    return false;
  }
}

export async function sendRappelEmail(inscrit: Inscrit, config: WebinarConfig): Promise<boolean> {
  const transporter = getTransporter();
  if (!transporter || !config.callLink) return false;

  const time = formatTime(config.date);
  const date = formatDate(config.date);

  const html = `
<!DOCTYPE html><html lang="fr">
<head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#06060e;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#06060e;padding:40px 20px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#0f0f1a;border:1px solid rgba(108,99,255,0.3);border-radius:16px;overflow:hidden;max-width:600px;">
  <tr><td style="background:linear-gradient(135deg,#6c63ff,#00d4ff);padding:24px 40px;text-align:center;">
    <img src="https://webinaire-ia-subir-piloter.vercel.app/IMG-20260502-WA0007.jpg" width="180" alt="Alpha Tech" style="display:block;margin:0 auto;max-width:180px;height:auto;border-radius:8px;" />
  </td></tr>
  <tr><td style="padding:40px;">
    <p style="background:#ff6b35;color:#fff;font-weight:700;border-radius:50px;padding:6px 16px;display:inline-block;font-size:13px;margin:0 0 16px;">⏰ C'est demain !</p>
    <h1 style="color:#fff;font-size:24px;margin:0 0 8px;">Rappel — Le webinaire est demain</h1>
    <p style="color:#a0a0b0;margin:0 0 24px;">Bonjour ${inscrit.nom}, le webinaire <strong style="color:#fff;">${config.title}</strong> commence demain le <strong style="color:#fff;">${date}</strong> à <strong style="color:#fff;">${time}</strong>.</p>
    <div style="background:rgba(0,212,255,0.1);border:1px solid rgba(0,212,255,0.4);border-radius:12px;padding:24px;text-align:center;margin-bottom:24px;">
      <p style="color:#00d4ff;font-weight:700;font-size:16px;margin:0 0 16px;">🔗 Ton lien de connexion</p>
      <a href="${config.callLink}" style="background:linear-gradient(135deg,#6c63ff,#00d4ff);color:#fff;text-decoration:none;padding:14px 32px;border-radius:50px;font-weight:700;display:inline-block;font-size:16px;">Rejoindre le webinaire →</a>
      <p style="color:#555;font-size:12px;margin:12px 0 0;">${config.callLink}</p>
    </div>
    <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:16px;">
      <p style="color:#a0a0b0;margin:0;font-size:14px;">
        ✅ Prépare ton smartphone ou ordinateur<br/>
        ✅ Assure-toi d'avoir une bonne connexion internet<br/>
        ✅ Sois là 5 minutes avant le début
      </p>
    </div>
  </td></tr>
  <tr><td style="border-top:1px solid rgba(255,255,255,0.05);padding:20px 40px;text-align:center;">
    <p style="color:#555;font-size:12px;margin:0;">© ${new Date().getFullYear()} Alpha Tech · Brazzaville</p>
  </td></tr>
</table>
</td></tr>
</table>
</body></html>`;

  try {
    await transporter.sendMail({ from: FROM, to: inscrit.email, subject: `⏰ Rappel J-1 — ${config.title} démarre demain à ${time}`, html });
    return true;
  } catch {
    return false;
  }
}

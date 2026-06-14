import { getDb } from "./firebase";

export type WebinarConfig = {
  date: string;
  callLink: string;
  title: string;
  replayLink: string;
  whatsappGroupLink: string;
};

const DEFAULTS: WebinarConfig = {
  date: "2026-08-29T19:30:00+01:00",
  callLink: "",
  title: 'Webinaire IA "Subir ou Piloter ?"',
  replayLink: "",
  whatsappGroupLink: "",
};

const DOC = "webinaire/config";

export async function getConfig(): Promise<WebinarConfig> {
  try {
    const db = getDb();
    const snap = await db.doc(DOC).get();
    if (snap.exists) return { ...DEFAULTS, ...(snap.data() as Partial<WebinarConfig>) };
  } catch {}
  return { ...DEFAULTS };
}

export async function saveConfig(config: Partial<WebinarConfig>): Promise<WebinarConfig> {
  const current = await getConfig();
  const updated = { ...current, ...config };
  const db = getDb();
  await db.doc(DOC).set(updated);
  return updated;
}

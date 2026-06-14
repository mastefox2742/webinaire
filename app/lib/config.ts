import { unstable_cache, revalidateTag } from "next/cache";
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

const fetchConfig = unstable_cache(
  async (): Promise<WebinarConfig> => {
    try {
      const db = getDb();
      const snap = await db.doc(DOC).get();
      if (snap.exists) return { ...DEFAULTS, ...(snap.data() as Partial<WebinarConfig>) };
    } catch {}
    return { ...DEFAULTS };
  },
  ["webinar-config"],
  { revalidate: 60, tags: ["config"] }
);

export async function getConfig(): Promise<WebinarConfig> {
  return fetchConfig();
}

export async function saveConfig(config: Partial<WebinarConfig>): Promise<WebinarConfig> {
  const current = await getConfig();
  const updated = { ...current, ...config };
  const db = getDb();
  await db.doc(DOC).set(updated);
  revalidateTag("config", "seconds");
  return updated;
}

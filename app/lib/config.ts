import fs from "fs";
import path from "path";

export type WebinarConfig = {
  date: string;
  callLink: string;
  title: string;
  replayLink: string;
  whatsappGroupLink: string;
};

const CONFIG_PATH = path.join(process.cwd(), "data", "config.json");

const DEFAULTS: WebinarConfig = {
  date: "2026-08-29T19:30:00+01:00",
  callLink: "",
  title: 'Webinaire IA "Subir ou Piloter ?"',
  replayLink: "",
  whatsappGroupLink: "",
};

export function getConfig(): WebinarConfig {
  try {
    if (fs.existsSync(CONFIG_PATH)) {
      const raw = fs.readFileSync(CONFIG_PATH, "utf-8");
      return { ...DEFAULTS, ...JSON.parse(raw) };
    }
  } catch {}
  return { ...DEFAULTS };
}

export function saveConfig(config: Partial<WebinarConfig>): WebinarConfig {
  const current = getConfig();
  const updated = { ...current, ...config };
  const dir = path.dirname(CONFIG_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(updated, null, 2));
  return updated;
}

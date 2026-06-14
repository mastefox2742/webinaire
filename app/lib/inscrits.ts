import fs from "fs";
import path from "path";

export type Inscrit = {
  nom: string;
  email: string;
  telephone: string;
  profil: string;
  date: string;
  emailConfirmationSent?: boolean;
  emailRappelSent?: boolean;
};

const FILE = path.join(process.cwd(), "data", "inscrits.json");

export function getInscrits(): Inscrit[] {
  try {
    if (fs.existsSync(FILE)) {
      return JSON.parse(fs.readFileSync(FILE, "utf-8"));
    }
  } catch {}
  return [];
}

export function saveInscrits(inscrits: Inscrit[]): void {
  const dir = path.dirname(FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(FILE, JSON.stringify(inscrits, null, 2));
}

export function addInscrit(entry: Omit<Inscrit, "emailConfirmationSent" | "emailRappelSent">): void {
  const inscrits = getInscrits();
  inscrits.push({ ...entry, emailConfirmationSent: false, emailRappelSent: false });
  saveInscrits(inscrits);
}

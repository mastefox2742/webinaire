import fs from "fs";
import path from "path";

export type Intervenant = {
  id: string;
  nom: string;
  titre: string;
  bio: string;
  photo: string; // chemin public ex: /uploads/intervenants/xxx.jpg
  badges: string[]; // ["500+ accompagnés", "Formateur IA"]
};

const FILE = path.join(process.cwd(), "data", "intervenants.json");

const DEFAULT: Intervenant[] = [
  {
    id: "zlat-obambi",
    nom: "Zlat OBAMBI",
    titre: "Fondateur — Groupe Alpha",
    bio: "Entrepreneur technologique basé à Brazzaville, spécialisé en transformation digitale et intelligence artificielle appliquée aux marchés africains. Fondateur d'Alpha-tech, il forme et accompagne les entrepreneurs et étudiants congolais à tirer parti des outils numériques et de l'IA pour créer de la valeur.",
    photo: "",
    badges: ["500+ accompagnés", "5 ans d'expérience", "Formateur IA"],
  },
];

export function getIntervenants(): Intervenant[] {
  try {
    if (fs.existsSync(FILE)) return JSON.parse(fs.readFileSync(FILE, "utf-8"));
  } catch {}
  return [...DEFAULT];
}

export function saveIntervenants(list: Intervenant[]): void {
  const dir = path.dirname(FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(FILE, JSON.stringify(list, null, 2));
}

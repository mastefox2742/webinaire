import { unstable_cache, revalidateTag } from "next/cache";
import { getDb } from "./firebase";

export type Intervenant = {
  id: string;
  nom: string;
  titre: string;
  bio: string;
  photo: string;
  badges: string[];
};

const COL = "intervenants";

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

const fetchIntervenants = unstable_cache(
  async (): Promise<Intervenant[]> => {
    try {
      const db = getDb();
      const snap = await db.collection(COL).get();
      if (snap.empty) return [...DEFAULT];
      return snap.docs.map((d) => d.data() as Intervenant);
    } catch {
      return [...DEFAULT];
    }
  },
  ["intervenants"],
  { revalidate: 60, tags: ["intervenants"] }
);

export async function getIntervenants(): Promise<Intervenant[]> {
  return fetchIntervenants();
}

export async function saveIntervenants(list: Intervenant[]): Promise<void> {
  const db = getDb();
  const batch = db.batch();
  const existing = await db.collection(COL).get();
  existing.docs.forEach((d) => batch.delete(d.ref));
  list.forEach((item) => {
    batch.set(db.collection(COL).doc(item.id), item);
  });
  await batch.commit();
  revalidateTag("intervenants", "seconds");
}

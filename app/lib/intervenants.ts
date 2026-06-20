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
    id: "fresneil-miche-mboni",
    nom: "Fresneil Miche M’BONI",
    titre: "Intervenant",
    photo: "",
    bio: "",
    badges: [],
  },
  {
    id: "abraham-filankembo",
    nom: "Abraham FILANKEMBO",
    titre: "Intervenant",
    photo: "",
    bio: "",
    badges: [],
  },
  {
    id: "stefane-rynaldi-hakoula",
    nom: "Stéfane Rynaldi HAKOULA",
    titre: "Intervenant",
    photo: "",
    bio: "",
    badges: [],
  },
  {
    id: "jobert-pion",
    nom: "Jobert PION",
    titre: "Intervenant",
    photo: "",
    bio: "",
    badges: [],
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

import { getDb } from "./firebase";

export type Inscrit = {
  nom: string;
  email: string;
  telephone: string;
  profil: string;
  date: string;
  emailConfirmationSent?: boolean;
  emailRappelSent?: boolean;
};

const COL = "inscrits";

export async function getInscrits(): Promise<Inscrit[]> {
  try {
    const db = getDb();
    const snap = await db.collection(COL).get();
    const docs = snap.docs.map((d) => d.data() as Inscrit);
    return docs.sort((a, b) => a.date.localeCompare(b.date));
  } catch {
    return [];
  }
}

export async function saveInscrits(inscrits: Inscrit[]): Promise<void> {
  const db = getDb();
  const batch = db.batch();
  const existing = await db.collection(COL).get();
  existing.docs.forEach((d) => batch.delete(d.ref));
  inscrits.forEach((inscrit) => {
    const ref = db.collection(COL).doc(inscrit.email.toLowerCase().replace(/[^a-z0-9]/g, "_"));
    batch.set(ref, inscrit);
  });
  await batch.commit();
}

export async function addInscrit(entry: Omit<Inscrit, "emailConfirmationSent" | "emailRappelSent">): Promise<void> {
  const db = getDb();
  const docId = entry.email.toLowerCase().replace(/[^a-z0-9]/g, "_");
  await db.collection(COL).doc(docId).set({ ...entry, emailConfirmationSent: false, emailRappelSent: false });
}

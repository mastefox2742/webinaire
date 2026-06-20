import { NextRequest, NextResponse } from "next/server";
import { getStorage } from "firebase-admin/storage";
import { getDb } from "../../lib/firebase";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  const { isAuthenticated } = await import("../../admin/actions");
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "Aucun fichier" }, { status: 400 });

  const allowedTypes: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif",
  };
  const safeExt = allowedTypes[file.type];
  if (!safeExt) {
    return NextResponse.json({ error: "Format non supporté (jpg, png, webp)" }, { status: 400 });
  }

  try {
    getDb(); // ensure Firebase is initialized
    const bucket = getStorage().bucket(`${process.env.FIREBASE_PROJECT_ID}.appspot.com`);
    const filename = `intervenants/${Date.now()}-${crypto.randomUUID()}.${safeExt}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const fileRef = bucket.file(filename);
    await fileRef.save(buffer, {
      metadata: { contentType: file.type },
      public: true,
    });

    const url = `https://storage.googleapis.com/${process.env.FIREBASE_PROJECT_ID}.appspot.com/${filename}`;
    return NextResponse.json({ url });
  } catch (err) {
    console.error("[upload] Firebase Storage error:", err instanceof Error ? err.message : String(err));
    return NextResponse.json({ error: "Erreur lors de l'upload." }, { status: 500 });
  }
}

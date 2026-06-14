import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  const jar = await cookies();
  if (jar.get("ga_admin_session")?.value !== "authenticated") {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "Aucun fichier" }, { status: 400 });

  const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (!allowed.includes(file.type)) {
    return NextResponse.json({ error: "Format non supporté (jpg, png, webp)" }, { status: 400 });
  }

  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const dir = path.join(process.cwd(), "public", "uploads", "intervenants");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(path.join(dir, filename), buffer);

  return NextResponse.json({ url: `/uploads/intervenants/${filename}` });
}

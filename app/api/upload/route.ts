import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { isAuthenticated } = await import("../../admin/actions");
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "Aucun fichier" }, { status: 400 });

  const MAX_SIZE = 650 * 1024;
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "Photo trop volumineuse (max 650 Ko)" }, { status: 400 });
  }

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

  const buffer = Buffer.from(await file.arrayBuffer());
  const dataUrl = `data:${file.type};base64,${buffer.toString("base64")}`;

  return NextResponse.json({ url: dataUrl });
}

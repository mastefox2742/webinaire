import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getInscrits } from "../../lib/inscrits";

export async function GET() {
  const jar = await cookies();
  if (jar.get("ga_admin_session")?.value !== "authenticated") {
    return new NextResponse("Non autorisé", { status: 401 });
  }

  const inscrits = getInscrits();
  const headers = ["Nom", "Email", "Téléphone", "Profil", "Date inscription", "Confirmation envoyée", "Rappel envoyé"];
  const rows = inscrits.map((i) => [
    `"${i.nom}"`,
    `"${i.email}"`,
    `"${i.telephone}"`,
    `"${i.profil === "entrepreneur_pro" ? "Entrepreneur/Pro" : "Lycéen/Étudiant"}"`,
    `"${new Date(i.date).toLocaleString("fr-FR")}"`,
    i.emailConfirmationSent ? "Oui" : "Non",
    i.emailRappelSent ? "Oui" : "Non",
  ]);

  const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  const BOM = "﻿";

  return new NextResponse(BOM + csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="inscrits-webinaire-${Date.now()}.csv"`,
    },
  });
}

import { NextResponse } from "next/server";
import { isAuthenticated } from "../../admin/actions";
import { getInscrits } from "../../lib/inscrits";

function csvSafe(value: string): string {
  const sanitized = value.replace(/^[=+\-@\t]/, "'$&");
  return `"${sanitized.replace(/"/g, '""')}"`;
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return new NextResponse("Non autorisé", { status: 401 });
  }

  const inscrits = getInscrits();
  const headers = ["Nom", "Email", "Téléphone", "Profil", "Date inscription", "Confirmation envoyée", "Rappel envoyé"];
  const rows = inscrits.map((i) => [
    csvSafe(i.nom),
    csvSafe(i.email),
    csvSafe(i.telephone),
    csvSafe(i.profil === "entrepreneur_pro" ? "Entrepreneur/Pro" : "Lycéen/Étudiant"),
    csvSafe(new Date(i.date).toLocaleString("fr-FR")),
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

import { inscrire, type InscriptionState } from "../../actions";

const initialState: InscriptionState = { status: "idle" };

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const result = await inscrire(initialState, formData);

    return Response.json(result, {
      status: result.status === "error" ? 400 : 200,
    });
  } catch (err) {
    console.error("[api/inscription] unexpected failure:", err);
    return Response.json(
      {
        status: "error",
        message: "Le service d'inscription est momentanément indisponible.",
      } satisfies InscriptionState,
      { status: 500 }
    );
  }
}

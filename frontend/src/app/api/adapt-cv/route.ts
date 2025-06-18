import { NextResponse } from "next/server";
import axios from "axios";
import FormData from "form-data";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("cv") as File;
    const jobDescription = formData.get("jobDescription") as string;

    if (!file || !jobDescription) {
      return NextResponse.json(
        { error: "Archivo y descripción requeridos" },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const form = new FormData();
    form.append("cv", buffer, file.name);
    form.append("jobDescription", jobDescription);

    const response = await axios.post(
      `${process.env.EXPRESS_BACKEND_URL}/api/adapt-cv`,
      form,
      {
        headers: form.getHeaders(),
      },
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error al enviar solicitud:", error);
    return NextResponse.json(
      { error: "Error al enviar solicitud" },
      { status: 500 },
    );
  }
}

import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  try {
    const { fileName, contentType } = await request.json();

    const response = await axios.post(`${process.env.EXPRESS_BACKEND_URL}/api/upload-aws`, {
      fileName,
      contentType,
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error al generar URL firmada:", error);
    return NextResponse.json(
      { error: "Error al generar URL de subida" },
      { status: 500 },
    );
  }
}

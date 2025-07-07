import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const CV_OPTIMIZATION_SCHEMA = {
  type: Type.OBJECT,
  required: [
    "summary",
    "matchScore",
    "keywordSuggestions",
    "formatSuggestions",
    "contentSuggestions",
    "experienceSuggestions",
    "finalRecommendation",
  ],
  properties: {
    summary: {
      type: Type.STRING,
      description: "Breve resumen del análisis del CV vs la oferta de empleo",
    },
    matchScore: {
      type: Type.NUMBER,
      description:
        "Puntaje de coincidencia entre 0-100 basado en la adecuación CV-oferta",
    },
    keywordSuggestions: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
        description:
          "Sugerencias relacionadas con palabras clave faltantes o relevantes",
      },
    },
    formatSuggestions: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
        description: "Sugerencias para mejorar el formato y estructura del CV",
      },
    },
    contentSuggestions: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
        description: "Sugerencias para mejorar el contenido relevante del CV",
      },
    },
    experienceSuggestions: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
        description: "Sugerencias específicas sobre la experiencia profesional",
      },
    },
    finalRecommendation: {
      type: Type.STRING,
      description: "Conclusión y recomendaciones generales para mejorar el CV",
    },
    missingSkills: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
        description:
          "Lista de habilidades mencionadas en la oferta que faltan en el CV",
      },
      optional: true,
    },
    strongMatches: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
        description:
          "Lista de habilidades/experiencias que son fuertes coincidencias",
      },
      optional: true,
    },
  },
};

export async function getSuggestions(
  cvText: string,
  jobText: string,
): Promise<{
  summary: string;
  matchScore: number;
  keywordSuggestions: string[];
  formatSuggestions: string[];
  contentSuggestions: string[];
  experienceSuggestions: string[];
  finalRecommendation: string;
  missingSkills?: string[];
  strongMatches?: string[];
}> {
  const prompt = `
### Rol:
Eres un experto en recursos humanos con 10+ años de experiencia en matching de candidatos. Analizarás un CV y una oferta de empleo para proporcionar sugerencias específicas y accionables.

### Instrucciones:
1. Analiza las palabras clave en la oferta y compáralas con el CV.
2. Evalúa el formato y estructura del CV según estándares de la industria.
3. Identifica áreas de experiencia faltantes o débiles según la oferta.
4. Proporciona sugerencias concretas para mejorar el CV sin reescribirlo.
5. Asigna un puntaje de coincidencia (0-100) basado en la adecuación CV-oferta.
6. Usa un tono formal y técnico en las sugerencias.
7. Devuelve SOLAMENTE un JSON válido sin markdown, comentarios o texto adicional.
8. El JSON debe tener exactamente esta estructura:
{
  "summary": string,
  "matchScore": number,
  "keywordSuggestions": string[],
  "formatSuggestions": string[],
  "contentSuggestions": string[],
  "experienceSuggestions": string[],
  "finalRecommendation": string,
  "missingSkills": string[],
  "strongMatches": string[]
}

=== CURRÍCULUM ===
${cvText.substring(0, 5000)}

=== OFERTA DE EMPLEO ===
${jobText.substring(0, 3000)}
`;

  const generationConfig = {
    temperature: 0.3,
    topK: 20,
    topP: 0.95,
    maxOutputTokens: 2000,
  };

  const model = await genAI.models.generateContent({
    model: "gemini-2.0-flash-001",
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    config: generationConfig,
  });

  const response = model.text;
  if (!response) {
    throw new Error("Response from the model is undefined.");
  }

  try {
    // Limpiar la respuesta eliminando markdown y cualquier texto no JSON
    let cleanedResponse = response.trim();

    // Eliminar ```json y ``` si están presentes
    if (cleanedResponse.startsWith("```json")) {
      cleanedResponse = cleanedResponse.slice(7);
    }
    if (cleanedResponse.endsWith("```")) {
      cleanedResponse = cleanedResponse.slice(0, -3);
    }

    // Parsear el JSON limpio
    const parsedResponse = JSON.parse(cleanedResponse);
    return parsedResponse;
  } catch (e) {
    console.error("Raw model response:", response);
    throw new Error(`Failed to parse model response: ${e}`);
  }
}

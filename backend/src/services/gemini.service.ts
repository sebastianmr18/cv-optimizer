import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getSuggestions(
  cvText: string,
  jobText: string,
): Promise<string> {
  const prompt = `
### Rol:
Eres un experto en recursos humanos con 10+ años de experiencia en matching de candidatos. Analizarás un CV y una oferta de empleo para proporcionar sugerencias específicas y accionables.

### Instrucciones:
1. Analiza las palabras clave en la oferta y compáralas con el CV.
2. Evalúa el formato y estructura del CV según estándares de la industria.
3. Identifica áreas de experiencia faltantes o débiles según la oferta.
4. Proporciona sugerencias concretas para mejorar el CV sin reescribirlo.
5. Asigna un puntaje de coincidencia (0-100) basado en la adecuación CV-oferta.
6. Usa un tono formal y tecnico en las sugerencias.

### Formato de Respuesta Esperado (JSON):
\`\`\`markdown
**Resumen**: [Breve resumen del análisis]

**Puntaje de Coincidencia**: [0-100] ⭐

### **Sugerencias de Mejora:**

#### 🔍 **Palabras Clave**
- [Sugerencia 1]
- [Sugerencia 2]
- más si es necesario

#### 📝 **Formato y Estructura**
- [Sugerencia 1]
- [Sugerencia 2]
- más si es necesario

#### 🧠 **Contenido Relevante**
- [Sugerencia 1]
- más si es necesario

#### 💼 **Experiencia**
- [Sugerencia 1]
- más si es necesario

### **Recomendación Final:**
[Conclusión y recomendaciones generales]
\`\`\`

=== CURRÍCULUM ===
${cvText.substring(0, 5000)}

=== OFERTA DE EMPLEO ===
${jobText.substring(0, 3000)}
`;

  const generationConfig = {
    temperature: 0.3,
    topK: 20,
    topP: 0.95,
    maxOutputTokens: 1000,
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
  return response;
}

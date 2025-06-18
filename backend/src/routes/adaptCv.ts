import express, { Request, Response } from "express";
import multer from "multer";
import { parseFile } from "../services/parser.service";
import { getSuggestions } from "../services/gemini.service";
import fs from "fs";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

interface MulterRequest extends Request {
  file: Express.Multer.File;
}

router.post("/", upload.single("cv"), async (req: Request, res: Response) => {
  const jobDescription = req.body.jobDescription;
  const file = req.file;

  if (!file || !jobDescription) {
    if (file) {
      fs.unlink(file.path, (err) => {
        if (err)
          console.error(
            "Error al eliminar archivo temporal después de validación fallida:",
            err,
          );
      });
    }
    res.status(400).json({ error: "Archivo y descripción requeridos" });
    return;
  }

  try {
    const cvText = await parseFile(file.path, file.mimetype);
    const suggestions = await getSuggestions(cvText, jobDescription);

    res.json({ suggestions });
  } catch (error) {
    console.error("Error adaptando CV:", error);
    res.status(500).json({ error: "Error al procesar el CV" });
  } finally {
    if (file) {
      fs.unlink(file.path, (err) => {
        if (err) {
          console.error("Error al eliminar archivo temporal:", err);
        } else {
          console.log(`Archivo temporal ${file.path} eliminado.`);
        }
      });
    }
  }
});

export default router;

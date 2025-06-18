import express, { Request, Response } from "express";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const router = express.Router();

router.post("/", (req: Request, res: Response, next: express.NextFunction) => {
  (async () => {
    try {
      const { fileUrl } = req.body;

      if (!fileUrl) {
        return res.status(400).json({ error: "fileUrl is required" });
      }

      // Extraer bucket y key de la URL
      const url = new URL(fileUrl);
      const bucketName = url.hostname.split(".")[0];
      const key = decodeURIComponent(url.pathname.substring(1)); // Elimina el slash inicial

      const s3Client = new S3Client({
        region: process.env.AWS_REGION,
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
        },
      });

      const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: key,
        ResponseContentDisposition: "inline",
        ResponseContentType: "application/pdf",
      });

      const signedUrl = await getSignedUrl(s3Client, command, {
        expiresIn: 3600,
      });

      return res.json({ signedUrl });
    } catch (error) {
      console.error("Error al generar URL firmada:", error);
      res.status(500).json({ error: "Error al generar URL firmada" });
    }
  })().catch(next);
});

export default router;

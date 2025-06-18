import express, { Request, Response } from "express";
import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";

const router = express.Router();
const MAX_FILE_SIZE = 10485760; // 10 MB

router.post("/", (req: Request, res: Response, next: express.NextFunction) => {
  (async () => {
    try {
      const { fileName, contentType } = req.body;

      if (!fileName || !contentType) {
        return res
          .status(400)
          .json({ error: "fileName y contentType requeridos" });
      }

      const s3Client = new S3Client({
        region: process.env.AWS_REGION,
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
        },
      });

      const post = await createPresignedPost(s3Client, {
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: `uploads/${Date.now()}_${fileName}`,
        Conditions: [["content-length-range", 0, MAX_FILE_SIZE]],
        Fields: {
          acl: "public-read",
        },
        Expires: 600, // 10 minutos
      });

      res.json(post);
    } catch (error) {
      console.error("Error generating presigned post:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  })().catch(next);
});

export default router;

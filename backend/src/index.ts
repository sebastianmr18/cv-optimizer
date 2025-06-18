import express from "express";
const cors = require("cors");
import dotenv from "dotenv";
import adaptCvRouter from "./routes/adaptCv";
import uploadAwsRouter from "./routes/uploadAws";
import generatePresignedUrlRouter from "./routes/generatePresignedUrl";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/adapt-cv", adaptCvRouter);
app.use("/api/upload-aws", uploadAwsRouter);
app.use("/api/generate-presigned-url", generatePresignedUrlRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor backend en http://localhost:${PORT}`);
});

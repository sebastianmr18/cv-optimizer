import request from "supertest";
import express from "express";
import fs from "fs";
import path from "path";
import router from "../src/routes/adaptCv";

jest.mock("../src/services/parser.service", () => ({
  parseFile: jest.fn(),
}));

jest.mock("../src/services/gemini.service", () => ({
  getSuggestions: jest.fn(),
}));

const { parseFile } = require("../src/services/parser.service");
const { getSuggestions } = require("../src/services/gemini.service");

const app = express();
app.use(express.json());
app.use("/adapt-cv", router);

describe("POST /adapt-cv", () => {
  const testFileContent = "test file content";
  const testFilePath = path.join(__dirname, "test-file.pdf");
  let createdFilePath: string;

  beforeEach(() => {
    jest.clearAllMocks();
    // Crear archivo temporal real para los tests
    fs.writeFileSync(testFilePath, testFileContent);
  });

  afterEach(() => {
    // Limpiar archivo temporal después de cada test
    if (fs.existsSync(testFilePath)) {
      fs.unlinkSync(testFilePath);
    }
    // Limpiar cualquier archivo creado por multer
    if (createdFilePath && fs.existsSync(createdFilePath)) {
      fs.unlinkSync(createdFilePath);
    }
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("debería devolver 400 si falta el archivo o la descripción", async () => {
    const response1 = await request(app)
      .post("/adapt-cv")
      .field("jobDescription", "");

    expect(response1.statusCode).toBe(400);
    expect(response1.body.error).toBe("Archivo y descripción requeridos");

    const response2 = await request(app)
      .post("/adapt-cv")
      .attach("cv", testFilePath);

    expect(response2.statusCode).toBe(400);
    expect(response2.body.error).toBe("Archivo y descripción requeridos");
  });

  it("debería procesar el CV y devolver sugerencias", async () => {
    const mockText = "Mocked CV text";
    const mockSuggestions = ["Suggestion 1", "Suggestion 2"];
    const jobDescription = "Test job description";

    (parseFile as jest.Mock).mockImplementation(async (filePath) => {
      createdFilePath = filePath;
      return mockText;
    });
    (getSuggestions as jest.Mock).mockResolvedValue(mockSuggestions);

    const response = await request(app)
      .post("/adapt-cv")
      .field("jobDescription", jobDescription)
      .attach("cv", testFilePath);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ suggestions: mockSuggestions });
    expect(parseFile).toHaveBeenCalled();
    expect(getSuggestions).toHaveBeenCalledWith(mockText, jobDescription);
  });

  it("debería manejar errores durante el procesamiento", async () => {
    const jobDescription = "Test job description";
    const error = new Error("Procesamiento fallido");

    (parseFile as jest.Mock).mockImplementation(async (filePath) => {
      createdFilePath = filePath;
      throw error;
    });

    const response = await request(app)
      .post("/adapt-cv")
      .field("jobDescription", jobDescription)
      .attach("cv", testFilePath);

    expect(response.statusCode).toBe(500);
    expect(response.body.error).toBe("Error al procesar el CV");
  });
});

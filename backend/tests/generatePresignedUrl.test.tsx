import request from 'supertest';
import express from 'express';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import router from "../src/routes/generatePresignedUrl";

// Mock AWS SDK
jest.mock('@aws-sdk/client-s3');
jest.mock('@aws-sdk/s3-request-presigner');

const mockGetSignedUrl = getSignedUrl as jest.MockedFunction<typeof getSignedUrl>;
const mockS3Client = S3Client as jest.MockedClass<typeof S3Client>;

const app = express();
app.use(express.json());
app.use('/generate-presigned-url', router);

describe('POST /generate-presigned-url', () => {
  const validS3Url = 'https://my-bucket.s3.amazonaws.com/path/to/file.pdf';
  const mockSignedUrl = 'https://signed.url/example';

  beforeEach(() => {
    jest.clearAllMocks();
    mockGetSignedUrl.mockResolvedValue(mockSignedUrl);
    process.env.AWS_REGION = 'us-east-1';
    process.env.AWS_ACCESS_KEY_ID = 'test-key';
    process.env.AWS_SECRET_ACCESS_KEY = 'test-secret';
  });

  it('debería devolver 400 si no se proporciona fileUrl', async () => {
    const response = await request(app)
      .post('/generate-presigned-url')
      .send({});

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('fileUrl is required');
  });

  it('debería generar una URL firmada para un archivo S3 válido', async () => {
    const response = await request(app)
      .post('/generate-presigned-url')
      .send({ fileUrl: validS3Url });

    expect(response.status).toBe(200);
    expect(response.body.signedUrl).toBe(mockSignedUrl);
    expect(mockS3Client).toHaveBeenCalledWith({
      region: 'us-east-1',
      credentials: {
        accessKeyId: 'test-key',
        secretAccessKey: 'test-secret'
      }
    });
    expect(mockGetSignedUrl).toHaveBeenCalledWith(
      expect.any(S3Client),
      expect.any(GetObjectCommand),
      { expiresIn: 3600 }
    );
  });

  it('debería manejar URLs S3 inválidas correctamente', async () => {
    const invalidUrls = [
      'not-a-url',
      'not-an-s3-url',
      'another-not-an-s3-url',
    ];

    for (const url of invalidUrls) {
      const response = await request(app)
        .post('/generate-presigned-url')
        .send({ fileUrl: url });

      expect(response.status).toBe(500);
      expect(response.body.error).toBe('Error al generar URL firmada');
    }
  });

  it('debería manejar errores de AWS SDK correctamente', async () => {
    mockGetSignedUrl.mockRejectedValue(new Error('AWS Error'));

    const response = await request(app)
      .post('/generate-presigned-url')
      .send({ fileUrl: validS3Url });

    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Error al generar URL firmada');
  });
});
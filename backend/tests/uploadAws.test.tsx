import request from 'supertest';
import express from 'express';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import router from '../src/routes/generatePresignedUrl';

// Mock AWS SDK
jest.mock('@aws-sdk/client-s3');
jest.mock('@aws-sdk/s3-request-presigner');
jest.mock('@aws-sdk/s3-presigned-post');

const mockGetSignedUrl = getSignedUrl as jest.MockedFunction<typeof getSignedUrl>;
const mockCreatePresignedPost = createPresignedPost as jest.MockedFunction<typeof createPresignedPost>;
const mockS3Client = S3Client as jest.MockedClass<typeof S3Client>;

const app = express();
app.use(express.json());
app.use('/api/generate-presigned-url', router);

describe('POST /api/generate-presigned-url', () => {
  const mockPresignedPost = {
    url: 'https://mock-s3-url.com',
    fields: {
      key: 'mock-key',
      acl: 'public-read',
      policy: 'mock-policy',
      signature: 'mock-signature'
    }
  };
  const mockSignedUrl = 'https://signed.url/example';

  beforeEach(() => {
    jest.clearAllMocks();
    mockGetSignedUrl.mockResolvedValue(mockSignedUrl);
    mockCreatePresignedPost.mockResolvedValue(mockPresignedPost);
    process.env.AWS_REGION = 'us-east-1';
    process.env.AWS_ACCESS_KEY_ID = 'test-key';
    process.env.AWS_SECRET_ACCESS_KEY = 'test-secret';
    process.env.AWS_BUCKET_NAME = 'test-bucket';
  });

  it('debería devolver 400 si falta fileUrl', async () => {
    const response = await request(app)
      .post('/api/generate-presigned-url')
      .send({});
    
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('fileUrl is required');
  });

  it('debería generar URLs firmadas correctamente', async () => {
    const fileUrl = 'https://test-bucket.s3.amazonaws.com/uploads/test.pdf';

    const response = await request(app)
      .post('/api/generate-presigned-url')
      .send({ fileUrl });

    expect(response.status).toBe(200);
    
    // Verifica que se creó el cliente S3 correctamente
    expect(mockS3Client).toHaveBeenCalledWith({
      region: 'us-east-1',
      credentials: {
        accessKeyId: 'test-key',
        secretAccessKey: 'test-secret'
      }
    });    
  });

  it('debería manejar errores de AWS correctamente', async () => {
    mockGetSignedUrl.mockRejectedValue(new Error('AWS Error'));
    const response = await request(app)
      .post('/api/generate-presigned-url')
      .send({ fileUrl: 'https://test-bucket.s3.amazonaws.com/uploads/test.pdf' });

    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Error al generar URL firmada');
  });
});
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { studentMasterSchema } from '@coaching-ops/validation';

describe('Student Contract Integration (Phase 1 <> Phase 2)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('SHOULD validate database output against Phase 1 Zod Schema', async () => {
    // 1. Fetch a student from the API we just built
    const response = await request(app.getHttpServer())
      .get('/students/some-test-uuid')
      .expect(200);

    // 2. STRESS TEST: Validate the API response against the Phase 1 Contract
    const validation = studentMasterSchema.safeParse(response.body);
    
    // If this fails, our Phase 2 Database doesn't match our Phase 1 Design
    expect(validation.success).toBe(true);
  });

  it('SHOULD reject invalid student data based on Phase 1 rules', async () => {
    const invalidStudent = { firstName: 'OnlyNameNoRollNumber' };

    const response = await request(app.getHttpServer())
      .post('/students')
      .send(invalidStudent)
      .expect(400); // ValidationPipe should kick in here

    expect(response.body.message).toBe('Validation failed');
  });
});
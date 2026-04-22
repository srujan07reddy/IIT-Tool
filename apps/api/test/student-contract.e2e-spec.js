"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const request = __importStar(require("supertest"));
const app_module_1 = require("../src/app.module");
const validation_1 = require("@coaching-ops/validation");
describe('Student Contract Integration (Phase 1 <> Phase 2)', () => {
    let app;
    beforeAll(async () => {
        const moduleFixture = await testing_1.Test.createTestingModule({
            imports: [app_module_1.AppModule],
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
        const validation = validation_1.studentMasterSchema.safeParse(response.body);
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

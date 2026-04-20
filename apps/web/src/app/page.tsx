import { StudentMaster } from '@coaching-ops/types';
import { createStudentSchema } from '@coaching-ops/validation';

// This is just to test the connection
const testStudent: Partial<StudentMaster> = {
  firstName: "Success",
  lastName: "Connection"
};

console.log("Validation Schema Loaded:", !!createStudentSchema);
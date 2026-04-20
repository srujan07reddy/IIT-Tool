import { StudentMaster } from '@coaching-ops/types';
import { createStudentSchema } from '@coaching-ops/validation';

// This is just to test the connection
const testStudent: Partial<StudentMaster> = {
  firstName: "Success",
  lastName: "Connection"
};

console.log("Validation Schema Loaded:", !!createStudentSchema);

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-gray-900">Coaching Ops Platform</h1>
      <p className="text-lg text-gray-600">Welcome to the platform</p>
    </div>
  );
}
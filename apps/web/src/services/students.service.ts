import { Gender, StudentStatus, type AcademicProfile, type Document, type StudentMaster } from '@coaching-ops/types';
import type { CreateStudentInput } from '@coaching-ops/validation';

import { demoAcademicProfiles, demoDocuments, demoStudents } from '@/lib/mock-data';

export interface StudentDetails {
  student: StudentMaster;
  academicProfile: AcademicProfile;
  documents: Document[];
}

export async function listStudents(): Promise<StudentMaster[]> {
  return Promise.resolve(demoStudents);
}

export async function registerStudent(input: CreateStudentInput): Promise<StudentMaster> {
  const created: StudentMaster = {
    id: `student-${demoStudents.length + 1}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    rollNumber: `IIT-${2400 + demoStudents.length + 1}`,
    firstName: input.firstName,
    lastName: input.lastName,
    dateOfBirth: input.dateOfBirth,
    gender: input.gender as Gender,
    phone: input.phoneNumber,
    email: input.email,
    currentBatchId: 'batch-new',
    status: StudentStatus.PROSPECT,
    parentDetails: input.parentInfo,
  };

  demoStudents.unshift(created);
  demoAcademicProfiles[created.id] = input.academicProfile;
  demoDocuments[created.id] = [];

  return Promise.resolve(created);
}

export async function getStudentDetails(studentId: string): Promise<StudentDetails> {
  const student = demoStudents.find((item) => item.id === studentId) ?? demoStudents[0];

  return Promise.resolve({
    student,
    academicProfile: demoAcademicProfiles[student.id],
    documents: demoDocuments[student.id] ?? [],
  });
}

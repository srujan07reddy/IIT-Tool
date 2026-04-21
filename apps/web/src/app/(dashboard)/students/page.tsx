'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { StudentMaster } from '@coaching-ops/types';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Drawer,
  Heading,
  Input,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Text,
} from '@coaching-ops/ui';
import {
  StudentRegistrationSchema,
  type CreateStudentInput,
} from '@coaching-ops/validation';

import { listStudents, registerStudent } from '@/services/students.service';

const initialValues: CreateStudentInput = {
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  gender: 'MALE',
  phoneNumber: '',
  email: '',
  address: '',
  parentInfo: {
    fatherName: '',
    motherName: '',
    primaryContact: '',
  },
  academicProfile: {
    previousSchool: '',
    board: '',
    lastScorePercentage: 0,
    targetExam: '',
  },
};

export default function StudentsPage() {
  const [students, setStudents] = useState<StudentMaster[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateStudentInput>({
    resolver: zodResolver(StudentRegistrationSchema),
    defaultValues: initialValues,
  });

  useEffect(() => {
    listStudents().then(setStudents);
  }, []);

  const filteredStudents = useMemo(
    () =>
      students.filter((student) => {
        const matchesSearch = `${student.firstName} ${student.lastName} ${student.rollNumber}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesBatch = selectedBatch === 'ALL' || student.currentBatchId === selectedBatch;
        const matchesStatus = selectedStatus === 'ALL' || student.status === selectedStatus;
        return matchesSearch && matchesBatch && matchesStatus;
      }),
    [searchTerm, selectedBatch, selectedStatus, students],
  );

  return (
    <>
      <div style={{ display: 'grid', gap: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <div>
            <Heading>Student directory</Heading>
            <Text>Search, filter, and register new students against the shared backend validation contract.</Text>
          </div>
          <Button type="button" onClick={() => setDrawerOpen(true)}>
            Register Student
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Directory controls</CardTitle>
          </CardHeader>
          <CardContent style={{ display: 'grid', gap: 12, gridTemplateColumns: '2fr 1fr 1fr' }}>
            <Input placeholder="Search by name or roll number" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
            <Select value={selectedBatch} onChange={(event) => setSelectedBatch(event.target.value)}>
              <option value="ALL">All batches</option>
              <option value="batch-alpha">Batch Alpha</option>
              <option value="batch-beta">Batch Beta</option>
            </Select>
            <Select value={selectedStatus} onChange={(event) => setSelectedStatus(event.target.value)}>
              <option value="ALL">All statuses</option>
              <option value="ACTIVE">Active</option>
              <option value="PROSPECT">Prospect</option>
              <option value="INACTIVE">Inactive</option>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Roll No.</TableHead>
                  <TableHead>Batch</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Email</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <Link href={`/students/${student.id}`} style={{ color: '#7dd3fc', textDecoration: 'none', fontWeight: 700 }}>
                        {student.firstName} {student.lastName}
                      </Link>
                    </TableCell>
                    <TableCell>{student.rollNumber}</TableCell>
                    <TableCell>{student.currentBatchId}</TableCell>
                    <TableCell>{student.status}</TableCell>
                    <TableCell>{student.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Drawer open={drawerOpen} title="Register Student" onClose={() => setDrawerOpen(false)}>
        <form
          onSubmit={handleSubmit(async (values) => {
            const student = await registerStudent(values);
            setStudents((current) => [student, ...current]);
            reset(initialValues);
            setDrawerOpen(false);
          })}
          style={{ display: 'grid', gap: 12 }}
        >
          <Input placeholder="First name" {...register('firstName')} />
          {errors.firstName ? <Text style={{ color: '#fca5a5' }}>{errors.firstName.message}</Text> : null}
          <Input placeholder="Last name" {...register('lastName')} />
          {errors.lastName ? <Text style={{ color: '#fca5a5' }}>{errors.lastName.message}</Text> : null}
          <Input type="date" {...register('dateOfBirth')} />
          <Select {...register('gender')}>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </Select>
          <Input placeholder="Phone number" {...register('phoneNumber')} />
          <Input placeholder="Student email" {...register('email')} />
          <Input placeholder="Full address" {...register('address')} />
          <Input placeholder="Father name" {...register('parentInfo.fatherName')} />
          <Input placeholder="Mother name" {...register('parentInfo.motherName')} />
          <Input placeholder="Primary parent contact" {...register('parentInfo.primaryContact')} />
          <Input placeholder="Previous school" {...register('academicProfile.previousSchool')} />
          <Input placeholder="Board" {...register('academicProfile.board')} />
          <Input type="number" step="0.1" placeholder="Last score %" {...register('academicProfile.lastScorePercentage', { valueAsNumber: true })} />
          <Input placeholder="Target exam" {...register('academicProfile.targetExam')} />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Create student'}
          </Button>
        </form>
      </Drawer>
    </>
  );
}

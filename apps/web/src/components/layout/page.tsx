'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Search, Filter, Plus, X } from 'lucide-react';
import { StudentRegistrationSchema } from '@coaching-ops/validation';
import { Button, Input, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@coaching-ops/ui';
import { AppLayout } from '../../components/layout/app-layout';
import { apiClient } from '../../services/api-client';

export default function StudentDirectoryPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [isSlideOutOpen, setIsSlideOutOpen] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(StudentRegistrationSchema),
  });

  const fetchStudents = async () => {
    try {
      const response = await apiClient.get('/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Failed to fetch students', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const onSubmit = async (data: any) => {
    try {
      await apiClient.post('/students', data);
      setIsSlideOutOpen(false);
      reset();
      fetchStudents();
    } catch (error) {
      alert('Failed to register student');
    }
  };

  const filteredStudents = students.filter(s => 
    s.firstName?.toLowerCase().includes(search.toLowerCase()) || 
    s.lastName?.toLowerCase().includes(search.toLowerCase()) ||
    s.rollNumber?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Student Directory</h1>
          <p className="text-gray-600">Manage and discover all registered students.</p>
        </div>
        <Button onClick={() => setIsSlideOutOpen(true)} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700">
          <Plus className="w-4 h-4" /> Register Student
        </Button>
      </div>

      {/* Search & Discovery Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
          <Input 
            placeholder="Search by name or roll number..." 
            className="pl-10 w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="w-4 h-4" /> Filters
        </Button>
      </div>

      {/* Directory Grid */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead>Roll Number</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="font-medium text-indigo-600">{student.rollNumber}</TableCell>
                <TableCell>{student.firstName} {student.lastName}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>
                  <span className="px-2 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full uppercase">
                    {student.status}
                  </span>
                </TableCell>
                <TableCell>
                  <Link href={`/students/${student.id}`} className="text-sm text-blue-600 hover:underline">
                    View Profile
                  </Link>
                </TableCell>
              </TableRow>
            ))}
            {filteredStudents.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-gray-500">No students found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Registration Slide-out Panel */}
      {isSlideOutOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsSlideOutOpen(false)} />
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col transform transition-transform duration-300">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-800">Register Student</h2>
              <button onClick={() => setIsSlideOutOpen(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <form id="registration-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div><label className="block text-sm font-medium mb-1">First Name</label><Input {...register('firstName')} /></div>
                <div><label className="block text-sm font-medium mb-1">Last Name</label><Input {...register('lastName')} /></div>
                <div><label className="block text-sm font-medium mb-1">Email</label><Input {...register('email')} type="email" /></div>
                <div><label className="block text-sm font-medium mb-1">Roll Number</label><Input {...register('rollNumber')} /></div>
                <div><label className="block text-sm font-medium mb-1">Date of Birth</label><Input {...register('dateOfBirth')} type="date" /></div>
              </form>
            </div>
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setIsSlideOutOpen(false)}>Cancel</Button>
              <Button type="submit" form="registration-form" className="flex-1 bg-indigo-600 hover:bg-indigo-700">Save Record</Button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
'use client';

import React, { useState } from 'react';
import { apiClient } from '../../services/api-client';
import { Button, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@coaching-ops/ui';
import { AppLayout } from '../../components/layout/app-layout';
import { StudentCategory, Gender } from '@coaching-ops/types';

// This would ideally come from an API call to the batches module
const MOCK_BATCHES = [
  { id: 'b-tech-cs-2026', name: 'B.Tech CS 2026' },
  { id: 'b-tech-ee-2026', name: 'B.Tech EE 2026' },
  { id: 'b-tech-me-2027', name: 'B.Tech ME 2027' },
];

export default function RegisterStudentPage() {
  const [formData, setFormData] = useState({
    rollNumber: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: Gender.MALE,
    category: StudentCategory.GENERAL,
    currentBatchId: '',
    enrollmentDate: new Date().toISOString().split('T')[0], // Default to today
    parentDetails: {
      fatherName: '',
      fatherPhone: '',
      motherName: '',
      address: '',
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('parentDetails.')) {
      const parentKey = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        parentDetails: { ...prev.parentDetails, [parentKey]: value },
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // The DTO shape must match the backend's CreateStudentDto from @coaching-ops/types
      const response = await apiClient.post('/students', formData);
      setSuccess(`Successfully registered student: ${response.data.firstName} ${response.data.lastName} (ID: ${response.data.id})`);
      // Optionally reset the form here
    } catch (err: any) {
      setError(err.response?.data?.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Registration Form</h1>
        <p className="text-gray-600 mb-8">Enter the details for a new student. All fields are required.</p>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-6">
          {/* Personal Details */}
          <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b pb-6">
            <legend className="text-lg font-semibold text-gray-800 mb-4 col-span-full">Personal Details</legend>
            <div><Label htmlFor="firstName">First Name</Label><Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required /></div>
            <div><Label htmlFor="lastName">Last Name</Label><Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required /></div>
            <div><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required /></div>
            <div><Label htmlFor="phone">Phone Number</Label><Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required /></div>
            <div><Label htmlFor="dateOfBirth">Date of Birth</Label><Input id="dateOfBirth" name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} required /></div>
            <div>
              <Label>Gender</Label>
              <Select name="gender" onValueChange={handleSelectChange('gender')} value={formData.gender}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{Object.values(Gender).map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}</SelectContent></Select>
            </div>
          </fieldset>

          {/* Academic Details */}
          <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b pb-6">
            <legend className="text-lg font-semibold text-gray-800 mb-4 col-span-full">Academic & Enrollment Details</legend>
            <div><Label htmlFor="rollNumber">Roll Number</Label><Input id="rollNumber" name="rollNumber" value={formData.rollNumber} onChange={handleChange} required /></div>
            <div><Label htmlFor="enrollmentDate">Enrollment Date</Label><Input id="enrollmentDate" name="enrollmentDate" type="date" value={formData.enrollmentDate} onChange={handleChange} required /></div>
            <div>
              <Label>Category</Label>
              <Select name="category" onValueChange={handleSelectChange('category')} value={formData.category}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{Object.values(StudentCategory).map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select>
            </div>
            <div>
              <Label>Batch</Label>
              <Select name="currentBatchId" onValueChange={handleSelectChange('currentBatchId')} value={formData.currentBatchId}><SelectTrigger><SelectValue placeholder="Select a batch" /></SelectTrigger><SelectContent>{MOCK_BATCHES.map(b => <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>)}</SelectContent></Select>
            </div>
          </fieldset>

          {/* Parent/Guardian Details */}
          <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <legend className="text-lg font-semibold text-gray-800 mb-4 col-span-full">Parent / Guardian Details</legend>
            <div><Label htmlFor="fatherName">Father's Name</Label><Input id="fatherName" name="parentDetails.fatherName" value={formData.parentDetails.fatherName} onChange={handleChange} required /></div>
            <div><Label htmlFor="fatherPhone">Father's Phone</Label><Input id="fatherPhone" name="parentDetails.fatherPhone" type="tel" value={formData.parentDetails.fatherPhone} onChange={handleChange} required /></div>
            <div><Label htmlFor="motherName">Mother's Name</Label><Input id="motherName" name="parentDetails.motherName" value={formData.parentDetails.motherName} onChange={handleChange} /></div>
            <div className="col-span-full"><Label htmlFor="address">Address</Label><Input id="address" name="parentDetails.address" value={formData.parentDetails.address} onChange={handleChange} required /></div>
          </fieldset>

          {error && <p className="text-red-600 bg-red-50 p-3 rounded-md">{error}</p>}
          {success && <p className="text-green-600 bg-green-50 p-3 rounded-md">{success}</p>}

          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={isLoading} className="min-w-[150px]">{isLoading ? 'Registering...' : 'Register Student'}</Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
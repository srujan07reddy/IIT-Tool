'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { User, BookOpen, FileText } from 'lucide-react';
import { apiClient } from '../../../../services/api-client';
import { Heading, Text, Card, CardContent } from '@coaching-ops/ui';
import { StudentProfileCard } from '../../../../components/students/student-profile-card';
import { DocumentVerificationChecklist } from '../../../../components/students/document-verification-checklist';
import { DocumentUpload } from '../../../../components/students/document-upload';

type TabType = 'personal' | 'academic' | 'documents';

export default function StudentProfilePage() {
  const { id } = useParams();
  const [student, setStudent] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<TabType>('personal');

  const fetchStudentProfile = async () => {
    try {
      const response = await apiClient.get(`/students/${id}`);
      setStudent(response.data);
    } catch (error) {
      console.error('Failed to fetch student profile', error);
    }
  };

  useEffect(() => {
    if (id) fetchStudentProfile();
  }, [id]);

  if (!student) return <div className="p-8 text-gray-500 flex items-center justify-center min-h-[400px]"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div></div>;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <Heading>Student Profile</Heading>
        <Text>Comprehensive record-keeping and document verification.</Text>
      </div>

      <StudentProfileCard student={student} />

      {/* Tabbed Navigation */}
      <div className="flex gap-2 border-b border-gray-200 mt-8 mb-6">
        <button onClick={() => setActiveTab('personal')} className={`px-4 py-3 font-medium text-sm border-b-2 flex items-center gap-2 transition-colors ${activeTab === 'personal' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}><User className="w-4 h-4"/> Personal Info</button>
        <button onClick={() => setActiveTab('academic')} className={`px-4 py-3 font-medium text-sm border-b-2 flex items-center gap-2 transition-colors ${activeTab === 'academic' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}><BookOpen className="w-4 h-4"/> Academic Records</button>
        <button onClick={() => setActiveTab('documents')} className={`px-4 py-3 font-medium text-sm border-b-2 flex items-center gap-2 transition-colors ${activeTab === 'documents' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}><FileText className="w-4 h-4"/> Documents & Verification</button>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        
        {/* PERSONAL INFO TAB */}
        {activeTab === 'personal' && (
          <Card>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12 pt-6">
              <div><p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Date of Birth</p><p className="text-gray-900 font-medium mt-1">{student.dateOfBirth || 'N/A'}</p></div>
              <div><p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Gender</p><p className="text-gray-900 font-medium mt-1">{student.gender || 'N/A'}</p></div>
              <div><p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Category</p><p className="text-gray-900 font-medium mt-1">{student.category || 'N/A'}</p></div>
              <div><p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Address</p><p className="text-gray-900 font-medium mt-1">{student.address || 'N/A'}</p></div>
              <div><p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Father's Name</p><p className="text-gray-900 font-medium mt-1">{student.parentInfo?.fatherName || student.parentDetails?.fatherName || 'N/A'}</p></div>
              <div><p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Mother's Name</p><p className="text-gray-900 font-medium mt-1">{student.parentInfo?.motherName || student.parentDetails?.motherName || 'N/A'}</p></div>
            </CardContent>
          </Card>
        )}

        {/* ACADEMIC RECORDS TAB */}
        {activeTab === 'academic' && (
          <Card>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12 pt-6">
              <div><p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Enrolled Batch ID</p><p className="text-gray-900 font-medium mt-1">{student.currentBatchId || 'Not Assigned'}</p></div>
              <div><p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Enrollment Date</p><p className="text-gray-900 font-medium mt-1">{student.enrollmentDate ? new Date(student.enrollmentDate).toLocaleDateString() : 'N/A'}</p></div>
              <div><p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Previous School</p><p className="text-gray-900 font-medium mt-1">{student.academicProfile?.previousSchool || 'N/A'}</p></div>
              <div><p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Board</p><p className="text-gray-900 font-medium mt-1">{student.academicProfile?.board || 'N/A'}</p></div>
              <div><p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Last Score</p><p className="text-gray-900 font-medium mt-1">{student.academicProfile?.lastScorePercentage ? `${student.academicProfile.lastScorePercentage}%` : 'N/A'}</p></div>
              <div><p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Target Exam</p><p className="text-gray-900 font-medium mt-1">{student.academicProfile?.targetExam || 'N/A'}</p></div>
            </CardContent>
          </Card>
        )}

        {/* DOCUMENTS TAB */}
        {activeTab === 'documents' && (
          <div className="space-y-8">
            <DocumentUpload studentId={id as string} onUploadComplete={fetchStudentProfile} />
            <DocumentVerificationChecklist studentId={id as string} />
          </div>
        )}
      </div>
    </div>
  );
}
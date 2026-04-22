'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { User, BookOpen, FileText } from 'lucide-react';
import { AppLayout } from '../layout/app-layout';
import { DocumentUpload } from './document-upload';
import { apiClient } from '../../services/api-client';

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

  if (!student) return <AppLayout><div className="p-8 text-gray-500">Loading profile...</div></AppLayout>;

  return (
    <AppLayout>
      {/* Profile Header */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-2xl font-bold">
            {student.firstName?.[0]}{student.lastName?.[0]}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{student.firstName} {student.lastName}</h1>
            <p className="text-gray-500 font-mono text-sm mt-1">Roll No: {student.rollNumber} | {student.email}</p>
          </div>
        </div>
        <span className="px-4 py-2 bg-green-50 text-green-700 font-semibold rounded-full uppercase tracking-wider text-sm">
          {student.status}
        </span>
      </div>

      {/* Tabbed Navigation */}
      <div className="flex gap-2 border-b border-gray-200 mb-6">
        <button onClick={() => setActiveTab('personal')} className={`px-4 py-3 font-medium text-sm border-b-2 flex items-center gap-2 ${activeTab === 'personal' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}><User className="w-4 h-4"/> Personal Info</button>
        <button onClick={() => setActiveTab('academic')} className={`px-4 py-3 font-medium text-sm border-b-2 flex items-center gap-2 ${activeTab === 'academic' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}><BookOpen className="w-4 h-4"/> Academic Records</button>
        <button onClick={() => setActiveTab('documents')} className={`px-4 py-3 font-medium text-sm border-b-2 flex items-center gap-2 ${activeTab === 'documents' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}><FileText className="w-4 h-4"/> Documents</button>
      </div>

      {/* Tab Content */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 min-h-[400px]">
        
        {/* PERSONAL INFO TAB */}
        {activeTab === 'personal' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Date of Birth</p>
              <p className="text-gray-900 font-medium">{student.dateOfBirth || 'N/A'}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Gender</p>
              <p className="text-gray-900 font-medium">{student.gender || 'N/A'}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Category</p>
              <p className="text-gray-900 font-medium">{student.category || 'N/A'}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Phone</p>
              <p className="text-gray-900 font-medium">{student.phone || 'N/A'}</p>
            </div>
          </div>
        )}

        {/* ACADEMIC RECORDS TAB */}
        {activeTab === 'academic' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Enrolled Batch ID</p>
              <p className="text-gray-900 font-medium">{student.currentBatchId || 'Not Assigned'}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Enrollment Date</p>
              <p className="text-gray-900 font-medium">{student.enrollmentDate || 'N/A'}</p>
            </div>
          </div>
        )}

        {/* DOCUMENTS TAB */}
        {activeTab === 'documents' && (
          <div>
            <DocumentUpload studentId={id as string} onUploadComplete={fetchStudentProfile} />
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Verification Records</h3>
            <div className="grid gap-3">
              {student.documents?.length > 0 ? student.documents.map((doc: any) => (
                <div key={doc.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col"><span className="font-semibold text-gray-800">{doc.documentType}</span><span className="text-xs text-gray-500">{doc.createdAt}</span></div>
                  <span className={`px-3 py-1 text-xs font-bold rounded-full ${doc.verificationStatus === 'VERIFIED' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{doc.verificationStatus}</span>
                </div>
              )) : <p className="text-gray-500 italic">No documents uploaded yet.</p>}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
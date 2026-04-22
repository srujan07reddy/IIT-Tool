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

  if (!student) return <div className="p-8 text-[#00F3FF] flex flex-col items-center justify-center min-h-[400px] font-mono tracking-widest text-xs uppercase"><div className="animate-spin rounded-none h-8 w-8 border border-[#00F3FF] shadow-[0_0_15px_#00F3FF] mb-4"></div>Decrypting Dossier...</div>;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-black tracking-widest uppercase text-[#E0E0E0] drop-shadow-[0_0_8px_rgba(224,224,224,0.3)]">Operative Dossier</h1>
        <p className="text-xs font-bold uppercase tracking-widest text-[#00F3FF]/70 mt-1">Comprehensive intelligence and data matrices.</p>
      </div>

      <StudentProfileCard student={student} />

      {/* Tabbed Navigation */}
      <div className="flex gap-2 border-b border-[#00F3FF]/30 mt-8 mb-6">
        <button onClick={() => setActiveTab('personal')} className={`px-4 py-3 font-black text-[10px] tracking-widest uppercase border-b-2 flex items-center gap-2 transition-all ${activeTab === 'personal' ? 'border-[#00F3FF] text-[#00F3FF] bg-[#00F3FF]/5 shadow-[inset_0_-5px_10px_rgba(0,243,255,0.1)]' : 'border-transparent text-[#E0E0E0]/50 hover:text-[#00F3FF] hover:border-[#00F3FF]/50'}`}><User className="w-4 h-4"/> Identity Matrix</button>
        <button onClick={() => setActiveTab('academic')} className={`px-4 py-3 font-black text-[10px] tracking-widest uppercase border-b-2 flex items-center gap-2 transition-all ${activeTab === 'academic' ? 'border-[#00F3FF] text-[#00F3FF] bg-[#00F3FF]/5 shadow-[inset_0_-5px_10px_rgba(0,243,255,0.1)]' : 'border-transparent text-[#E0E0E0]/50 hover:text-[#00F3FF] hover:border-[#00F3FF]/50'}`}><BookOpen className="w-4 h-4"/> Academic Telemetry</button>
        <button onClick={() => setActiveTab('documents')} className={`px-4 py-3 font-black text-[10px] tracking-widest uppercase border-b-2 flex items-center gap-2 transition-all ${activeTab === 'documents' ? 'border-[#00F3FF] text-[#00F3FF] bg-[#00F3FF]/5 shadow-[inset_0_-5px_10px_rgba(0,243,255,0.1)]' : 'border-transparent text-[#E0E0E0]/50 hover:text-[#00F3FF] hover:border-[#00F3FF]/50'}`}><FileText className="w-4 h-4"/> Encrypted Files</button>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        
        {/* PERSONAL INFO TAB */}
        {activeTab === 'personal' && (
          <Card className="bg-[#0a0a0a]/70 backdrop-blur-[10px] border border-[#00F3FF]/50 shadow-[0_0_15px_rgba(0,243,255,0.05)] rounded-none">
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12 pt-6">
              <div><p className="text-[10px] font-black text-[#00F3FF]/70 uppercase tracking-widest">Date of Origin</p><p className="text-[#E0E0E0] font-semibold mt-1 tracking-wider">{student.dateOfBirth || 'N/A'}</p></div>
              <div><p className="text-[10px] font-black text-[#00F3FF]/70 uppercase tracking-widest">Biological Type</p><p className="text-[#E0E0E0] font-semibold mt-1 tracking-wider">{student.gender || 'N/A'}</p></div>
              <div><p className="text-[10px] font-black text-[#00F3FF]/70 uppercase tracking-widest">Classification</p><p className="text-[#E0E0E0] font-semibold mt-1 tracking-wider">{student.category || 'N/A'}</p></div>
              <div><p className="text-[10px] font-black text-[#00F3FF]/70 uppercase tracking-widest">Coordinates</p><p className="text-[#E0E0E0] font-semibold mt-1 tracking-wider">{student.address || 'N/A'}</p></div>
              <div><p className="text-[10px] font-black text-[#00F3FF]/70 uppercase tracking-widest">Paternal Identity</p><p className="text-[#E0E0E0] font-semibold mt-1 tracking-wider">{student.parentInfo?.fatherName || student.parentDetails?.fatherName || 'N/A'}</p></div>
              <div><p className="text-[10px] font-black text-[#00F3FF]/70 uppercase tracking-widest">Maternal Identity</p><p className="text-[#E0E0E0] font-semibold mt-1 tracking-wider">{student.parentInfo?.motherName || student.parentDetails?.motherName || 'N/A'}</p></div>
            </CardContent>
          </Card>
        )}

        {/* ACADEMIC RECORDS TAB */}
        {activeTab === 'academic' && (
          <Card className="bg-[#0a0a0a]/70 backdrop-blur-[10px] border border-[#00F3FF]/50 shadow-[0_0_15px_rgba(0,243,255,0.05)] rounded-none">
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12 pt-6">
              <div><p className="text-[10px] font-black text-[#00F3FF]/70 uppercase tracking-widest">Active Cohort ID</p><p className="text-[#E0E0E0] font-semibold mt-1 tracking-wider">{student.currentBatchId || 'Not Assigned'}</p></div>
              <div><p className="text-[10px] font-black text-[#00F3FF]/70 uppercase tracking-widest">Activation Date</p><p className="text-[#E0E0E0] font-semibold mt-1 tracking-wider">{student.enrollmentDate ? new Date(student.enrollmentDate).toLocaleDateString() : 'N/A'}</p></div>
              <div><p className="text-[10px] font-black text-[#00F3FF]/70 uppercase tracking-widest">Previous Installation</p><p className="text-[#E0E0E0] font-semibold mt-1 tracking-wider">{student.academicProfile?.previousSchool || 'N/A'}</p></div>
              <div><p className="text-[10px] font-black text-[#00F3FF]/70 uppercase tracking-widest">Sector Board</p><p className="text-[#E0E0E0] font-semibold mt-1 tracking-wider">{student.academicProfile?.board || 'N/A'}</p></div>
              <div><p className="text-[10px] font-black text-[#00F3FF]/70 uppercase tracking-widest">Previous Metric</p><p className="text-[#00F3FF] font-mono mt-1 tracking-wider">{student.academicProfile?.lastScorePercentage ? `${student.academicProfile.lastScorePercentage}%` : 'N/A'}</p></div>
              <div><p className="text-[10px] font-black text-[#00F3FF]/70 uppercase tracking-widest">Primary Target</p><p className="text-[#E0E0E0] font-semibold mt-1 tracking-wider">{student.academicProfile?.targetExam || 'N/A'}</p></div>
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
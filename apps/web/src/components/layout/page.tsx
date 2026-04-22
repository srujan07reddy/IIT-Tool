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
          <h1 className="text-3xl font-black tracking-widest uppercase text-[#E0E0E0] drop-shadow-[0_0_8px_rgba(224,224,224,0.3)]">Operative Directory</h1>
          <p className="text-xs font-bold uppercase tracking-widest text-[#00F3FF]/70 mt-1">Manage and track registered nodes.</p>
        </div>
        <Button onClick={() => setIsSlideOutOpen(true)} className="flex items-center gap-2 bg-[#00F3FF]/10 border border-[#00F3FF] hover:bg-[#00F3FF]/20 hover:shadow-[0_0_15px_#00F3FF] text-[#00F3FF] rounded-none tracking-widest uppercase text-xs font-bold transition-all">
          <Plus className="w-4 h-4" /> Register Node
        </Button>
      </div>

      {/* Search & Discovery Filters */}
      <div className="bg-[#0a0a0a]/70 backdrop-blur-[10px] p-4 border border-[#00F3FF]/30 flex gap-4 mb-6 shadow-[0_0_15px_rgba(0,243,255,0.05)]">
        <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3 top-3 text-[#00F3FF]/50" />
          <Input 
            placeholder="Query by ID or Designation..." 
            className="pl-10 w-full bg-transparent border border-[#00F3FF]/30 text-[#E0E0E0] rounded-none focus:border-[#00F3FF] focus:ring-0 placeholder:text-[#E0E0E0]/30 tracking-widest"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2 rounded-none border-[#00F3FF]/50 text-[#00F3FF] hover:bg-[#00F3FF]/10 tracking-widest uppercase text-xs font-bold">
          <Filter className="w-4 h-4" /> Filters
        </Button>
      </div>

      {/* Directory Grid */}
      <div className="bg-[#0a0a0a]/70 backdrop-blur-[10px] border border-[#00F3FF]/50 shadow-[0_0_15px_rgba(0,243,255,0.05)] overflow-hidden">
        <Table>
          <TableHeader className="bg-[#050505] border-b-2 border-[#00F3FF]">
            <TableRow>
              <TableHead className="text-[#00F3FF] font-bold tracking-widest uppercase text-xs">Node ID</TableHead>
              <TableHead className="text-[#00F3FF] font-bold tracking-widest uppercase text-xs">Designation</TableHead>
              <TableHead className="text-[#00F3FF] font-bold tracking-widest uppercase text-xs">Uplink</TableHead>
              <TableHead className="text-[#00F3FF] font-bold tracking-widest uppercase text-xs">Status</TableHead>
              <TableHead className="text-[#00F3FF] font-bold tracking-widest uppercase text-xs">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.id} className="border-b border-[#222] even:bg-[#111111] hover:bg-[#1a1a1a] transition-colors">
                <TableCell className="font-mono text-[#00F3FF] font-bold">{student.rollNumber}</TableCell>
                <TableCell className="text-[#E0E0E0] font-semibold">{student.firstName} {student.lastName}</TableCell>
                <TableCell className="text-[#E0E0E0]/70 tracking-wider text-sm">{student.email}</TableCell>
                <TableCell>
                  <span className="px-2 py-1 bg-transparent border border-[#00F3FF] text-[#00F3FF] shadow-[0_0_8px_rgba(0,243,255,0.2)] text-[10px] font-black uppercase tracking-widest">
                    {student.status}
                  </span>
                </TableCell>
                <TableCell>
                  <Link href={`/students/${student.id}`} className="text-[#00F3FF] hover:text-[#E0E0E0] hover:drop-shadow-[0_0_8px_#00F3FF] text-[10px] uppercase font-black tracking-widest transition-all border-b border-transparent hover:border-[#00F3FF]">
                    Access Dossier
                  </Link>
                </TableCell>
              </TableRow>
            ))}
            {filteredStudents.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-[#E0E0E0]/50 tracking-widest uppercase text-xs font-bold">No nodes detected.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Registration Slide-out Panel */}
      {isSlideOutOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-[#050505]/80 backdrop-blur-sm" onClick={() => setIsSlideOutOpen(false)} />
          <div className="relative w-full max-w-md bg-[#0a0a0a] border-l border-[#00F3FF] h-full shadow-[0_0_30px_rgba(0,243,255,0.1)] flex flex-col transform transition-transform duration-300">
            <div className="flex items-center justify-between p-6 border-b border-[#00F3FF]/30">
              <h2 className="text-lg font-black tracking-widest uppercase text-[#E0E0E0]">Initialize Node</h2>
              <button onClick={() => setIsSlideOutOpen(false)} className="text-[#00F3FF]/50 hover:text-[#00F3FF] hover:drop-shadow-[0_0_5px_#00F3FF] transition-all"><X className="w-5 h-5" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <form id="registration-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div><label className="block text-[10px] font-black uppercase tracking-widest text-[#00F3FF]/70 mb-1">Primary Designation</label><Input className="bg-transparent border-0 border-b border-[#00F3FF]/50 rounded-none text-[#E0E0E0] focus:ring-0 focus:border-[#00F3FF]" {...register('firstName')} /></div>
                <div><label className="block text-[10px] font-black uppercase tracking-widest text-[#00F3FF]/70 mb-1">Secondary Designation</label><Input className="bg-transparent border-0 border-b border-[#00F3FF]/50 rounded-none text-[#E0E0E0] focus:ring-0 focus:border-[#00F3FF]" {...register('lastName')} /></div>
                <div><label className="block text-[10px] font-black uppercase tracking-widest text-[#00F3FF]/70 mb-1">Uplink Address</label><Input className="bg-transparent border-0 border-b border-[#00F3FF]/50 rounded-none text-[#E0E0E0] focus:ring-0 focus:border-[#00F3FF]" {...register('email')} type="email" /></div>
                <div><label className="block text-[10px] font-black uppercase tracking-widest text-[#00F3FF]/70 mb-1">Node ID</label><Input className="bg-transparent border-0 border-b border-[#00F3FF]/50 rounded-none text-[#E0E0E0] focus:ring-0 focus:border-[#00F3FF]" {...register('rollNumber')} /></div>
                <div><label className="block text-[10px] font-black uppercase tracking-widest text-[#00F3FF]/70 mb-1">Creation Date</label><Input className="bg-transparent border-0 border-b border-[#00F3FF]/50 rounded-none text-[#E0E0E0] focus:ring-0 focus:border-[#00F3FF]" {...register('dateOfBirth')} type="date" /></div>
              </form>
            </div>
            <div className="p-6 border-t border-[#00F3FF]/30 bg-[#050505] flex gap-3">
              <Button variant="outline" className="flex-1 rounded-none border-[#00F3FF]/50 text-[#00F3FF] hover:bg-[#00F3FF]/10 uppercase tracking-widest text-[10px] font-bold" onClick={() => setIsSlideOutOpen(false)}>Abort</Button>
              <Button type="submit" form="registration-form" className="flex-1 bg-[#00F3FF]/10 border border-[#00F3FF] hover:bg-[#00F3FF]/20 hover:shadow-[0_0_15px_#00F3FF] text-[#00F3FF] rounded-none uppercase tracking-widest text-[10px] font-bold transition-all">Save Matrix</Button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
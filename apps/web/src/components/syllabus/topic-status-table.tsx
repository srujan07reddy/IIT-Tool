'use client';

import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@coaching-ops/ui';
import { AiConceptCard } from './ai-concept-card';

// Mock data mapping to the Academic Skeleton API (Phase 2)
const MOCK_SYLLABUS = [
  { id: '1', subject: 'Physics', chapter: 'Kinematics', topic: 'Newton’s Laws of Motion', status: 'COMPLETED' },
  { id: '2', subject: 'Physics', chapter: 'Kinematics', topic: 'Projectile Motion', status: 'IN_PROGRESS' },
  { id: '3', subject: 'Chemistry', chapter: 'Thermodynamics', topic: 'First Law of Thermodynamics', status: 'PENDING' },
];

export function TopicStatusTable({ data }: { data?: any }) {
  const [activeTopic, setActiveTopic] = useState<any>(null);
  const [topics, setTopics] = useState(data?.subjects || MOCK_SYLLABUS);

  const handleStatusChange = (id: string, newStatus: string) => {
    setTopics((prev: any[]) => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
    // TODO: Wire to apiClient.patch(`/syllabus/topics/${id}/status`, { status: newStatus })
  };

  return (
    <div className="flex gap-6 items-start">
      <div className="flex-1 bg-[#0a0a0a]/70 backdrop-blur-[10px] border border-[#00F3FF] shadow-[0_0_15px_rgba(0,243,255,0.05)] overflow-hidden">
        <Table>
          <TableHeader className="bg-[#050505] border-b-2 border-[#00F3FF]">
            <TableRow>
              <TableHead className="text-[#00F3FF] font-bold tracking-widest uppercase text-xs">Subject</TableHead>
              <TableHead className="text-[#00F3FF] font-bold tracking-widest uppercase text-xs">Chapter</TableHead>
              <TableHead className="text-[#00F3FF] font-bold tracking-widest uppercase text-xs">Topic</TableHead>
              <TableHead className="text-[#00F3FF] font-bold tracking-widest uppercase text-xs">Status</TableHead>
              <TableHead className="text-[#00F3FF] font-bold tracking-widest uppercase text-xs">Insights</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topics.map((row: any) => (
              <TableRow key={row.id} className="border-b border-[#222] even:bg-[#111111] hover:bg-[#1a1a1a] transition-colors">
                <TableCell className="font-semibold text-[#E0E0E0]">{row.subject}</TableCell>
                <TableCell className="text-[#E0E0E0]/70">{row.chapter}</TableCell>
                <TableCell className="text-[#E0E0E0]/90">{row.topic}</TableCell>
                <TableCell className="p-3">
                  <select 
                    value={row.status} 
                    onChange={(e) => handleStatusChange(row.id, e.target.value)}
                    className={`text-xs font-bold px-3 py-2 bg-transparent border outline-none tracking-wider appearance-none ${row.status === 'COMPLETED' ? 'text-[#00F3FF] border-[#00F3FF] shadow-[0_0_8px_rgba(0,243,255,0.2)]' : row.status === 'IN_PROGRESS' ? 'text-[#FF00E5] border-[#FF00E5] shadow-[0_0_8px_rgba(255,0,229,0.2)]' : 'text-[#E0E0E0]/50 border-[#E0E0E0]/30'}`}
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="IN_PROGRESS">IN PROGRESS</option>
                    <option value="COMPLETED">COMPLETED</option>
                  </select>
                </TableCell>
                <TableCell className="p-3"><button onClick={() => setActiveTopic(row)} className="text-[#00F3FF] border border-[#00F3FF]/30 hover:bg-[#00F3FF]/10 hover:shadow-[0_0_10px_#00F3FF] px-3 py-1.5 text-xs tracking-widest uppercase font-semibold transition-all">Scan</button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {activeTopic && <div className="w-[400px] sticky top-24 transition-all duration-300"><AiConceptCard topic={activeTopic} onClose={() => setActiveTopic(null)} /></div>}
    </div>
  );
}
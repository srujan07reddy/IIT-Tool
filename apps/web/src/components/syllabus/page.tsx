'use client';

import React from 'react';
import { AppLayout } from '../../components/layout/app-layout';
import { TopicStatusTable } from '../../components/syllabus/topic-status-table';

export default function SyllabusTrackerPage() {
  return (
    <AppLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        <div>
          <h1 className="text-3xl font-black tracking-widest uppercase text-[#E0E0E0] drop-shadow-[0_0_8px_rgba(224,224,224,0.3)]">Telemetry Tracker</h1>
          <p className="text-xs font-bold uppercase tracking-widest text-[#00F3FF]/70 mt-1">Live tactical progress and AI-enhanced intelligence.</p>
        </div>
        <TopicStatusTable />
      </div>
    </AppLayout>
  );
}
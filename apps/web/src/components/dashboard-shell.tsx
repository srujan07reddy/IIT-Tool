'use client';

import type { ReactNode } from 'react';
import { AppHeader } from '@/components/layout/app-header';
import { AppSidebar } from '@/components/layout/app-sidebar';

export function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(circle at top left, rgba(14, 165, 233, 0.18), transparent 28%), linear-gradient(180deg, #020617 0%, #0f172a 100%)',
      }}
    >
      <div
        style={{
          width: 'min(1400px, calc(100vw - 32px))',
          margin: '0 auto',
          padding: '24px 0 40px',
          display: 'grid',
          gap: 24,
          gridTemplateColumns: '280px minmax(0, 1fr)',
        }}
      >
        <AppSidebar />
        <div style={{ minWidth: 0 }}>
          <AppHeader />
          {children}
        </div>
      </div>
    </div>
  );
}

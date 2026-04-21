'use client';

import React, { ReactNode, useState } from 'react';
import AppHeader from './AppHeader';
import AppSidebar from './AppSidebar';
import useAuthStore from '../store/auth.store';

export default function DashboardShell({ children }: { children: ReactNode }) {
  const user = useAuthStore((state) => state.user);
  const role = user?.role ?? 'STUDENT';
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <AppHeader role={String(role)} isSidebarOpen={isOpen} onToggleSidebar={() => setIsOpen((v) => !v)} />
      <AppSidebar role={String(role)} isOpen={isOpen} />
      <main style={{ marginTop: 60, marginLeft: isOpen ? 250 : 0, padding: 20 }}>{children}</main>
    </div>
  );
}

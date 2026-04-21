import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Coaching Ops Platform',
  description: 'Coaching Operations Platform',
};

'use client';

import { AppHeader } from '@/components/layout/app-header';
import { AppSidebar } from '@/components/layout/app-sidebar';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-background">
        <div className="min-h-screen flex-col md:flex">
          <AppHeader />
          <div className="flex flex-1 flex-col md:flex-row">
            <AppSidebar />
            <main className="flex-1 p-8 lg:mr-0">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}

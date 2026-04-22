import React from 'react';
import './globals.css';
import ProgressProvider from '../components/providers/progress-provider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ProgressProvider>
          {children}
        </ProgressProvider>
      </body>
    </html>
  );
}
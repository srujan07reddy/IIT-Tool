import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Coaching Ops Platform',
  description: 'Coaching Operations Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
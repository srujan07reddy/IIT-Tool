'use client';

import Link from 'next/link';
import { Button } from '@coaching-ops/ui';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8 text-center">
      <h1 className="text-5xl font-bold tracking-tight mb-8">
        Coaching Ops Platform
      </h1>
      <p className="text-xl text-muted-foreground mb-12 max-w-md">
        Comprehensive platform for IIT coaching operations - syllabus tracking, student management, exam applications, and performance analytics.
      </p>
      <div className="flex gap-4">
        <Link href="/login">
<Button>Get Started</Button>
        </Link>
        <Link href="/dashboard">
<Button variant="ghost">Demo Dashboard</Button>
        </Link>
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserRole } from '@coaching-ops/types';
import { Button, Card, PageContainer, Text } from '@coaching-ops/ui';

import { useAuthStore } from '@/store/useAuthStore';

interface NavItem {
  href: string;
  label: string;
  roles: UserRole[];
}

const navItems: NavItem[] = [
  { href: '/dashboard', label: 'Overview', roles: [UserRole.ADMIN, UserRole.FACULTY, UserRole.OPERATIONS] },
  { href: '/students', label: 'Students', roles: [UserRole.ADMIN, UserRole.OPERATIONS, UserRole.FACULTY] },
  { href: '/syllabus', label: 'Syllabus Tracker', roles: [UserRole.ADMIN, UserRole.FACULTY] },
  { href: '/applications', label: 'Applications', roles: [UserRole.ADMIN, UserRole.OPERATIONS] },
  { href: '/assessments/question-bank', label: 'Question Bank', roles: [UserRole.ADMIN, UserRole.FACULTY] },
  { href: '/assessments/omr-upload', label: 'OMR Upload', roles: [UserRole.ADMIN, UserRole.OPERATIONS] },
  { href: '/leadership', label: 'Leadership', roles: [UserRole.ADMIN] },
];

export function AppSidebar() {
  const pathname = usePathname();
  const role = useAuthStore((state) => state.role) ?? UserRole.ADMIN;
  const user = useAuthStore((state) => state.user);

  const allowedItems = navItems.filter((item) => item.roles.includes(role));

  return (
    <aside
      style={{
        position: 'sticky',
        top: 24,
        alignSelf: 'start',
      }}
    >
      <PageContainer style={{ width: '100%' }}>
        <Card style={{ padding: 20, background: 'rgba(15, 23, 42, 0.94)' }}>
          <div style={{ display: 'grid', gap: 20 }}>
            <div>
              <Text style={{ color: '#7dd3fc', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Ops Console
              </Text>
              <h2 style={{ margin: '0.4rem 0 0', fontSize: '1.3rem' }}>
                {user ? `${user.firstName} ${user.lastName}` : 'Authenticated User'}
              </h2>
              <Text>{role.replace('_', ' ')}</Text>
            </div>
            <nav style={{ display: 'grid', gap: 10 }}>
              {allowedItems.map((item) => {
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    style={{
                      padding: '0.9rem 1rem',
                      borderRadius: 16,
                      color: '#e2e8f0',
                      textDecoration: 'none',
                      fontWeight: 600,
                      background: active
                        ? 'linear-gradient(135deg, rgba(37, 99, 235, 0.45), rgba(13, 148, 136, 0.28))'
                        : 'rgba(30, 41, 59, 0.68)',
                      border: '1px solid rgba(148, 163, 184, 0.14)',
                    }}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <Button type="button" variant="ghost" style={{ width: '100%', justifyContent: 'center' }}>
              Role-scoped navigation
            </Button>
          </div>
        </Card>
      </PageContainer>
    </aside>
  );
}

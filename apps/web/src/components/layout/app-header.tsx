'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, Text } from '@coaching-ops/ui';

import { useAuthStore } from '@/store/useAuthStore';

export function AppHeader() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const hydrate = useAuthStore((state) => state.hydrate);

  useEffect(() => {
    hydrate();
    setMounted(true);
  }, [hydrate]);

  useEffect(() => {
    const handleLogout = () => {
      logout();
      router.replace('/login');
    };

    window.addEventListener('coaching-ops:logout', handleLogout);
    return () => window.removeEventListener('coaching-ops:logout', handleLogout);
  }, [logout, router]);

  const initials = useMemo(() => {
    if (!user) return 'CO';
    return `${user.firstName[0] ?? ''}${user.lastName[0] ?? ''}`.toUpperCase();
  }, [user]);

  return (
    <header style={{ marginBottom: 24 }}>
      <Card
        style={{
          padding: '1rem 1.25rem',
          background: 'rgba(15, 23, 42, 0.88)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
        }}
      >
        <div>
          <Text style={{ color: '#7dd3fc', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Coaching Ops
          </Text>
          <h1 style={{ margin: '0.25rem 0 0', fontSize: '1.35rem' }}>Authenticated Dashboard</h1>
        </div>
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setMenuOpen((open) => !open)}
            style={{
              borderRadius: 999,
              border: '1px solid rgba(125, 211, 252, 0.24)',
              background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.24), rgba(14, 116, 144, 0.28))',
              color: '#f8fafc',
              width: 48,
              height: 48,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            {mounted ? initials : 'CO'}
          </button>
          {menuOpen ? (
            <div
              style={{
                position: 'absolute',
                right: 0,
                top: 60,
                minWidth: 240,
                borderRadius: 20,
                background: '#0f172a',
                border: '1px solid rgba(148, 163, 184, 0.16)',
                padding: 16,
                display: 'grid',
                gap: 12,
                boxShadow: '0 20px 60px rgba(2, 6, 23, 0.45)',
              }}
            >
              <div>
                <div style={{ fontWeight: 700 }}>{user ? `${user.firstName} ${user.lastName}` : 'Demo User'}</div>
                <Text>{user?.email ?? 'admin@coachingops.dev'}</Text>
              </div>
              <Button
                type="button"
                variant="danger"
                onClick={() => {
                  logout();
                  router.replace('/login');
                }}
              >
                Logout
              </Button>
            </div>
          ) : null}
        </div>
      </Card>
    </header>
  );
}

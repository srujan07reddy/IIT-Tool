'use client';

import { useRouter } from 'next/navigation';

interface AppHeaderProps {
  role: string;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export default function AppHeader({ role, isSidebarOpen, onToggleSidebar }: AppHeaderProps) {
  const router = useRouter();

  const handleLogout = () => {
    // TODO: Clear auth state
    router.push('/');
  };

  return (
    <header style={{
      height: '60px',
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e0e0e0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 20px',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button
          onClick={onToggleSidebar}
          style={{
            padding: '8px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '18px',
            color: '#333',
          }}
        >
          ☰
        </button>
        <div style={{ fontSize: '18px', fontWeight: '600', color: '#333' }}>
          Coaching Ops
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{ fontSize: '14px', color: '#666' }}>
          Role: {role}
        </span>
        <button
          onClick={handleLogout}
          style={{
            padding: '8px 16px',
            backgroundColor: '#dc3545',
            color: '#ffffff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          Logout
        </button>
      </div>
    </header>
  );
}
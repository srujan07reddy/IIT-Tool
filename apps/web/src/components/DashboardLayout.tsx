import { useState, useEffect } from 'react';
import AppHeader from './AppHeader';
import AppSidebar from './AppSidebar';

interface DashboardLayoutProps {
  role: string;
  children: React.ReactNode;
}

export default function DashboardLayout({ role, children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    handleResize(); // Set initial
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <AppHeader role={role} isSidebarOpen={isSidebarOpen} onToggleSidebar={toggleSidebar} />
      <AppSidebar role={role} isOpen={isSidebarOpen} />
      <main
        style={{
          marginLeft: isSidebarOpen && window.innerWidth > 768 ? '250px' : '0',
          marginTop: '60px',
          padding: '20px',
          transition: 'margin-left 0.3s ease',
        }}
      >
        {children}
      </main>
    </div>
  );
}
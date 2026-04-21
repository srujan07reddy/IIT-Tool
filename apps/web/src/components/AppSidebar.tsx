'use client';

import { useState } from 'react';
import Link from 'next/link';

interface AppSidebarProps {
  role: string;
  isOpen: boolean;
}

const menuItems = {
  student: [
    { label: 'Dashboard', href: '/student' },
    { label: 'Courses', href: '/student/courses' },
    { label: 'Grades', href: '/student/grades' },
    { label: 'Profile', href: '/student/profile' },
  ],
  staff: [
    { label: 'Dashboard', href: '/staff' },
    { label: 'Students', href: '/staff/students' },
    { label: 'Courses', href: '/staff/courses' },
    { label: 'Reports', href: '/staff/reports' },
  ],
  admin: [
    { label: 'Dashboard', href: '/admin' },
    { label: 'Users', href: '/admin/users' },
    { label: 'Settings', href: '/admin/settings' },
    { label: 'Analytics', href: '/admin/analytics' },
  ],
  technician: [
    { label: 'Dashboard', href: '/technician' },
    { label: 'Systems', href: '/technician/systems' },
    { label: 'Maintenance', href: '/technician/maintenance' },
    { label: 'Logs', href: '/technician/logs' },
  ],
};

export default function AppSidebar({ role, isOpen }: AppSidebarProps) {
  const items = menuItems[role.toLowerCase() as keyof typeof menuItems] || [];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
          }}
          onClick={() => {}} // Prevent closing on overlay click for now
        />
      )}

      <aside
        style={{
          position: 'fixed',
          top: '60px',
          left: 0,
          width: '250px',
          height: 'calc(100vh - 60px)',
          backgroundColor: '#ffffff',
          borderRight: '1px solid #e0e0e0',
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Menu Items */}
        <nav style={{ padding: '20px 0' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {items.map((item) => (
              <li key={item.href} style={{ marginBottom: '8px' }}>
                <Link
                  href={item.href}
                  style={{
                    display: 'block',
                    padding: '12px 20px',
                    textDecoration: 'none',
                    color: '#333',
                    fontSize: '16px',
                    borderRadius: '4px',
                    margin: '0 10px',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f0f0f0';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
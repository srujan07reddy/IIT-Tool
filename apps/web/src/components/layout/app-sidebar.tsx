'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, Settings, BookOpen, FileText } from 'lucide-react';
import { useEffect, useState } from 'react';

export function AppSidebar() {
  const pathname = usePathname();
  const [role, setRole] = useState<string>('');

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      setRole(user.role);
    }
  }, []);

  const getLinks = () => {
    if (!role) return [];
    
    const baseLinks = [{ href: `/${role.toLowerCase()}`, label: 'Dashboard', icon: Home }];
    
    if (role === 'ADMIN') {
      baseLinks.push({ href: '/dashboard/users', label: 'User Management', icon: Users });
      baseLinks.push({ href: '/dashboard/settings', label: 'System Settings', icon: Settings });
      baseLinks.push({ href: '/students', label: 'Student Directory', icon: Users });
    }
    if (role === 'STAFF') {
      baseLinks.push({ href: '/students', label: 'Student Directory', icon: Users });
    }
    if (role === 'STUDENT') {
      baseLinks.push({ href: '/student/syllabus', label: 'My Syllabus', icon: BookOpen });
    }
    if (role === 'TECHNICIAN') {
      baseLinks.push({ href: '/technician/register', label: 'Register Student', icon: Users });
    }
    if (role === 'STAFF' || role === 'ADMIN' || role === 'OPERATIONS') {
      baseLinks.push({ href: '/dashboard/applications', label: 'Applications', icon: FileText });
    }
    return baseLinks;
  };

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen flex flex-col border-r border-gray-800">
      <div className="p-5 text-2xl font-bold border-b border-gray-800 tracking-wider">IIT ERP</div>
      <nav className="flex-1 p-4 space-y-2 mt-4">
        {getLinks().map((link) => (
          <Link key={link.href} href={link.href} className={`flex items-center gap-3 p-3 rounded-md transition-colors ${pathname.startsWith(link.href) ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}>
            <link.icon className="w-5 h-5" />
            <span className="font-medium">{link.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
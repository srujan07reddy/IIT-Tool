'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LogOut, User } from 'lucide-react';

export function AppHeader() {
  const router = useRouter();
  const [user, setUser] = useState<{ firstName: string; lastName: string; role: string } | null>(null);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) setUser(JSON.parse(userStr));
  }, []);

  const handleLogout = () => {
    // Clear cache, local state, and cookies
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    router.push('/');
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm z-10 sticky top-0">
      <h2 className="text-xl font-semibold text-gray-800 capitalize tracking-tight">{user?.role.toLowerCase()} Portal</h2>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-200">
          <User className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">{user?.firstName} {user?.lastName}</span>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 text-red-600 hover:text-red-800 text-sm font-semibold transition-colors bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-full">
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </header>
  );
}
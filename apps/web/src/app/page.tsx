'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Button, Input } from '@coaching-ops/ui';

/**
 * Available system roles for the ERP portal.
 */
const ROLES = ['ADMIN', 'STAFF', 'STUDENT', 'TECHNICIAN', 'ACCOUNT'] as const;
type Role = typeof ROLES[number];

/**
 * Root Login Page
 * 
 * A clean, professional entry point for the Coaching Ops ERP.
 * Features glassmorphism design and role-based toggle.
 */
export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<Role>('STUDENT');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:3001/auth/login', {
        email,
        password,
        role: selectedRole.toLowerCase(),
      });

      if (response.data.access_token) {
        // Store token (in a real app, use secure storage)
        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        // Set cookie for Next.js Middleware route guards
        document.cookie = `token=${response.data.access_token}; path=/; max-age=86400`;
        
        // Redirect to role-specific dashboard
        router.push(`/${selectedRole.toLowerCase()}`);
      } else {
        setError(response.data.error || 'Login failed');
      }
    } catch (error: any) {
      setError(error.response?.data?.error || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50 p-4 font-sans">
      <div className="max-w-md w-full bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/60 p-8 sm:p-10 transition-all duration-500 hover:shadow-indigo-100/50">
        <header className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-100 to-purple-50 text-indigo-600 mb-6 shadow-inner transform transition-transform duration-500 hover:rotate-12 hover:scale-110">
            <span className="text-3xl" role="img" aria-label="College Logo">🎓</span>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">College ERP</h1>
          <p className="text-sm text-gray-500 font-medium">Welcome back! Please select your role.</p>
        </header>

        <section className="flex flex-wrap justify-center gap-2 mb-8">
          {ROLES.map((role) => (
            <button
              key={role}
              type="button"
              className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-300 border ${
                selectedRole === role
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200 transform scale-105'
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-indigo-300 hover:text-indigo-600 hover:-translate-y-0.5'
              }`}
              onClick={() => setSelectedRole(role)}
            >
              {role}
            </button>
          ))}
        </section>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1.5 group">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 transition-colors group-focus-within:text-indigo-600">Email Address</label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                placeholder="name@college.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-gray-50/50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 hover:border-indigo-300 hover:bg-white px-4 py-2.5"
                autoComplete="email"
              />
            </div>
          </div>

          <div className="space-y-1.5 group">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 transition-colors group-focus-within:text-indigo-600">Password</label>
            <div className="relative">
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-gray-50/50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 hover:border-indigo-300 hover:bg-white px-4 py-2.5"
                autoComplete="current-password"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-100 rounded-xl animate-pulse">
              <p className="text-sm text-red-600 font-semibold text-center">{error}</p>
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold py-3.5 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-200 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none mt-4"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : `Login as ${selectedRole.charAt(0) + selectedRole.slice(1).toLowerCase()}`}
          </Button>
        </form>
      </div>
    </main>
  );
}

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Button, Input } from '@coaching-ops/ui';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, User, Terminal, ChevronRight } from 'lucide-react';

const ROLES = ['ADMIN', 'STAFF', 'STUDENT', 'TECHNICIAN'] as const;
type Role = typeof ROLES[number];

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
      // Simulation or real API call
      const response = await axios.post('http://localhost:3001/auth/login', {
        email,
        password,
        role: selectedRole.toLowerCase(),
      });

      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        document.cookie = `token=${response.data.access_token}; path=/; max-age=86400`;
        router.push(`/${selectedRole.toLowerCase()}`);
      } else {
        setError(response.data.error || 'Authorization Failed');
      }
    } catch (error: any) {
      setError(error.response?.data?.error || 'Connection Timeout');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#020202] overflow-hidden relative font-sans text-[#E0E0E0]">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#003344_0%,transparent_70%)] opacity-30" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        className="max-w-md w-full z-10 p-1"
      >
        <div className="bg-[#0a0a0a]/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
          <div className="h-1 bg-gradient-to-right from-transparent via-[#00F3FF] to-transparent opacity-50" />
          
          <div className="p-8 sm:p-10">
            <header className="text-center mb-10">
              <motion.div 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#00F3FF]/20 to-[#0072FF]/20 border border-[#00F3FF]/30 text-[#00F3FF] mb-6 shadow-[0_0_30px_rgba(0,243,255,0.1)]"
              >
                <Shield size={40} className="drop-shadow-[0_0_8px_#00F3FF]" />
              </motion.div>
              
              <motion.h1 
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-4xl font-black tracking-tighter mb-2 bg-gradient-to-b from-white to-[#A0A0A0] bg-clip-text text-transparent"
              >
                TACTICAL ERP
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xs text-[#00F3FF] font-bold uppercase tracking-[0.3em]"
              >
                Secure Access Terminal
              </motion.p>
            </header>

            <section className="grid grid-cols-2 gap-2 mb-8">
              {ROLES.map((role, idx) => (
                <motion.button
                  key={role}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  whileHover={{ backgroundColor: 'rgba(0, 243, 255, 0.1)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedRole(role)}
                  className={`px-4 py-3 rounded-lg text-[10px] font-black tracking-widest uppercase transition-all duration-300 border flex items-center justify-between ${
                    selectedRole === role
                      ? 'bg-[#00F3FF] text-[#050505] border-[#00F3FF] shadow-[0_0_20px_rgba(0,243,255,0.3)]'
                      : 'bg-white/5 text-white/50 border-white/10 hover:border-[#00F3FF]/50 hover:text-[#00F3FF]'
                  }`}
                >
                  {role}
                  {selectedRole === role && <ChevronRight size={14} />}
                </motion.button>
              ))}
            </section>

            <form onSubmit={handleLogin} className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="space-y-2 group"
              >
                <div className="flex items-center gap-2 px-1">
                  <User size={14} className="text-[#00F3FF]" />
                  <label className="text-[10px] font-black text-white/50 uppercase tracking-widest">Operator Identity</label>
                </div>
                <Input
                  type="email"
                  placeholder="ID_0x00@college.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white/5 border-white/10 focus:border-[#00F3FF] transition-all py-6 rounded-xl"
                />
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="space-y-2 group"
              >
                <div className="flex items-center gap-2 px-1">
                  <Lock size={14} className="text-[#00F3FF]" />
                  <label className="text-[10px] font-black text-white/50 uppercase tracking-widest">Security Token</label>
                </div>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-white/5 border-white/10 focus:border-[#00F3FF] transition-all py-6 rounded-xl"
                />
              </motion.div>

              <AnimatePresence>
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-3 bg-red-500/10 border border-red-500/50 rounded-xl"
                  >
                    <p className="text-[10px] text-red-500 font-bold text-center tracking-widest uppercase">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                <Button 
                  type="submit" 
                  className="w-full py-7 rounded-xl"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <Terminal size={16} className="animate-pulse" />
                      Authenticating...
                    </span>
                  ) : (
                    `Initialize Session`
                  )}
                </Button>
              </motion.div>
            </form>
          </div>
          
          <footer className="px-8 py-4 bg-white/[0.02] border-t border-white/5 text-center">
            <p className="text-[9px] text-white/30 font-medium tracking-widest uppercase">
              Encrypted Connection Established • v1.0.4-build
            </p>
          </footer>
        </div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 border-l border-t border-[#00F3FF]/20 rounded-tl-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-32 h-32 border-r border-b border-[#00F3FF]/20 rounded-br-3xl pointer-events-none" />
    </main>
  );
}

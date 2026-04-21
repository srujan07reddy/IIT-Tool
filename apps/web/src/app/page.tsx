'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Button, Input } from '@coaching-ops/ui';
import styles from './page.module.css';

/**
 * Available system roles for the ERP portal.
 */
const ROLES = ['ADMIN', 'STAFF', 'STUDENT', 'TECHNICIAN'] as const;
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
    <main className={styles.container}>
      <div className={styles.card}>
        <header className={styles.header}>
          <div className={styles.logoContainer}>
            <span role="img" aria-label="College Logo">🎓</span>
          </div>
          <h1 className={styles.title}>College ERP</h1>
          <p className={styles.subtitle}>Welcome back! Please select your role.</p>
        </header>

        <section className={styles.roleGrid}>
          {ROLES.map((role) => (
            <button
              key={role}
              type="button"
              className={`${styles.roleButton} ${selectedRole === role ? styles.roleButtonActive : ''}`}
              onClick={() => setSelectedRole(role)}
            >
              {role}
            </button>
          ))}
        </section>

        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.fieldGroup}>
            <label htmlFor="email" className={styles.label}>Email Address</label>
            <Input
              id="email"
              type="email"
              placeholder="name@college.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.inputField}
              autoComplete="email"
            />
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="password" className={styles.label}>Password</label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.inputField}
              autoComplete="current-password"
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <Button 
            type="submit" 
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : `Login as ${selectedRole.charAt(0) + selectedRole.slice(1).toLowerCase()}`}
          </Button>
        </form>
      </div>
    </main>
  );
}

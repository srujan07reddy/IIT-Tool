'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input } from '@coaching-ops/ui';
import styles from './page.module.css';

const roles = ['ADMIN', 'STAFF', 'STUDENT', 'TECHNICIAN'] as const;
type Role = typeof roles[number];

export default function LoginPortal() {
  const [selectedRole, setSelectedRole] = useState<Role>('STUDENT');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement authentication logic
    console.log('Login attempt:', { role: selectedRole, email, password });
    // Redirect based on role
    router.push(`/${selectedRole.toLowerCase()}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.logo}>🎓</div>
          <h1 className={styles.title}>Coaching Ops</h1>
          <p className={styles.subtitle}>Academic Management System</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Role Selection */}
          <div className={styles.roleSelector}>
            {roles.map((role) => (
              <button
                key={role}
                type="button"
                className={`${styles.roleButton} ${selectedRole === role ? styles.active : ''}`}
                onClick={() => setSelectedRole(role)}
              >
                {role}
              </button>
            ))}
          </div>

          {/* Email */}
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Email</label>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.input}
            />
          </div>

          {/* Password */}
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Password</label>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.input}
            />
          </div>

          {/* Sign In Button */}
          <Button type="submit" className={styles.submitButton}>
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}

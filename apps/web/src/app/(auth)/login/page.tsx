"use client";

import React, { useState } from 'react';
import { Button, Input } from "@coaching-ops/ui"; // Shared brain imports [cite: 181, 423]
import styles from './login.module.css';

type Role = 'ADMIN' | 'STAFF' | 'STUDENT' | 'TECHNICIAN';

export default function LoginPage() {
  const [role, setRole] = useState<Role>('STUDENT');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Logic for auth gateway would go here [cite: 451]
    console.log(`Logging in as ${role}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <div className={styles.header}>
          <h1 className={styles.title}>College Portal</h1>
          <p className={styles.subtitle}>Select your identity to continue</p>
        </div>

        {/* Role Selector [cite: 421, 450] */}
        <div className={styles.roleTabs}>
          {(['ADMIN', 'STAFF', 'STUDENT', 'TECHNICIAN'] as Role[]).map((r) => (
            <button
              key={r}
              className={`${styles.roleButton} ${role === r ? styles.activeRole : ''}`}
              onClick={() => setRole(r)}
            >
              {r}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Node Identifier (Email)</label>
            <Input 
              type="email" 
              placeholder="name@college.edu" 
              required 
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Access Key (Password)</label>
            <Input 
              type="password" 
              placeholder="••••••••" 
              required 
            />
          </div>

          <Button 
            variant="primary" 
            type="submit" 
            className={styles.submitBtn}
            disabled={isLoading}
          >
            {isLoading ? 'Decrypting Access...' : `Login as ${role}`}
          </Button>
        </form>

        <footer className={styles.footer}>
          <a href="/forgot-password">Forgot Access Key?</a>
        </footer>
      </div>
    </div>
  );
}
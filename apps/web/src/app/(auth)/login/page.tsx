'use client';

import { useState } from 'react';
import { Button, Input } from '@coaching-ops/ui';
import styles from './page.module.css';

const roles = ['ADMIN', 'STAFF', 'STUDENT', 'PARENT'] as const;
type Role = typeof roles[number];

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<Role>('STUDENT');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement authentication logic
    console.log('Login attempt:', { role: selectedRole, email, password });
  };

  return (
    <div className={styles.loginRoot}>
      <div className={styles.gridOverlay} aria-hidden="true" />
      <div className={styles.loginCard}>
        <div className={styles.cardHeader}>
          <h1>Operator Access</h1>
          <p>Select your role and authenticate to enter the secure platform.</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className={styles.roleSelector}>
            <label htmlFor="role-select" className={styles.roleLabel}>
              Role Selection
            </label>
            <select
              id="role-select"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as Role)}
              className={styles.roleSelect}
            >
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.fieldGroup}>
            <Input
              type="email"
              placeholder="Node Identifier (Email)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.inputField}
            />
          </div>

          <div className={styles.fieldGroup}>
            <Input
              type="password"
              placeholder="Access Key (Password)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.inputField}
            />
          </div>

          <Button type="submit" className={styles.submitButton}>
            Authenticate
          </Button>
        </form>
      </div>
    </div>
  );
}

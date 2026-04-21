'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { User } from '@coaching-ops/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Card, Input, Text } from '@coaching-ops/ui';
import { LoginSchema, type LoginInput } from '@coaching-ops/validation';

import { loginUser } from '@/services/auth.service';
import { useAuthStore } from '@/store/useAuthStore';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [authError, setAuthError] = useState<string | null>(null);
  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: 'admin@coachingops.dev',
      password: 'Password123',
    },
  });

  const onSubmit = async (values: LoginInput) => {
    setAuthError(null);
    try {
      const response = await loginUser(values);
      const user: User = {
        id: response.user.id,
        email: response.user.email,
        firstName: response.user.firstName,
        lastName: response.user.lastName,
        role: response.user.role,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isActive: true,
      };
      login({ token: response.accessToken, user });
      router.replace(searchParams.get('from') || '/dashboard');
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : 'Unable to sign in right now.');
    }
  };

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        padding: 24,
        background:
          'radial-gradient(circle at top, rgba(56, 189, 248, 0.18), transparent 26%), linear-gradient(180deg, #020617 0%, #0f172a 100%)',
      }}
    >
      <Card
        style={{
          width: 'min(460px, 100%)',
          padding: 32,
          background: 'rgba(15, 23, 42, 0.55)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(125, 211, 252, 0.14)',
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'grid', gap: 18 }}>
          <div style={{ display: 'grid', gap: 8 }}>
            <Text style={{ color: '#7dd3fc', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Secure Access
            </Text>
            <h1 style={{ margin: 0, fontSize: '2rem' }}>Sign in to Coaching Ops</h1>
            <Text>Use `admin@...`, `faculty@...`, or `ops@...` to preview role-aware navigation.</Text>
          </div>

          <label style={{ display: 'grid', gap: 8 }}>
            <span>Email</span>
            <Input type="email" {...register('email')} />
            {errors.email ? <Text style={{ color: '#fca5a5' }}>{errors.email.message}</Text> : null}
          </label>

          <label style={{ display: 'grid', gap: 8 }}>
            <span>Password</span>
            <Input type="password" {...register('password')} />
            {errors.password ? <Text style={{ color: '#fca5a5' }}>{errors.password.message}</Text> : null}
          </label>

          {authError ? <Text style={{ color: '#fca5a5' }}>{authError}</Text> : null}

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Signing in...' : 'Continue to dashboard'}
          </Button>
        </form>
      </Card>
    </main>
  );
}

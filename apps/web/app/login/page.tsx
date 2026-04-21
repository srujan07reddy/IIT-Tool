'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '@/lib/api';
import { loginSchema, type LoginInput } from '@coaching-ops/validation';
import { useAuthStore } from '@/store/useAuthStore';
import { Button, Card, Input, Text } from '@coaching-ops/ui';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const login = useAuthStore((state) => state.login);
  const from = searchParams.get('from') || '/dashboard';

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    setLoading(true);
    setError('');
    try {
      const { data: response } = await api.post('/auth/login', data);
      login(response.data);
      router.push(from);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Card className="w-full max-w-md border-0 shadow-2xl">
        <div className="p-8">
          <div className="mx-auto mb-8 w-fit rounded-xl bg-gradient-to-r from-blue-500 to-teal-600 p-4">
            <Text className="text-2xl font-bold text-white">Login</Text>
          </div>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="email" className="block mb-1 text-sm font-medium">Email</label>
              <Input id="email" {...form.register('email')} />
              {form.formState.errors.email && (
                <Text className="mt-1 text-sm text-destructive">{form.formState.errors.email.message}</Text>
              )}
            </div>
            <div>
              <label htmlFor="password" className="block mb-1 text-sm font-medium">Password</label>
              <Input id="password" type="password" {...form.register('password')} />
              {form.formState.errors.password && (
                <Text className="mt-1 text-sm text-destructive">{form.formState.errors.password.message}</Text>
              )}
            </div>
            {error && (
              <Text className="text-destructive text-sm">{error}</Text>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}

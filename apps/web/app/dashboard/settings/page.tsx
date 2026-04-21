'use client';

import { useState } from 'react';
import { api } from '@/lib/api';
import { updateOwnPasswordSchema } from '@coaching-ops/validation';
import { Button, Card, Input, Label, Text } from '@coaching-ops/ui';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

type FormData = {
  currentPassword: string;
  newPassword: string;
};

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const form = useForm<FormData>({
    resolver: zodResolver(updateOwnPasswordSchema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await api.patch('/users/me/password', data);
      setSuccess('Password updated successfully');
      form.reset();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Text className="text-3xl font-bold">Settings</Text>
      <Card className="max-w-md">
        <div className="p-8">
          <Text className="mb-6 text-xl font-bold">Change Password</Text>
          {error && <Text className="mb-4 text-destructive">{error}</Text>}
          {success && <Text className="mb-4 text-green-500">{success}</Text>}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input id="currentPassword" type="password" {...form.register('currentPassword')} />
            </div>
            <div>
              <Label htmlFor="newPassword">New Password</Label>
              <Input id="newPassword" type="password" {...form.register('newPassword')} />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                'Update Password'
              )}
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}

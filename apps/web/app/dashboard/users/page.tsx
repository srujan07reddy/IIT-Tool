'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { adminCreateUserSchema } from '@coaching-ops/validation';
import { Button, Card, Dialog, Input, Label, Select, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Text } from '@coaching-ops/ui';
import { Plus, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  isActive: boolean;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState('');

  const form = useForm({
    resolver: zodResolver(adminCreateUserSchema),
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await api.get('/users');
      setUsers(data.data || []);
    } catch (err) {
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (data: any) => {
    setSubmitLoading(true);
    setError('');
    try {
      await api.post('/users', data);
      setOpen(false);
      form.reset();
      fetchUsers();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create user');
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) {
    return <div>Loading users...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Text className="text-3xl font-bold">User Management</Text>
        <Button onClick={() => setOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.email}</TableCell>
                <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Text className={user.isActive ? 'text-green-500' : 'text-destructive'}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </Text>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <div className="space-y-4">
          <Text className="text-xl font-bold">Create New User</Text>
          {error && <Text className="text-destructive">{error}</Text>}
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" {...form.register('email')} />
            </div>
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" {...form.register('firstName')} />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" {...form.register('lastName')} />
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              <Select {...form.register('role')} onChange={(e) => form.setValue('role', e.target.value)}>
                <option value="STAFF">Staff</option>
                <option value="TECHNICIAN">Technician</option>
                <option value="ACCOUNT">Account</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" {...form.register('password')} />
            </div>
            <div className="flex gap-4 pt-4">
              <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" onClick={form.handleSubmit(createUser)} disabled={submitLoading}>
                {submitLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Create User
              </Button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

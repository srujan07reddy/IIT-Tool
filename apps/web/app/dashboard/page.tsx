'use client';

import { Card, CardContent, CardHeader, CardTitle, Text, Badge, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@coaching-ops/ui';
import { Users, Students, BookOpen, FileText, BarChart3 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Metric {
  value: string;
  change: number;
  label: string;
  icon: React.ReactNode;
}

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<Metric[]>([]);

  useEffect(() => {
    setMetrics([
      { value: '247', change: 12, label: 'Active Students', icon: <Students className="h-6 w-6" /> },
      { value: '89', change: -2, label: 'Faculty Users', icon: <Users className="h-6 w-6" /> },
      { value: '156', change: 8, label: 'Topics Covered', icon: <BookOpen className="h-6 w-6" /> },
      { value: '23', change: 5, label: 'Pending Apps', icon: <FileText className="h-6 w-6" /> },
    ]);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <Text className="text-3xl font-bold tracking-tight">Dashboard</Text>
        <Text className="text-muted-foreground">Quick overview of operations.</Text>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.label}</CardTitle>
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted">
                {metric.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <Text className={`text-sm ${metric.change >= 0 ? 'text-emerald-500' : 'text-destructive'}`}>
                {metric.change >= 0 ? '+' : ''}{metric.change}% from last month
              </Text>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Stage</TableHead>
                  <TableHead>Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>John Doe</TableCell>
                  <TableCell><Badge>Docs Pending</Badge></TableCell>
                  <TableCell>2 days ago</TableCell>
                </TableRow>
                {/* More */}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Readiness Heatmap</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg flex items-center justify-center">
              <Text>Interactive Heatmap (Recharts impl)</Text>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Batch Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <Text>Batch Alpha</Text>
                <div className="w-24 bg-green-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full w-3/4" />
                </div>
                <Text>78%</Text>
              </div>
              <div className="flex justify-between">
                <Text>Batch Beta</Text>
                <div className="w-24 bg-yellow-200 rounded-full h-2">
                  <div className="bg-yellow-600 h-2 rounded-full w-1/2" />
                </div>
                <Text>52%</Text>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

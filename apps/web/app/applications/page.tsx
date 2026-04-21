'use client';

import { useState } from 'react';
import { Card, Text, Badge, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Button, Select } from '@coaching-ops/ui';
import { Plus, Download } from 'lucide-react';

const stages = ['DRAFT', 'DOCS_PENDING', 'READY', 'SUBMITTED', 'APPROVED', 'REJECTED'];

export default function ApplicationsPage() {
  const [selectedStage, setSelectedStage] = useState('ALL');

  // Mock data - replace with api.get('/applications')
  const applications = [
    { id: '1', studentName: 'John Doe', stage: 'DOCS_PENDING', documents: 3, updated: '2024-01-15' },
    { id: '2', studentName: 'Jane Smith', stage: 'READY', documents: 5, updated: '2024-01-14' },
    { id: '3', studentName: 'Bob Johnson', stage: 'SUBMITTED', documents: 4, updated: '2024-01-13' },
  ];

  const filteredApps = selectedStage === 'ALL' ? applications : applications.filter(app => app.stage === selectedStage);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Text className="text-3xl font-bold">Exam Applications</Text>
        <div className="flex gap-2">
          <Button variant="ghost">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Select value={selectedStage} onChange={(e) => setSelectedStage(e.target.value)}>
            <option value="ALL">All Stages</option>
            {stages.map(stage => <option key={stage} value={stage}>{stage.replace('_', ' ')}</option>)}
          </Select>
        </div>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Stage</TableHead>
              <TableHead>Documents</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredApps.map((app) => (
              <TableRow key={app.id}>
                <TableCell className="font-medium">{app.studentName}</TableCell>
                <TableCell>
                  <Badge>{app.stage.replace('_', ' ')}</Badge>
                </TableCell>
                <TableCell>{app.documents}</TableCell>
                <TableCell>{app.updated}</TableCell>
                <TableCell>
                  <Button variant="ghost">
                    <a href={`/applications/${app.id}`}>View Timeline</a>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

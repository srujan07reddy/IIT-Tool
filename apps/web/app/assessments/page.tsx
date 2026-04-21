'use client';

import { useState } from 'react';
import { Card, Text, Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Badge } from '@coaching-ops/ui';
import { Upload, Filter } from 'lucide-react';

export default function AssessmentsPage() {
  const [activeTab, setActiveTab] = useState('question-bank');

  const tabs = [
    { id: 'question-bank', label: 'Question Bank' },
    { id: 'omr-upload', label: 'OMR Upload' },
  ];

  return (
    <div className="space-y-6">
      <Text className="text-3xl font-bold">Assessments</Text>
      <div className="flex gap-4 border-b">
        {tabs.map(tab => (
            <Button
              variant={activeTab === tab.id ? 'secondary' : 'ghost'}
              onClick={() => setActiveTab(tab.id)}
              className="rounded-none border-b-2"
            >
            {tab.label}
          </Button>
        ))}
      </div>

      {activeTab === 'question-bank' && (
        <Card>
          <div className="p-6 flex items-center justify-between">
            <Text className="text-xl font-bold">Question Bank</Text>
            <Button>
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Question</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead>Tags</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>What is Newton's first law?</TableCell>
                <TableCell>Physics</TableCell>
                <TableCell><Badge>Medium</Badge></TableCell>
                <TableCell>Mechanics, Motion</TableCell>
              </TableRow>
              {/* More rows */}
            </TableBody>
          </Table>
        </Card>
      )}

      {activeTab === 'omr-upload' && (
        <Card>
          <div className="p-6">
            <Text className="text-xl font-bold mb-4">Bulk OMR Sheet Upload</Text>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <Text className="text-lg mb-2">Drag & drop OMR sheets</Text>
              <Text className="text-sm text-muted-foreground mb-6">or click to browse</Text>
              <Button className="w-40">
                Upload Sheets
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

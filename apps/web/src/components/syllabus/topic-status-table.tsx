'use client';

import { useState } from 'react';
import type { SubjectHierarchy, TopicStatus } from '@coaching-ops/types';
import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Text,
} from '@coaching-ops/ui';

import { updateTopicStatus } from '@/services/syllabus.service';

const toneMap: Record<TopicStatus, 'warning' | 'info' | 'success'> = {
  PENDING: 'warning',
  IN_PROGRESS: 'info',
  COMPLETED: 'success',
};

export function TopicStatusTable({ data }: { data: SubjectHierarchy[] }) {
  const [tree, setTree] = useState(data);
  const [savingTopicId, setSavingTopicId] = useState<string | null>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Topic progress</CardTitle>
        <Text>Faculty can update individual topic states inline without losing the subject and chapter context.</Text>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Subject</TableHead>
              <TableHead>Chapter</TableHead>
              <TableHead>Topic</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Update</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tree.flatMap((subject) =>
              subject.chapters.flatMap((chapter) =>
                chapter.topics.map((topic) => {
                  const status = topic.progress?.status ?? 'PENDING';
                  const saving = savingTopicId === topic.id;

                  return (
                    <TableRow key={topic.id}>
                      <TableCell>{subject.name}</TableCell>
                      <TableCell>{chapter.name}</TableCell>
                      <TableCell>{topic.name}</TableCell>
                      <TableCell>
                        <Badge tone={toneMap[status]}>{status.replace('_', ' ')}</Badge>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={status}
                          disabled={saving}
                          onChange={async (event) => {
                            const nextStatus = event.target.value as TopicStatus;
                            setSavingTopicId(topic.id);
                            const nextTree = await updateTopicStatus(topic.id, nextStatus);
                            setTree([...nextTree]);
                            setSavingTopicId(null);
                          }}
                        >
                          <option value="PENDING">Pending</option>
                          <option value="IN_PROGRESS">In Progress</option>
                          <option value="COMPLETED">Completed</option>
                        </Select>
                      </TableCell>
                    </TableRow>
                  );
                }),
              ),
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

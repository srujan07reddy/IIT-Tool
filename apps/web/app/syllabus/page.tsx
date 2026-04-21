'use client';

import { useState, useEffect } from 'react';
import { getFullSyllabusTree, updateTopicStatus, getSubjectProgress } from '@/services/syllabus.service';
import { Button, Card, Select, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Text } from '@coaching-ops/ui';
import { ChevronDown, ChevronRight } from 'lucide-react';
import type { TopicStatus } from '@coaching-ops/types';

interface Topic {
  id: string;
  name: string;
  status: TopicStatus;
}

interface Chapter {
  id: string;
  name: string;
  topics: Topic[];
  expanded: boolean;
}

interface Subject {
  id: string;
  name: string;
  chapters: Chapter[];
  progress: number;
  expanded: boolean;
}

export default function SyllabusPage() {
  const [syllabus, setSyllabus] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSyllabus();
  }, []);

  const loadSyllabus = async () => {
    try {
      const tree = await getFullSyllabusTree();
      const subjects: Subject[] = tree.subjects.map((subject: any) => ({
        id: subject.id,
        name: subject.name,
        chapters: subject.chapters.map((chapter: any) => ({
          id: chapter.id,
          name: chapter.name,
          topics: chapter.topics,
          expanded: false,
        })),
        progress: 0,
        expanded: true,
      }));
      setSyllabus(subjects);
      // Load progress
      for (const subject of subjects) {
        subject.progress = await getSubjectProgress(subject.id);
      }
      setSyllabus([...subjects]);
    } catch (err) {
      console.error('Failed to load syllabus', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpanded = (subjectOrChapter: Subject | Chapter) => {
    if ('expanded' in subjectOrChapter) {
      setSyllabus(syllabus.map(s => s.id === subjectOrChapter.id ? {...s, expanded: !s.expanded} : s));
    }
  };

  const handleStatusChange = async (topicId: string, status: TopicStatus) => {
    try {
      await updateTopicStatus(topicId, status);
      loadSyllabus(); // Reload to update progress
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  if (loading) return <div>Loading syllabus...</div>;

  return (
    <div className="space-y-6">
      <Text className="text-3xl font-bold">Syllabus Tracker</Text>
      <div className="space-y-4">
        {syllabus.map((subject) => (
          <Card key={subject.id}>
            <div className="p-6 cursor-pointer" onClick={() => toggleExpanded(subject)}>
              <div className="flex items-center justify-between">
                <div>
                  <Text className="text-xl font-bold">{subject.name}</Text>
                  <Text className="text-sm text-muted-foreground">{subject.progress}% complete</Text>
                </div>
                <Button variant="ghost">
                  {subject.expanded ? <ChevronDown /> : <ChevronRight />}
                </Button>
              </div>
            </div>
            {subject.expanded && (
              <div className="p-4 border-t">
                {subject.chapters.map((chapter) => (
                  <Card key={chapter.id} className="mb-4">
                    <div className="p-4 cursor-pointer" onClick={() => toggleExpanded(chapter)}>
                      <div className="flex items-center justify-between">
                        <Text className="font-semibold">{chapter.name}</Text>
                        <Button variant="ghost">
                          {chapter.expanded ? <ChevronDown /> : <ChevronRight />}
                        </Button>
                      </div>
                    </div>
                    {chapter.expanded && (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Topic</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {chapter.topics.map((topic) => (
                            <TableRow key={topic.id}>
                              <TableCell>{topic.name}</TableCell>
                              <TableCell>
                                <Select value={topic.status} onChange={(e) => handleStatusChange(topic.id, e.target.value as TopicStatus)}>
                                  <option value="PENDING">Pending</option>
                                  <option value="IN_PROGRESS">In Progress</option>
                                  <option value="COMPLETED">Completed</option>
                                </Select>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

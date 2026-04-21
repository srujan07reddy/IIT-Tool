'use client';

import { useEffect, useMemo, useState } from 'react';
import type { QuestionBankItem } from '@coaching-ops/types';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Heading,
  Input,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Text,
} from '@coaching-ops/ui';

import { listQuestionBank } from '@/services/assessments.service';

import styles from '../assessments.module.css';

export default function QuestionBankPage() {
  const [questions, setQuestions] = useState<QuestionBankItem[]>([]);
  const [subject, setSubject] = useState('ALL');
  const [chapter, setChapter] = useState('ALL');
  const [difficulty, setDifficulty] = useState('ALL');
  const [search, setSearch] = useState('');

  useEffect(() => {
    listQuestionBank().then(setQuestions);
  }, []);

  const filtered = useMemo(
    () =>
      questions.filter((question) => {
        return (
          (subject === 'ALL' || question.subject === subject) &&
          (chapter === 'ALL' || question.chapter === chapter) &&
          (difficulty === 'ALL' || question.difficulty === difficulty) &&
          question.prompt.toLowerCase().includes(search.toLowerCase())
        );
      }),
    [chapter, difficulty, questions, search, subject],
  );

  return (
    <div className={styles.page}>
      <div>
        <Heading>Question bank</Heading>
        <Text>Heavy assessment controls are isolated behind modular CSS and typed filters.</Text>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent className={styles.filterGrid}>
          <Input placeholder="Search prompt" value={search} onChange={(event) => setSearch(event.target.value)} />
          <Select value={subject} onChange={(event) => setSubject(event.target.value)}>
            <option value="ALL">All subjects</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Mathematics">Mathematics</option>
          </Select>
          <Select value={chapter} onChange={(event) => setChapter(event.target.value)}>
            <option value="ALL">All chapters</option>
            <option value="Mechanics">Mechanics</option>
            <option value="Atomic Structure">Atomic Structure</option>
            <option value="Limits">Limits</option>
          </Select>
          <Select value={difficulty} onChange={(event) => setDifficulty(event.target.value)}>
            <option value="ALL">All difficulty</option>
            <option value="EASY">Easy</option>
            <option value="MEDIUM">Medium</option>
            <option value="HARD">Hard</option>
          </Select>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead>Chapter</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead>Prompt</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((question) => (
                <TableRow key={question.id}>
                  <TableCell>{question.subject}</TableCell>
                  <TableCell>{question.chapter}</TableCell>
                  <TableCell>{question.difficulty}</TableCell>
                  <TableCell>{question.prompt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

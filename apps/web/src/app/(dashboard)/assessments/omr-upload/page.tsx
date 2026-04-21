'use client';

import { useMemo, useState } from 'react';
import type { OmrParseResult } from '@coaching-ops/types';
import { Button, Card, CardContent, CardHeader, CardTitle, Heading, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Text } from '@coaching-ops/ui';

import { parseOmrUploads } from '@/services/assessments.service';

import styles from '../assessments.module.css';

export default function OmrUploadPage() {
  const [results, setResults] = useState<OmrParseResult[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [queuedFiles, setQueuedFiles] = useState<File[]>([]);

  const progress = useMemo(() => (isUploading ? 60 : queuedFiles.length ? 100 : 0), [isUploading, queuedFiles.length]);

  return (
    <div className={styles.page}>
      <div>
        <Heading>Bulk OMR upload</Heading>
        <Text>Drag files into the zone below to simulate parsing, progress tracking, and failure summaries.</Text>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Upload zone</CardTitle>
        </CardHeader>
        <CardContent style={{ display: 'grid', gap: 16 }}>
          <label
            className={styles.dropZone}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
              event.preventDefault();
              setQueuedFiles(Array.from(event.dataTransfer.files));
            }}
          >
            <input
              type="file"
              multiple
              style={{ display: 'none' }}
              onChange={(event) => setQueuedFiles(Array.from(event.target.files ?? []))}
            />
            <strong>Drop OMR sheets here</strong>
            <Text>{queuedFiles.length ? `${queuedFiles.length} file(s) queued` : 'or click to choose scans'}</Text>
          </label>

          <div className={styles.progressShell}>
            <div className={styles.progressBar} style={{ width: `${progress}%` }} />
          </div>

          <Button
            type="button"
            disabled={!queuedFiles.length || isUploading}
            onClick={async () => {
              setIsUploading(true);
              const parsed = await parseOmrUploads(queuedFiles);
              setResults(parsed);
              setIsUploading(false);
            }}
          >
            {isUploading ? 'Parsing...' : 'Start processing'}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Success and error summary</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Roll No.</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Issue</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((result) => (
                <TableRow key={result.id}>
                  <TableCell>{result.studentName}</TableCell>
                  <TableCell>{result.rollNumber}</TableCell>
                  <TableCell>{result.status}</TableCell>
                  <TableCell>{result.reason ?? 'Parsed successfully'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

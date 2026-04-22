'use client';

import { useMemo, useState } from 'react';
import type { Document } from '@coaching-ops/types';
import { DocumentType, VerificationStatus } from '@coaching-ops/types';
import { Badge, Button, Card, CardContent, CardHeader, CardTitle, Input, Select, Text } from '@coaching-ops/ui';

const documentTypes: DocumentType[] = [
  DocumentType.ID_PROOF,
  DocumentType.PREVIOUS_MARKSHEET,
  DocumentType.PHOTO,
  DocumentType.ADDRESS_PROOF,
];

export function StudentDocumentsUpload({
  initialDocuments,
}: {
  initialDocuments: Document[];
}) {
  const [documents, setDocuments] = useState<Document[]>(initialDocuments);
  const [documentType, setDocumentType] = useState<DocumentType>(DocumentType.ID_PROOF);
  const [fileName, setFileName] = useState('');

  const previewCount = useMemo(() => documents.filter((item) => item.verificationStatus === VerificationStatus.VERIFIED).length, [documents]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Secure document upload</CardTitle>
        <Text>Uploads map directly to the shared `Document` type shape used across the frontend.</Text>
      </CardHeader>
      <CardContent style={{ display: 'grid', gap: 16 }}>
        <div style={{ display: 'grid', gap: 12, gridTemplateColumns: '1fr 1fr auto' }}>
          <Select value={documentType} onChange={(event) => setDocumentType(event.target.value as Document['documentType'])}>
            {documentTypes.map((type) => (
              <option key={type} value={type}>
                {type.replaceAll('_', ' ')}
              </option>
            ))}
          </Select>
          <Input
            placeholder="student-id-proof.pdf"
            value={fileName}
            onChange={(event) => setFileName(event.target.value)}
          />
          <Button
            type="button"
            onClick={() => {
              if (!fileName.trim()) return;
              setDocuments((current) => [
                {
                  id: `doc-${current.length + 1}`,
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                  studentId: initialDocuments[0]?.studentId ?? 'student-preview',
                  documentType,
                  fileUrl: `/uploads/${fileName.trim()}`,
                  verificationStatus: VerificationStatus.PENDING,
                },
                ...current,
              ]);
              setFileName('');
            }}
          >
            Add file
          </Button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <Text>{documents.length} file(s) staged</Text>
          <Badge tone="info">{previewCount} verified</Badge>
        </div>

        <div style={{ display: 'grid', gap: 10 }}>
          {documents.map((document) => (
            <div
              key={document.id}
              style={{
                borderRadius: 16,
                border: '1px solid rgba(148, 163, 184, 0.14)',
                padding: '0.9rem 1rem',
                display: 'flex',
                justifyContent: 'space-between',
                gap: 12,
              }}
            >
              <div>
                <div style={{ fontWeight: 700 }}>{document.documentType.replaceAll('_', ' ')}</div>
                <Text>{document.fileUrl}</Text>
              </div>
              <Badge tone={document.verificationStatus === VerificationStatus.VERIFIED ? 'success' : 'warning'}>
                {document.verificationStatus === VerificationStatus.VERIFIED ? 'Verified' : 'Pending'}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { 
  Button, 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell, 
  Badge 
} from '@coaching-ops/ui';
import { apiClient } from '../../services/api-client';

export function DocumentVerificationChecklist({ studentId }: { studentId: string }) {
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDocuments = useCallback(async () => {
    try {
      const res = await apiClient.get(`/students/${studentId}/documents`);
      setDocuments(res.data || []);
    } catch (error) {
      console.error('Failed to fetch documents', error);
    } finally {
      setLoading(false);
    }
  }, [studentId]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const updateVerificationStatus = async (docId: string, status: 'VERIFIED' | 'REJECTED') => {
    try {
      await apiClient.patch(`/students/${studentId}/documents/${docId}/verify`, { status });
      fetchDocuments(); // Refresh list after update
    } catch (error) {
      console.error('Failed to update verification status', error);
      alert('Failed to update document status.');
    }
  };

  if (loading) return <div className="text-sm text-gray-500 p-4">Loading verification checklist...</div>;

  return (
    <Card className="border-t-4 border-t-blue-600 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Verification Checklist</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Document Type</TableHead>
              <TableHead>File Link</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Technician Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell className="font-medium text-gray-900">
                  {doc.documentType.replace('_', ' ')}
                </TableCell>
                <TableCell>
                  <a href={doc.url} target="_blank" rel="noreferrer" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium underline">
                    View Upload
                  </a>
                </TableCell>
                <TableCell>
                  <Badge 
                    tone={
                      doc.verificationStatus === 'VERIFIED' ? 'success' : 
                      doc.verificationStatus === 'REJECTED' ? 'critical' : 'warning'
                    }
                  >
                    {doc.verificationStatus || 'PENDING'}
                  </Badge>
                </TableCell>
                <TableCell>
                   <div className="flex items-center gap-2">
                     <Button 
                       size="sm" 
                       variant="outline" 
                       onClick={() => updateVerificationStatus(doc.id, 'VERIFIED')}
                       disabled={doc.verificationStatus === 'VERIFIED'}
                     >
                       <CheckCircle className="w-4 h-4 mr-1 text-green-600" /> Approve
                     </Button>
                     <Button 
                       size="sm" 
                       variant="outline" 
                       onClick={() => updateVerificationStatus(doc.id, 'REJECTED')}
                       disabled={doc.verificationStatus === 'REJECTED'}
                     >
                       <XCircle className="w-4 h-4 mr-1 text-red-600" /> Reject
                     </Button>
                   </div>
                </TableCell>
              </TableRow>
            ))}
            {documents.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6 text-gray-500 italic">
                  No documents available for verification.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
'use client';

import React, { useState } from 'react';
import { Upload, FileText, CheckCircle } from 'lucide-react';
import { Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@coaching-ops/ui';
import { apiClient } from '../../services/api-client';

export function DocumentUpload({ studentId, onUploadComplete }: { studentId: string, onUploadComplete: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState('ID_PROOF');
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('documentType', documentType);

      await apiClient.post(`/students/${studentId}/documents`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      setFile(null);
      onUploadComplete();
      alert('Document uploaded and sent for verification successfully.');
    } catch (error) {
      console.error('Upload failed', error);
      alert('Failed to upload document.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white p-6 border border-gray-200 rounded-xl shadow-sm mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2"><Upload className="w-5 h-5 text-indigo-500"/> Secure Document Upload</h3>
      <div className="flex items-end gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-600 mb-2">Document Type</label>
          <Select value={documentType} onValueChange={setDocumentType}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ID_PROOF">Government ID Proof</SelectItem>
              <SelectItem value="TRANSCRIPT">Previous Transcript</SelectItem>
              <SelectItem value="PHOTO">Passport Photo</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1"><input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" /></div>
        <Button disabled={!file || uploading} onClick={handleUpload} className="bg-indigo-600 text-white min-w-[120px]">{uploading ? 'Uploading...' : 'Upload File'}</Button>
      </div>
    </div>
  );
}
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
    <div className="bg-[#0a0a0a]/70 backdrop-blur-[10px] p-6 border border-[#00F3FF]/30 shadow-[0_0_15px_rgba(0,243,255,0.05)] rounded-none mb-6">
      <h3 className="text-sm font-black text-[#E0E0E0] uppercase tracking-widest mb-4 flex items-center gap-2"><Upload className="w-4 h-4 text-[#00F3FF] drop-shadow-[0_0_5px_#00F3FF]"/> Secure File Uplink</h3>
      <div className="flex items-end gap-4">
        <div className="flex-1">
          <label className="block text-[10px] font-black text-[#00F3FF]/70 uppercase tracking-widest mb-2">Document Classification</label>
          <Select value={documentType} onValueChange={setDocumentType}>
            <SelectTrigger className="bg-transparent border-0 border-b border-[#00F3FF]/50 rounded-none text-[#E0E0E0] focus:ring-0 focus:border-[#00F3FF]"><SelectValue /></SelectTrigger>
            <SelectContent className="bg-[#0a0a0a] border border-[#00F3FF]/50 text-[#E0E0E0] rounded-none">
              <SelectItem value="ID_PROOF" className="hover:bg-[#00F3FF]/10 hover:text-[#00F3FF]">Government ID Proof</SelectItem>
              <SelectItem value="TRANSCRIPT" className="hover:bg-[#00F3FF]/10 hover:text-[#00F3FF]">Previous Transcript</SelectItem>
              <SelectItem value="PHOTO" className="hover:bg-[#00F3FF]/10 hover:text-[#00F3FF]">Passport Photo</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1"><input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} className="w-full text-xs text-[#E0E0E0]/50 file:mr-4 file:py-2 file:px-3 file:rounded-none file:border file:border-[#00F3FF]/30 file:text-[10px] file:font-black file:uppercase file:tracking-widest file:bg-transparent file:text-[#00F3FF] hover:file:bg-[#00F3FF]/10 hover:file:border-[#00F3FF] transition-all bg-transparent border-b border-[#00F3FF]/50 pb-1 cursor-pointer" /></div>
        <Button disabled={!file || uploading} onClick={handleUpload} className="bg-[#00F3FF]/10 border border-[#00F3FF] hover:bg-[#00F3FF]/20 hover:shadow-[0_0_15px_rgba(0,243,255,0.3)] text-[#00F3FF] rounded-none uppercase tracking-widest font-bold text-xs min-w-[140px] transition-all disabled:opacity-50">{(uploading) ? 'Transmitting...' : 'Transmit'}</Button>
      </div>
    </div>
  );
}
'use client';

import React, { useState, useRef } from 'react';
import { Upload, FileSpreadsheet, AlertCircle } from 'lucide-react';
import { Button, Card, CardContent, CardHeader, CardTitle, Text } from '@coaching-ops/ui';
import { apiClient } from '../../services/api-client';

export function BulkImportEngine({ onImportComplete }: { onImportComplete?: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [results, setResults] = useState<{ success: number; errors: any[] } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setResults(null);
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Maps to Phase 4 Bulk Upload API
      const response = await apiClient.post('/students/bulk-import', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setResults({ success: response.data.successCount || 0, errors: response.data.errors || [] });
      if (onImportComplete) onImportComplete();
      
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (error: any) {
      alert('An error occurred during the bulk import process.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="bg-[#0a0a0a]/70 backdrop-blur-[10px] border border-[#00F3FF]/50 shadow-[0_0_15px_rgba(0,243,255,0.1)] rounded-none mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-black tracking-widest uppercase text-[#E0E0E0]">
          <FileSpreadsheet className="w-5 h-5 text-[#00F3FF] drop-shadow-[0_0_5px_#00F3FF]" />
          Mass Upload Matrix
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end gap-4">
          <div className="flex-1">
            <label className="block text-[10px] font-black text-[#00F3FF] uppercase tracking-widest mb-2">Provide CSV Data Core</label>
            <input 
              type="file" 
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              ref={fileInputRef}
              onChange={(e) => setFile(e.target.files?.[0] || null)} 
              className="w-full text-xs text-[#E0E0E0]/70 file:mr-4 file:py-2 file:px-4 file:rounded-none file:border file:border-[#00F3FF]/50 file:text-[10px] file:font-black file:uppercase file:tracking-widest file:bg-[#00F3FF]/10 file:text-[#00F3FF] hover:file:bg-[#00F3FF]/20 hover:file:shadow-[0_0_10px_rgba(0,243,255,0.2)] transition-all cursor-pointer bg-transparent border-b border-[#00F3FF]/30 pb-2" 
            />
          </div>
          <Button disabled={!file || uploading} onClick={handleUpload} className="bg-[#00F3FF]/10 border border-[#00F3FF] hover:bg-[#00F3FF]/20 hover:shadow-[0_0_15px_rgba(0,243,255,0.3)] text-[#00F3FF] rounded-none uppercase tracking-widest font-bold text-xs min-w-[160px] transition-all disabled:opacity-50">
            {uploading ? 'Processing...' : 'Upload & Sync'}
          </Button>
        </div>
        
        {results && <div className="mt-4 p-4 bg-green-50 text-green-800 rounded-md border border-green-200 text-sm font-medium">Successfully imported {results.success} student records. {results.errors.length > 0 && <span className="text-red-600 ml-2">({results.errors.length} failed rows)</span>}</div>}
      </CardContent>
    </Card>
  );
}
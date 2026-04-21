import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, Badge, Text } from '@coaching-ops/ui';
import { User } from 'lucide-react';

export function StudentProfileCard({ student }: { student: any }) {
  if (!student) return null;

  return (
    <Card className="border-l-4 border-l-indigo-600 shadow-sm mb-6">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <div className="p-4 bg-indigo-50 rounded-full text-indigo-600">
          <User className="w-8 h-8" />
        </div>
        <div className="flex-1">
          <CardTitle className="text-2xl font-bold">{student.firstName} {student.lastName}</CardTitle>
          <Text className="text-gray-500 font-mono mt-1">Roll Number: {student.rollNumber}</Text>
        </div>
        <div>
          <Badge tone={student.status === 'ACTIVE' ? 'success' : student.status === 'PROSPECT' ? 'warning' : 'neutral'}>
            {student.status || 'UNKNOWN'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4 border-t border-gray-100 mt-4">
         <div>
            <Text className="text-xs text-gray-400 uppercase tracking-wider mb-1">Email Address</Text>
            <Text className="font-medium text-gray-900">{student.email || 'N/A'}</Text>
         </div>
         <div>
            <Text className="text-xs text-gray-400 uppercase tracking-wider mb-1">Current Batch</Text>
            <Text className="font-medium text-gray-900">{student.currentBatchId || 'Unassigned'}</Text>
         </div>
         <div>
            <Text className="text-xs text-gray-400 uppercase tracking-wider mb-1">Phone Number</Text>
            <Text className="font-medium text-gray-900">{student.phone || student.phoneNumber || 'N/A'}</Text>
         </div>
         <div>
            <Text className="text-xs text-gray-400 uppercase tracking-wider mb-1">Parent Contact</Text>
            <Text className="font-medium text-gray-900">{student.parentDetails?.primaryContact || student.parentInfo?.primaryContact || 'N/A'}</Text>
         </div>
      </CardContent>
    </Card>
  );
}
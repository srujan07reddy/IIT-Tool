import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, Heading, Tabs, Text } from '@coaching-ops/ui';

import { StudentDocumentsUpload } from '@/components/students/student-documents-upload';
import { getStudentDetails } from '@/services/students.service';

export default async function StudentProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const details = await getStudentDetails(id);

  if (!details) {
    notFound();
  }

  const personalInfo = (
    <Card>
      <CardHeader>
        <CardTitle>Personal info</CardTitle>
      </CardHeader>
      <CardContent
        style={{
          display: 'grid',
          gap: 16,
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        }}
      >
        <Info label="Roll Number" value={details.student.rollNumber} />
        <Info label="Email" value={details.student.email} />
        <Info label="DOB" value={new Date(details.student.dateOfBirth).toLocaleDateString()} />
        <Info label="Status" value={details.student.status} />
        <Info label="Parent Contact" value={details.student.parentDetails.primaryContact} />
        <Info label="Batch" value={details.student.currentBatchId} />
      </CardContent>
    </Card>
  );

  const academicRecords = (
    <Card>
      <CardHeader>
        <CardTitle>Academic records</CardTitle>
      </CardHeader>
      <CardContent
        style={{
          display: 'grid',
          gap: 16,
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        }}
      >
        <Info label="Previous School" value={details.academicProfile.previousSchool} />
        <Info label="Board" value={details.academicProfile.board} />
        <Info label="Last Score %" value={String(details.academicProfile.lastScorePercentage)} />
        <Info label="Target Exam" value={details.academicProfile.targetExam} />
      </CardContent>
    </Card>
  );

  const documents = <StudentDocumentsUpload initialDocuments={details.documents} />;

  return (
    <div style={{ display: 'grid', gap: 20 }}>
      <div>
        <Heading>
          {details.student.firstName} {details.student.lastName}
        </Heading>
        <Text>Typed detail view driven by shared `StudentMaster` and `AcademicProfile` interfaces.</Text>
      </div>
      <Tabs
        tabs={[
          { id: 'personal', label: 'Personal Info', content: personalInfo },
          { id: 'academic', label: 'Academic Records', content: academicRecords },
          { id: 'documents', label: 'Documents', content: documents },
        ]}
      />
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <Text style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</Text>
      <div style={{ marginTop: 4, fontWeight: 700 }}>{value}</div>
    </div>
  );
}

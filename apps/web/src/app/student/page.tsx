import DashboardLayout from '../../components/DashboardLayout';

export default function StudentDashboard() {
  return (
    <DashboardLayout role="Student">
      <div>
        <h1>Student Dashboard</h1>
        <p>Welcome to your dashboard. Here you can view your courses, grades, and profile.</p>
        {/* Add dashboard content here */}
      </div>
    </DashboardLayout>
  );
}
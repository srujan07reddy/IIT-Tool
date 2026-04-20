import DashboardLayout from '../../components/DashboardLayout';

export default function StaffDashboard() {
  return (
    <DashboardLayout role="Staff">
      <div>
        <h1>Staff Dashboard</h1>
        <p>Welcome to your dashboard. Manage students, courses, and view reports.</p>
        {/* Add dashboard content here */}
      </div>
    </DashboardLayout>
  );
}
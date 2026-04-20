import DashboardLayout from '../../components/DashboardLayout';

export default function AdminDashboard() {
  return (
    <DashboardLayout role="Admin">
      <div>
        <h1>Admin Dashboard</h1>
        <p>Welcome to your dashboard. Manage users, settings, and view analytics.</p>
        {/* Add dashboard content here */}
      </div>
    </DashboardLayout>
  );
}
const Admin = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl shadow">Manage Users</div>
        <div className="bg-white p-4 rounded-xl shadow">System Settings</div>
        <div className="bg-white p-4 rounded-xl shadow">Reports & Logs</div>
      </div>
    </div>
  );
};

export default Admin;

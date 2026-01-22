// components/layout/DashboardLayout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx"; // Your navigation sidebar

const DashboardLayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar /> {/* Navigation */}
      <div className="flex-1 p-6 overflow-auto">
        <Outlet /> {/* Nested routes will render here */}
      </div>
    </div>
  );
};

export default DashboardLayout;

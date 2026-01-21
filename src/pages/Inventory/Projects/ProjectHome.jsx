import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, FileText, Package, Truck, ClipboardList } from "lucide-react";

export default function ProjectHome() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="h-full">
      <h2 className="text-2xl font-semibold mb-6">Create Project</h2>

      {/* Create Project Card */}
      <div className="bg-white rounded-2xl shadow p-6 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Project Name</label>
            <input
              type="text"
              placeholder="Project A"
              className="w-full border rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <select className="w-full border rounded-lg p-2">
              <option>Chennai</option>
              <option>Bangalore</option>
              <option>Hyderabad</option>
            </select>
          </div>
        </div>

        {/* Navigation added here */}
        <button
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg"
          onClick={() => handleNavigation("/inventory/projects/create")}
        >
          Create Project
        </button>
      </div>

      {/* Workflow Steps */}
      <h3 className="text-lg font-semibold mb-4">Project Workflow</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StepCard
          title="Create Items"
          subtitle="for Project"
          icon={<ClipboardList className="w-8 h-8 text-green-600" />}
          onClick={() => handleNavigation("/inventory/projects/items")}
        />
        <StepCard
          title="Create"
          subtitle="Purchase Order"
          icon={<FileText className="w-8 h-8 text-blue-600" />}
          onClick={() => handleNavigation("/inventory/projects/purchase-order")}
        />
        <StepCard
          title="Receive"
          subtitle="Goods & Services"
          icon={<Package className="w-8 h-8 text-orange-600" />}
          onClick={() => handleNavigation("/inventory/projects/receive")}
        />
        <StepCard
          title="Allocate"
          subtitle="Inventory & Services"
          icon={<CheckCircle className="w-8 h-8 text-purple-600" />}
          onClick={() => handleNavigation("/inventory/projects/allocate")}
        />
        <StepCard
          title="Create"
          subtitle="Delivery Challan"
          icon={<Truck className="w-8 h-8 text-indigo-600" />}
          onClick={() => handleNavigation("/inventory/projects/delivery-challan")}
        />
      </div>
    </div>
  );
}

function StepCard({ title, subtitle, icon, onClick }) {
  return (
    <div
      className="bg-white rounded-2xl shadow p-5 flex flex-col items-center text-center hover:shadow-lg transition cursor-pointer"
      onClick={onClick}
    >
      <div className="mb-3">{icon}</div>
      <h4 className="font-semibold">{title}</h4>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </div>
  );
}

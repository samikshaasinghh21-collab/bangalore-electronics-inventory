import { useNavigate } from "react-router-dom";
import { ClipboardList, FileText, Package, CheckCircle, Truck, Plus } from "lucide-react";

export default function Project() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Projects</h2>
        <button
          onClick={() => navigate("create")}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={18} /> Create Project
        </button>
      </div>

      {/* WORKFLOW */}
      <h3 className="text-lg font-semibold mb-4">Project Workflow</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StepCard
          title="Create Items"
          subtitle="for Project"
          icon={<ClipboardList className="w-8 h-8 text-green-600" />}
          onClick={() => navigate("items")}
        />
        <StepCard
          title="Create"
          subtitle="Purchase Order"
          icon={<FileText className="w-8 h-8 text-blue-600" />}
          onClick={() => navigate("purchase-order")}
        />
        <StepCard
          title="Receive"
          subtitle="Goods & Services"
          icon={<Package className="w-8 h-8 text-orange-600" />}
          onClick={() => navigate("receive")}
        />
        <StepCard
          title="Allocate"
          subtitle="Inventory & Services"
          icon={<CheckCircle className="w-8 h-8 text-purple-600" />}
          onClick={() => navigate("allocate")}
        />
        <StepCard
          title="Create"
          subtitle="Delivery Challan"
          icon={<Truck className="w-8 h-8 text-indigo-600" />}
          onClick={() => navigate("delivery-challan")}
        />
      </div>
    </>
  );
}

function StepCard({ title, subtitle, icon, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl shadow p-5 flex flex-col items-center text-center cursor-pointer hover:shadow-lg transition"
    >
      <div className="mb-3">{icon}</div>
      <h4 className="font-semibold">{title}</h4>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </div>
  );
}

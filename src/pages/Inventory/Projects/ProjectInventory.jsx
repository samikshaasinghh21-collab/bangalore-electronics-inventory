import { useNavigate } from "react-router-dom";

export default function ProjectInventory() {
  const navigate = useNavigate();

  return (
    <div className="p-8">
      <button
        onClick={() => navigate("/inventory/projects")}
        className="mb-4 text-blue-600"
      >
        ← Back to Project
      </button>

      <h1 className="text-2xl font-semibold">
        Project Inventory / Items
      </h1>
    </div>
  );
}

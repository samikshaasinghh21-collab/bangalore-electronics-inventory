import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";

export default function CreateProject() {
  const navigate = useNavigate();

  const [projectName, setProjectName] = useState("");
  const [location, setLocation] = useState("");

  const handleCreateProject = () => {
    if (!projectName || !location) {
      alert("Please enter Project Name and Location");
      return;
    }

    // Later you can save this via API
    // For now → navigate inside Project module
    navigate("../items/create");
  };

  return (
    <div className="h-full flex flex-col gap-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Create Project</h2>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/projects")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border"
          >
            <ArrowLeft size={18} /> Back
          </button>
        </div>
      </div>

      {/* CREATE PROJECT */}
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Project Name</label>
            <input
              className="w-full border rounded-lg p-2"
              placeholder="Project A"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <select
              className="w-full border rounded-lg p-2"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="">Select Location</option>
              <option>Chennai</option>
              <option>Bangalore</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleCreateProject}
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Create Project
        </button>
      </div>
    </div>
  );
}

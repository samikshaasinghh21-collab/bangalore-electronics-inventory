import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProjectHome() {
  const navigate = useNavigate();

  const steps = [
    { title: "Create Project – Specify Customer", path: "inventory" },
    { title: "Tag Location", path: "inventory" },
    { title: "Create Items for Purchase", path: "purchase-order" },
    { title: "Create Purchase Order", path: "purchase-order" },
    { title: "Receive Goods & Services", path: "receive" },
    { title: "Allocate Inventory & Services", path: "allocate" },
    { title: "Create Delivery Challan", path: "delivery-challan" },
  ];

  return (
    <div className="w-full min-h-[80vh] bg-white rounded-xl shadow-lg p-12">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-semibold text-gray-800">
          Projects
        </h1>

        <button
          onClick={() => navigate("inventory")}
          className="bg-blue-600 text-white text-lg px-8 py-4 rounded-lg hover:bg-blue-700 transition"
        >
          + Create Project
        </button>
      </div>

      {/* Steps */}
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div
            key={index}
            onClick={() => navigate(step.path)}
            className="flex justify-between items-center border border-gray-200 rounded-lg px-8 py-5 cursor-pointer hover:bg-gray-50 transition"
          >
            <span className="text-xl text-gray-800">
              {step.title}
            </span>
            <span className="text-3xl text-gray-400">›</span>
          </div>
        ))}
      </div>
    </div>
  );
}

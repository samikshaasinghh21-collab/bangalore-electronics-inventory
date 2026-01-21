import React, { useState } from "react";

export default function ProjectAllocate() {
  const [allocations, setAllocations] = useState([]);
  const [form, setForm] = useState({
    itemName: "",
    availableQty: "",
    allocateQty: "",
    unit: "",
    serviceType: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAllocate = () => {
    if (!form.itemName || !form.allocateQty) return;

    setAllocations([...allocations, form]);

    setForm({
      itemName: "",
      availableQty: "",
      allocateQty: "",
      unit: "",
      serviceType: "",
    });
  };

  return (
    <div className="h-full">
      <h2 className="text-2xl font-semibold mb-6">
        Allocate Inventory & Services
      </h2>

      {/* Allocation Form */}
      <div className="bg-white rounded-2xl shadow p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">Allocate Item / Service</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">
              Item / Service Name
            </label>
            <input
              type="text"
              name="itemName"
              value={form.itemName}
              onChange={handleChange}
              placeholder="Cable Wire / Installation"
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Available Quantity
            </label>
            <input
              type="number"
              name="availableQty"
              value={form.availableQty}
              onChange={handleChange}
              placeholder="100"
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Allocate Quantity
            </label>
            <input
              type="number"
              name="allocateQty"
              value={form.allocateQty}
              onChange={handleChange}
              placeholder="10"
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Unit</label>
            <select
              name="unit"
              value={form.unit}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            >
              <option value="">Select</option>
              <option>Nos</option>
              <option>Kg</option>
              <option>Meter</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Service Type (Optional)
            </label>
            <select
              name="serviceType"
              value={form.serviceType}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            >
              <option value="">None</option>
              <option>Installation</option>
              <option>Maintenance</option>
              <option>Testing</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleAllocate}
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          Allocate
        </button>
      </div>

      {/* Allocation Table */}
      {allocations.length > 0 && (
        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4">
            Allocated Inventory & Services
          </h3>

          <table className="w-full">
            <thead>
              <tr className="border-b text-left">
                <th className="p-2">Item / Service</th>
                <th className="p-2">Allocated Qty</th>
                <th className="p-2">Unit</th>
                <th className="p-2">Service</th>
              </tr>
            </thead>

            <tbody>
              {allocations.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{item.itemName}</td>
                  <td className="p-2">{item.allocateQty}</td>
                  <td className="p-2">{item.unit}</td>
                  <td className="p-2">
                    {item.serviceType || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Trash2 } from "lucide-react";

export default function CreateDC() {
  const navigate = useNavigate();

  const [dcDetails, setDcDetails] = useState({
    dcNumber: "",
    deliveryDate: "",
    receiver: "",
    siteLocation: "",
  });

  const [items, setItems] = useState([
    { name: "Cable Wire", quantity: 50, unit: "Meter" },
    { name: "Switch Board", quantity: 10, unit: "Nos" },
  ]);

  const handleChange = (e) => {
    setDcDetails({ ...dcDetails, [e.target.name]: e.target.value });
  };

  const updateQty = (index, value) => {
    const updated = [...items];
    updated[index].quantity = value;
    setItems(updated);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div className="h-full flex flex-col gap-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Create Delivery Challan</h2>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/inventory/projects/allocate")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border"
          >
            <ArrowLeft size={18} /> Back
          </button>

          <button
            onClick={() => navigate("/inventory/projects")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white"
          >
            Submit DC <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* DC Details */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h3 className="text-lg font-semibold mb-4">DC Details</h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            name="dcNumber"
            value={dcDetails.dcNumber}
            onChange={handleChange}
            placeholder="DC Number"
            className="border rounded-lg p-2"
          />

          <input
            type="date"
            name="deliveryDate"
            value={dcDetails.deliveryDate}
            onChange={handleChange}
            className="border rounded-lg p-2"
          />

          <input
            name="receiver"
            value={dcDetails.receiver}
            onChange={handleChange}
            placeholder="Receiver Name"
            className="border rounded-lg p-2"
          />

          <input
            name="siteLocation"
            value={dcDetails.siteLocation}
            onChange={handleChange}
            placeholder="Site Location"
            className="border rounded-lg p-2"
          />
        </div>
      </div>

      {/* DC Items */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Delivery Items</h3>

        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th className="p-2">Item</th>
              <th className="p-2">Quantity</th>
              <th className="p-2">Unit</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="p-2">{item.name}</td>
                <td className="p-2">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateQty(index, e.target.value)}
                    className="border rounded-lg p-1 w-24"
                  />
                </td>
                <td className="p-2">{item.unit}</td>
                <td className="p-2">
                  <button onClick={() => removeItem(index)}>
                    <Trash2 size={18} className="text-red-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

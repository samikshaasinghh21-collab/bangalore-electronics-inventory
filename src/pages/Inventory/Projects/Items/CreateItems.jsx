import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2, ArrowLeft, ArrowRight } from "lucide-react";

export default function CreateItems() {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const [form, setForm] = useState({
    name: "",
    category: "",
    quantity: "",
    unit: "",
  });

  // Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Save / Update item
  const handleSave = () => {
    if (!form.name || !form.quantity) return;

    if (editIndex !== null) {
      const updated = [...items];
      updated[editIndex] = form;
      setItems(updated);
      setEditIndex(null);
    } else {
      setItems([...items, form]);
    }

    setForm({ name: "", category: "", quantity: "", unit: "" });
  };

  // Edit item
  const handleEdit = (index) => {
    setForm(items[index]);
    setEditIndex(index);
  };

  // Delete item
  const handleDelete = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div className="h-full flex flex-col gap-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Create Items</h2>

        {/* Navigation */}
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/inventory/projects")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border"
          >
            <ArrowLeft size={18} /> Back
          </button>

          <button
            onClick={() => navigate("/inventory/projects/purchase-order")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white"
          >
            Next <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Create Item Form */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h3 className="text-lg font-semibold mb-4">
          {editIndex !== null ? "Edit Item" : "Add New Item"}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Item Name"
            className="border rounded-lg p-2"
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="border rounded-lg p-2"
          >
            <option value="">Category</option>
            <option>Electrical</option>
            <option>Mechanical</option>
            <option>Hardware</option>
          </select>

          <input
            name="quantity"
            type="number"
            value={form.quantity}
            onChange={handleChange}
            placeholder="Quantity"
            className="border rounded-lg p-2"
          />

          <select
            name="unit"
            value={form.unit}
            onChange={handleChange}
            className="border rounded-lg p-2"
          >
            <option value="">Unit</option>
            <option>Nos</option>
            <option>Kg</option>
            <option>Meter</option>
          </select>
        </div>

        <button
          onClick={handleSave}
          className="mt-5 bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          {editIndex !== null ? "Update Item" : "Save Item"}
        </button>
      </div>

      {/* Items Table */}
      {items.length > 0 && (
        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Items List</h3>

          <table className="w-full">
            <thead>
              <tr className="border-b text-left">
                <th className="p-2">Item</th>
                <th className="p-2">Category</th>
                <th className="p-2">Qty</th>
                <th className="p-2">Unit</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>

            <tbody>
              {items.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{item.name}</td>
                  <td className="p-2">{item.category}</td>
                  <td className="p-2">{item.quantity}</td>
                  <td className="p-2">{item.unit}</td>
                  <td className="p-2 flex gap-3">
                    <button onClick={() => handleEdit(index)}>
                      <Pencil size={18} className="text-blue-600" />
                    </button>
                    <button onClick={() => handleDelete(index)}>
                      <Trash2 size={18} className="text-red-600" />
                    </button>
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

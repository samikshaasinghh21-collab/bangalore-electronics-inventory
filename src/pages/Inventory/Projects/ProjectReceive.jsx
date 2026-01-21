import React, { useState } from "react";

export default function ProjectReceive() {
  const [receivedItems, setReceivedItems] = useState([]);

  const [form, setForm] = useState({
    itemName: "",
    receivedQty: "",
    unit: "",
    supplier: "",
    receiveDate: "",
    serviceType: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleReceive = () => {
    if (!form.itemName || !form.receivedQty) return;

    setReceivedItems([...receivedItems, form]);

    setForm({
      itemName: "",
      receivedQty: "",
      unit: "",
      supplier: "",
      receiveDate: "",
      serviceType: "",
    });
  };

  return (
    <div className="h-full">
      <h2 className="text-2xl font-semibold mb-6">
        Receive Goods & Services
      </h2>

      {/* Receive Form */}
      <div className="bg-white rounded-2xl shadow p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">
          Receive Item / Service
        </h3>

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
              Received Quantity
            </label>
            <input
              type="number"
              name="receivedQty"
              value={form.receivedQty}
              onChange={handleChange}
              placeholder="50"
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
              Supplier / Vendor
            </label>
            <input
              type="text"
              name="supplier"
              value={form.supplier}
              onChange={handleChange}
              placeholder="Supplier Name"
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Receive Date
            </label>
            <input
              type="date"
              name="receiveDate"
              value={form.receiveDate}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />
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
          onClick={handleReceive}
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          Receive
        </button>
      </div>

      {/* Received Items Table */}
      {receivedItems.length > 0 && (
        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4">
            Received Goods & Services
          </h3>

          <table className="w-full">
            <thead>
              <tr className="border-b text-left">
                <th className="p-2">Item / Service</th>
                <th className="p-2">Qty</th>
                <th className="p-2">Unit</th>
                <th className="p-2">Supplier</th>
                <th className="p-2">Date</th>
                <th className="p-2">Service</th>
              </tr>
            </thead>

            <tbody>
              {receivedItems.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{item.itemName}</td>
                  <td className="p-2">{item.receivedQty}</td>
                  <td className="p-2">{item.unit}</td>
                  <td className="p-2">{item.supplier}</td>
                  <td className="p-2">{item.receiveDate}</td>
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

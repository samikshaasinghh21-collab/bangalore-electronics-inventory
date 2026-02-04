import React, { useState } from "react";

export default function ProjectDeliveryChallan() {
  const [dcData, setDcData] = useState({
    dcNumber: "",
    date: "",
    receiver: "",
    site: "",
  });

  const handleChange = (e) => {
    setDcData({ ...dcData, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-6">
        Create Delivery Challan
      </h2>

      {/* DC Details */}
      <div className="bg-white rounded-2xl shadow p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">DC Details</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">
              DC Number
            </label>
            <input
              type="text"
              name="dcNumber"
              value={dcData.dcNumber}
              onChange={handleChange}
              placeholder="DC-001"
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Delivery Date
            </label>
            <input
              type="date"
              name="date"
              value={dcData.date}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Receiver Name
            </label>
            <input
              type="text"
              name="receiver"
              value={dcData.receiver}
              onChange={handleChange}
              placeholder="Receiver Name"
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Site Location
            </label>
            <input
              type="text"
              name="site"
              value={dcData.site}
              onChange={handleChange}
              placeholder="Project Site"
              className="w-full border rounded-lg p-2"
            />
          </div>
        </div>
      </div>

      {/* DC Items */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h3 className="text-lg font-semibold mb-4">
          Delivery Items
        </h3>

        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th className="p-2">Item</th>
              <th className="p-2">Quantity</th>
              <th className="p-2">Unit</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b">
              <td className="p-2">Cable Wire</td>
              <td className="p-2">
                <input
                  type="number"
                  className="border rounded-lg p-1 w-24"
                  defaultValue={10}
                />
              </td>
              <td className="p-2">Meter</td>
            </tr>

            <tr className="border-b">
              <td className="p-2">Switch Board</td>
              <td className="p-2">
                <input
                  type="number"
                  className="border rounded-lg p-1 w-24"
                  defaultValue={5}
                />
              </td>
              <td className="p-2">Nos</td>
            </tr>
          </tbody>
        </table>

        <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg">
          Submit Delivery Challan
        </button>
      </div>
    </div>
  );
}

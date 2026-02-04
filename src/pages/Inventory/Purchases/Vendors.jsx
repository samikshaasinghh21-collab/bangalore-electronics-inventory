import React from "react";

const vendors = [
  {
    id: 1,
    name: "ABC Electronics",
    company: "ABC Electronics Pvt Ltd",
    contactPerson: "Ramesh Kumar",
    phone: "9876543210",
    email: "abc@electronics.com",
    gst: "29ABCDE1234F1Z5",
    address: "Bangalore, Karnataka",
    categories: "Electronics, Components",
    paymentTerms: "Net 30",
    creditLimit: 200000,
    totalPurchase: 550000,
    paid: 505000,
    outstanding: 45000,
    status: "Active",
    lastPurchase: "12 Jan 2026",
  },
  {
    id: 2,
    name: "Global Tech Supplies",
    company: "Global Tech Supplies",
    contactPerson: "Anita Sharma",
    phone: "9123456789",
    email: "global@tech.com",
    gst: "29XYZDE9876P1Z2",
    address: "Mumbai, Maharashtra",
    categories: "Cables, Accessories",
    paymentTerms: "Cash",
    creditLimit: 100000,
    totalPurchase: 120000,
    paid: 120000,
    outstanding: 0,
    status: "Active",
    lastPurchase: "02 Feb 2026",
  },
  {
    id: 3,
    name: "Omni Industrial Traders",
    company: "Omni Industrial Traders",
    contactPerson: "Suresh Patel",
    phone: "9988776655",
    email: "omni@industrial.com",
    gst: "27LMNOP4567Q1Z9",
    address: "Pune, Maharashtra",
    categories: "Machinery, Tools",
    paymentTerms: "Net 15",
    creditLimit: 300000,
    totalPurchase: 300000,
    paid: 200000,
    outstanding: 100000,
    status: "Inactive",
    lastPurchase: "18 Dec 2025",
  },
];

export default function Vendors() {
  const totalOutstanding = vendors.reduce((sum, v) => sum + v.outstanding, 0);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Vendors</h1>
          <p className="text-gray-600 text-sm">
            Manage suppliers, purchases & payments
          </p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow">
          + Add Vendor
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-500">Total Vendors</p>
          <h2 className="text-2xl font-bold">{vendors.length}</h2>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-500">Outstanding Payables</p>
          <h2 className="text-2xl font-bold text-red-600">
            ₹{totalOutstanding.toLocaleString()}
          </h2>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-500">Active Vendors</p>
          <h2 className="text-2xl font-bold">
            {vendors.filter((v) => v.status === "Active").length}
          </h2>
        </div>
      </div>

      {/* Vendors Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Vendor</th>
              <th className="p-3">Phone</th>
              <th className="p-3">GST</th>
              <th className="p-3">Payment Terms</th>
              <th className="p-3">Outstanding</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((vendor) => (
              <tr key={vendor.id} className="border-t hover:bg-gray-50">
                <td className="p-3">
                  <div className="font-medium">{vendor.name}</div>
                  <div className="text-xs text-gray-500">
                    {vendor.company}
                  </div>
                </td>
                <td className="p-3">{vendor.phone}</td>
                <td className="p-3">{vendor.gst}</td>
                <td className="p-3">{vendor.paymentTerms}</td>
                <td
                  className={`p-3 font-medium ${
                    vendor.outstanding > 0
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  ₹{vendor.outstanding.toLocaleString()}
                </td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      vendor.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {vendor.status}
                  </span>
                </td>
                <td className="p-3 space-x-2">
                  <button className="text-blue-600 hover:underline">
                    View
                  </button>
                  <button className="text-gray-600 hover:underline">
                    Edit
                  </button>
                  <button className="text-purple-600 hover:underline">
                    Orders
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

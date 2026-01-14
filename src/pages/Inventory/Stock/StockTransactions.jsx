import React, { useState } from "react";
import { FaPlus, FaFileCsv, FaFilePdf } from "react-icons/fa";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Example transaction data
const initialTransactions = [
  {
    id: "TXN001",
    date: "2026-01-14",
    product: "LED TV 42\"",
    sku: "LED42TV",
    quantity: 5,
    type: "Stock In",
    supplier: "Electro Supplies",
    unitPrice: 30000,
    balance: 20,
    remarks: "New shipment",
  },
  {
    id: "TXN002",
    date: "2026-01-13",
    product: "Bluetooth Speaker",
    sku: "BS100",
    quantity: 2,
    type: "Stock Out",
    supplier: "Retail Sale",
    unitPrice: 2000,
    balance: 18,
    remarks: "Sold to customer",
  },
];

// Summary data for cards
const summaryData = [
  { title: "Total Stock In", value: 100 },
  { title: "Total Stock Out", value: 45 },
  { title: "Current Stock Value", value: 550000 },
  { title: "Top Moving Product", value: "LED TV 42\"" },
];

// Colors for Pie chart
const COLORS = ["#4CAF50", "#FF9800", "#2196F3", "#E91E63"];

const StockTransactions = () => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState("");

  // For adding new transaction
  const [newTxn, setNewTxn] = useState({
    product: "",
    sku: "",
    quantity: 0,
    type: "Stock In",
    supplier: "",
    unitPrice: 0,
    remarks: "",
  });

  const handleAddTransaction = (e) => {
    e.preventDefault();
    const txn = {
      ...newTxn,
      id: `TXN${transactions.length + 1}`.padStart(6, "0"),
      date: new Date().toISOString().split("T")[0],
      balance:
        newTxn.type === "Stock In"
          ? transactions[transactions.length - 1].balance + Number(newTxn.quantity)
          : transactions[transactions.length - 1].balance - Number(newTxn.quantity),
    };
    setTransactions([txn, ...transactions]);
    setShowModal(false);
    setNewTxn({
      product: "",
      sku: "",
      quantity: 0,
      type: "Stock In",
      supplier: "",
      unitPrice: 0,
      remarks: "",
    });
  };

  // Filtered transactions
  const filteredTransactions = transactions.filter(
    (txn) =>
      txn.product.toLowerCase().includes(filter.toLowerCase()) ||
      txn.sku.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {summaryData.map((card, index) => (
          <div
            key={index}
            className="bg-white shadow rounded-xl p-5 flex flex-col justify-between"
          >
            <div className="text-gray-500 font-medium">{card.title}</div>
            <div className="text-2xl font-bold mt-2">{card.value}</div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by product or SKU"
          className="border rounded-lg px-4 py-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <div className="flex gap-2">
          <button
            className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition"
            onClick={() => setShowModal(true)}
          >
            <FaPlus /> Add Transaction
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition">
            <FaFileCsv /> CSV
          </button>
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700 transition">
            <FaFilePdf /> PDF
          </button>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full table-auto">
          <thead className="bg-gray-200 sticky top-0">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Product</th>
              <th className="px-4 py-2">SKU</th>
              <th className="px-4 py-2">Qty</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Supplier/Customer</th>
              <th className="px-4 py-2">Unit Price</th>
              <th className="px-4 py-2">Balance</th>
              <th className="px-4 py-2">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((txn, index) => (
              <tr
                key={index}
                className="text-center border-b hover:bg-gray-50 transition"
              >
                <td className="px-4 py-2">{txn.id}</td>
                <td className="px-4 py-2">{txn.date}</td>
                <td className="px-4 py-2">{txn.product}</td>
                <td className="px-4 py-2">{txn.sku}</td>
                <td
                  className={`px-4 py-2 font-semibold ${
                    txn.type === "Stock In" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {txn.quantity}
                </td>
                <td className="px-4 py-2">{txn.type}</td>
                <td className="px-4 py-2">{txn.supplier}</td>
                <td className="px-4 py-2">₹{txn.unitPrice}</td>
                <td className="px-4 py-2">₹{txn.balance}</td>
                <td className="px-4 py-2">{txn.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Transaction Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-lg">
            <h3 className="text-xl font-bold mb-4">Add Transaction</h3>
            <form className="space-y-3" onSubmit={handleAddTransaction}>
              <input
                type="text"
                placeholder="Product Name"
                className="w-full px-3 py-2 border rounded-lg"
                value={newTxn.product}
                onChange={(e) => setNewTxn({ ...newTxn, product: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="SKU"
                className="w-full px-3 py-2 border rounded-lg"
                value={newTxn.sku}
                onChange={(e) => setNewTxn({ ...newTxn, sku: e.target.value })}
                required
              />
              <input
                type="number"
                placeholder="Quantity"
                className="w-full px-3 py-2 border rounded-lg"
                value={newTxn.quantity}
                onChange={(e) => setNewTxn({ ...newTxn, quantity: e.target.value })}
                required
              />
              <select
                className="w-full px-3 py-2 border rounded-lg"
                value={newTxn.type}
                onChange={(e) => setNewTxn({ ...newTxn, type: e.target.value })}
              >
                <option>Stock In</option>
                <option>Stock Out</option>
                <option>Adjustment</option>
              </select>
              <input
                type="text"
                placeholder="Supplier/Customer"
                className="w-full px-3 py-2 border rounded-lg"
                value={newTxn.supplier}
                onChange={(e) => setNewTxn({ ...newTxn, supplier: e.target.value })}
              />
              <input
                type="number"
                placeholder="Unit Price"
                className="w-full px-3 py-2 border rounded-lg"
                value={newTxn.unitPrice}
                onChange={(e) => setNewTxn({ ...newTxn, unitPrice: e.target.value })}
              />
              <input
                type="text"
                placeholder="Remarks"
                className="w-full px-3 py-2 border rounded-lg"
                value={newTxn.remarks}
                onChange={(e) => setNewTxn({ ...newTxn, remarks: e.target.value })}
              />
              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Pie Chart Example */}
      <div className="mt-6 bg-white p-5 rounded-xl shadow">
        <h4 className="font-semibold mb-4">Stock Movement Ratio</h4>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={summaryData.map((d) => ({ name: d.title, value: d.value }))}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {summaryData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) =>
                new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(
                  value
                )
              }
            />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StockTransactions;

import React, { useState } from "react";
import { FaPlus, FaFileCsv, FaFilePdf } from "react-icons/fa";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

// Sample product stock data
const initialProducts = [
  { id: 1, name: "switches\"", sku: "switches", category: "Electronics", quantity: 20, reorderLevel: 5, unitPrice: 30000, lastUpdated: "2026-01-14" },
  { id: 2, name: "3c3", sku: "BS100", category: "Electronics", quantity: 18, reorderLevel: 5, unitPrice: 2000, lastUpdated: "2026-01-13" },
  { id: 3, name: "hub", sku: "WM200", category: "Appliances", quantity: 8, reorderLevel: 3, unitPrice: 25000, lastUpdated: "2026-01-12" },
];

// Colors for charts
const COLORS = ["#4CAF50", "#FF9800", "#2196F3", "#E91E63"];

const StockPage = () => {
  const [products, setProducts] = useState(initialProducts);
  const [filter, setFilter] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", sku: "", category: "", quantity: 0, reorderLevel: 0, unitPrice: 0 });

  // Filter products
  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(filter.toLowerCase()) ||
      p.sku.toLowerCase().includes(filter.toLowerCase()) ||
      p.category.toLowerCase().includes(filter.toLowerCase())
  );

  // Add new product
  const handleAddProduct = (e) => {
    e.preventDefault();
    const product = {
      ...newProduct,
      id: products.length + 1,
      lastUpdated: new Date().toISOString().split("T")[0],
    };
    setProducts([product, ...products]);
    setShowAddModal(false);
    setNewProduct({ name: "", sku: "", category: "", quantity: 0, reorderLevel: 0, unitPrice: 0 });
  };

  // Summary Cards Data
  const totalStockIn = products.reduce((acc, p) => acc + p.quantity, 0);
  const lowStock = products.filter((p) => p.quantity <= p.reorderLevel).length;
  const totalValue = products.reduce((acc, p) => acc + p.quantity * p.unitPrice, 0);
  const topProduct = products.reduce((prev, current) => (prev.quantity > current.quantity ? prev : current), products[0]);

  const summaryData = [
    { title: "Total Products", value: products.length },
    { title: "Low Stock Alerts", value: lowStock },
    { title: "Current Stock Value", value: totalValue },
    { title: "Top Product", value: topProduct.name },
  ];

  // Chart data for categories
  const categoryData = products.reduce((acc, p) => {
    const existing = acc.find((c) => c.name === p.category);
    if (existing) {
      existing.value += p.quantity;
    } else {
      acc.push({ name: p.category, value: p.quantity });
    }
    return acc;
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Page Header */}
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Stock Management</h1>
        <div className="flex gap-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition">
            <FaFileCsv /> CSV
          </button>
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700 transition">
            <FaFilePdf /> PDF
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {summaryData.map((card, index) => (
          <div key={index} className="bg-white shadow rounded-xl p-5 flex flex-col justify-between">
            <div className="text-gray-500 font-medium">{card.title}</div>
            <div className="text-2xl font-bold mt-2">{card.title === "Current Stock Value" ? `₹${card.value}` : card.value}</div>
          </div>
        ))}
      </div>

      {/* Filters and Add Product */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by product, SKU, or category"
          className="border rounded-lg px-4 py-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition"
          onClick={() => setShowAddModal(true)}
        >
          <FaPlus /> Add Product
        </button>
      </div>

      {/* Stock Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow mb-6">
        <table className="w-full table-auto">
          <thead className="bg-gray-200 sticky top-0">
            <tr>
              <th className="px-4 py-2">Product</th>
              <th className="px-4 py-2">SKU</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Reorder Level</th>
              <th className="px-4 py-2">Unit Price</th>
              <th className="px-4 py-2">Total Value</th>
              <th className="px-4 py-2">Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((p) => (
              <tr key={p.id} className="text-center border-b hover:bg-gray-50 transition">
                <td className="px-4 py-2">{p.name}</td>
                <td className="px-4 py-2">{p.sku}</td>
                <td className="px-4 py-2">{p.category}</td>
                <td className={`px-4 py-2 font-semibold ${p.quantity <= p.reorderLevel ? "text-red-600" : "text-green-600"}`}>
                  {p.quantity}
                </td>
                <td className="px-4 py-2">{p.reorderLevel}</td>
                <td className="px-4 py-2">₹{p.unitPrice}</td>
                <td className="px-4 py-2">₹{p.quantity * p.unitPrice}</td>
                <td className="px-4 py-2">{p.lastUpdated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Pie Chart: Category distribution */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h4 className="font-semibold mb-4">Stock Distribution by Category</h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {categoryData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `₹${value}`} />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart: Quantity per product */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h4 className="font-semibold mb-4">Stock Quantity per Product</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={products}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => `₹${value}`} />
              <Bar dataKey="quantity" fill="#4CAF50" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-lg">
            <h3 className="text-xl font-bold mb-4">Add New Product</h3>
            <form className="space-y-3" onSubmit={handleAddProduct}>
              <input type="text" placeholder="Product Name" className="w-full px-3 py-2 border rounded-lg" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} required />
              <input type="text" placeholder="SKU" className="w-full px-3 py-2 border rounded-lg" value={newProduct.sku} onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })} required />
              <input type="text" placeholder="Category" className="w-full px-3 py-2 border rounded-lg" value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} required />
              <input type="number" placeholder="Quantity" className="w-full px-3 py-2 border rounded-lg" value={newProduct.quantity} onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })} required />
              <input type="number" placeholder="Reorder Level" className="w-full px-3 py-2 border rounded-lg" value={newProduct.reorderLevel} onChange={(e) => setNewProduct({ ...newProduct, reorderLevel: e.target.value })} required />
              <input type="number" placeholder="Unit Price" className="w-full px-3 py-2 border rounded-lg" value={newProduct.unitPrice} onChange={(e) => setNewProduct({ ...newProduct, unitPrice: e.target.value })} required />
              <div className="flex justify-end gap-2 mt-2">
                <button type="button" className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700">Add</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockPage;

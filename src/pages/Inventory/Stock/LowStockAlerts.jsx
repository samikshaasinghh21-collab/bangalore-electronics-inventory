import React from "react";

// Sample data (replace with API or context)
const products = [
  { id: 1, name: "Switches", sku: "SW100", category: "Electronics", quantity: 3, reorderLevel: 5, unitPrice: 3000, lastUpdated: "2026-01-14" },
  { id: 2, name: "Hub", sku: "HUB200", category: "Electronics", quantity: 8, reorderLevel: 10, unitPrice: 2500, lastUpdated: "2026-01-13" },
  { id: 3, name: "Router", sku: "RT300", category: "Networking", quantity: 2, reorderLevel: 5, unitPrice: 5000, lastUpdated: "2026-01-12" },
];

const LowStockAlerts = () => {
  const lowStockProducts = products.filter((p) => p.quantity <= p.reorderLevel);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Low Stock Alerts</h1>

      {lowStockProducts.length === 0 ? (
        <div className="text-green-600 font-semibold">All products are above reorder level ✅</div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="w-full table-auto">
            <thead className="bg-red-100 sticky top-0">
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
              {lowStockProducts.map((p) => (
                <tr key={p.id} className="text-center border-b hover:bg-red-50 transition">
                  <td className="px-4 py-2 font-semibold">{p.name}</td>
                  <td className="px-4 py-2">{p.sku}</td>
                  <td className="px-4 py-2">{p.category}</td>
                  <td className="px-4 py-2 text-red-600 font-bold">{p.quantity}</td>
                  <td className="px-4 py-2">{p.reorderLevel}</td>
                  <td className="px-4 py-2">₹{p.unitPrice}</td>
                  <td className="px-4 py-2">₹{p.quantity * p.unitPrice}</td>
                  <td className="px-4 py-2">{p.lastUpdated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LowStockAlerts;

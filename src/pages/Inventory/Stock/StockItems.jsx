import React from "react";
import { Link } from "react-router-dom";

const StockItems = () => {
  // You can fetch the stock items from context or API
  const items = [
    { id: 1, name: "Switches", sku: "SW100", quantity: 20, unitPrice: 3000 },
    { id: 2, name: "Hub", sku: "HUB200", quantity: 15, unitPrice: 2500 },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Stock Items</h1>
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full table-auto">
          <thead className="bg-gray-200 sticky top-0">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">SKU</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Unit Price</th>
              <th className="px-4 py-2">Total Value</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="text-center border-b hover:bg-gray-50 transition">
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">{item.sku}</td>
                <td className="px-4 py-2">{item.quantity}</td>
                <td className="px-4 py-2">₹{item.unitPrice}</td>
                <td className="px-4 py-2">₹{item.quantity * item.unitPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockItems;

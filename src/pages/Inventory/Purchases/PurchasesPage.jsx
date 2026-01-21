import React from 'react';
import { FaPlus, FaFileCsv, FaFilePdf, FaBoxOpen, FaExclamationTriangle, FaExchangeAlt, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

const PurchasesPage = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Page Header */}
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Purchase Management</h1>
        <div className="flex gap-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition">
            <FaFileCsv /> CSV
          </button>
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700 transition">
            <FaFilePdf /> PDF
          </button>
        </div>
      </div>

      {/* Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Link to="/inventory/purchase/items" className="bg-white shadow rounded-xl p-5 flex flex-col items-center justify-center hover:shadow-lg transition">
          <FaBoxOpen className="text-4xl text-blue-600 mb-2" />
          <div className="text-lg font-semibold">Purchase Items</div>
        </Link>
        <Link to="/inventory/purchase/orders" className="bg-white shadow rounded-xl p-5 flex flex-col items-center justify-center hover:shadow-lg transition">
          <FaShoppingCart className="text-4xl text-green-600 mb-2" />
          <div className="text-lg font-semibold">Purchase Orders</div>
        </Link>
        <Link to="/inventory/purchase/vendors" className="bg-white shadow rounded-xl p-5 flex flex-col items-center justify-center hover:shadow-lg transition">
          <FaExclamationTriangle className="text-4xl text-purple-600 mb-2" />
          <div className="text-lg font-semibold">Vendors</div>
        </Link>
        <Link to="/inventory/purchase/transactions" className="bg-white shadow rounded-xl p-5 flex flex-col items-center justify-center hover:shadow-lg transition">
          <FaExchangeAlt className="text-4xl text-orange-600 mb-2" />
          <div className="text-lg font-semibold">Purchase Transactions</div>
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white shadow rounded-xl p-5 flex flex-col justify-between">
          <div className="text-gray-500 font-medium">Total Purchases</div>
          <div className="text-2xl font-bold mt-2">150</div>
        </div>
        <div className="bg-white shadow rounded-xl p-5 flex flex-col justify-between">
          <div className="text-gray-500 font-medium">Pending Orders</div>
          <div className="text-2xl font-bold mt-2">12</div>
        </div>
        <div className="bg-white shadow rounded-xl p-5 flex flex-col justify-between">
          <div className="text-gray-500 font-medium">Total Vendors</div>
          <div className="text-2xl font-bold mt-2">25</div>
        </div>
        <div className="bg-white shadow rounded-xl p-5 flex flex-col justify-between">
          <div className="text-gray-500 font-medium">Low Stock Alerts</div>
          <div className="text-2xl font-bold mt-2">5</div>
        </div>
      </div>
    </div>
  );
};

export default PurchasesPage;

import React, { useState, useEffect } from "react";
import SupplierDrawer from "./SupplierDrawer";
import SupplierForm from "./SupplierForm";
import Pagination from "../../../components/common/Pagination";
import Loader from "../../../components/common/Loader";

// Status Badge Component
const StatusBadge = ({ status }) => {
  const styles = {
    ACTIVE: "bg-green-100 text-green-700",
    ON_HOLD: "bg-yellow-100 text-yellow-700",
    BLOCKED: "bg-red-100 text-red-700",
  };

  return (
    <span className={`px-2 py-1 rounded text-xs ${styles[status]}`}>
      {status.replace("_", " ")}
    </span>
  );
};

// Supplier Row Component
const SupplierRow = ({ supplier, onView, onEdit, onDelete }) => {
  const [showMenu, setShowMenu] = React.useState(false);

  return (
    <tr className="hover:bg-slate-50">
      <td className="px-4 py-3">
        <div className="font-medium">{supplier.name}</div>
        <div className="text-xs text-slate-500">{supplier.id}</div>
      </td>
      <td className="px-4 py-3">
        <div>{supplier.contactPerson}</div>
        <div className="text-xs text-slate-500">{supplier.phone}</div>
      </td>
      <td className="px-4 py-3">{supplier.city}</td>
      <td className="px-4 py-3">
        <StatusBadge status={supplier.status} />
      </td>
      <td className="px-4 py-3 text-right">{supplier.totalOrders}</td>
      <td className="px-4 py-3 text-right font-medium">
        ₹ {supplier.outstandingAmount.toLocaleString()}
      </td>
      <td className="px-4 py-3">{supplier.lastPurchaseDate}</td>
      <td className="px-4 py-3 text-center">
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="text-slate-500 hover:text-slate-700"
          >
            ⋮
          </button>
          {showMenu && (
            <div className="absolute right-0 mt-1 w-48 bg-white border rounded shadow-lg z-10">
              <button onClick={() => { onView(supplier); setShowMenu(false); }} className="block w-full text-left px-4 py-2 hover:bg-slate-50">View Supplier</button>
              <button onClick={() => { onEdit(supplier); setShowMenu(false); }} className="block w-full text-left px-4 py-2 hover:bg-slate-50">Edit</button>
              <button className="block w-full text-left px-4 py-2 hover:bg-slate-50">View Purchases</button>
              <button className="block w-full text-left px-4 py-2 hover:bg-slate-50">View Ledger</button>
              <button onClick={() => { onDelete(supplier.id); setShowMenu(false); }} className="block w-full text-left px-4 py-2 hover:bg-slate-50 text-red-600">Delete</button>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};

const SuppliersPage = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    city: "",
    hasOutstanding: false,
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Drawer and Form states
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);

  // Simulate data fetching
  useEffect(() => {
    const fetchSuppliers = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockSuppliers = [
        {
          id: "SUP-001",
          name: "Bangalore Electronics",
          contactPerson: "Ravi Kumar",
          phone: "+91 98765 43210",
          email: "sales@blr-electronics.com",
          city: "Bangalore",
          gstin: "29ABCDE1234F1Z5",
          status: "ACTIVE",
          totalOrders: 42,
          outstandingAmount: 385000,
          lastPurchaseDate: "2024-01-12",
          paymentTerms: "Net 30",
        },
        {
          id: "SUP-002",
          name: "Mumbai Components Ltd",
          contactPerson: "Priya Sharma",
          phone: "+91 98765 43211",
          email: "priya@mumbai-components.com",
          city: "Mumbai",
          gstin: "27XYZAB5678C2Y9",
          status: "ON_HOLD",
          totalOrders: 28,
          outstandingAmount: 0,
          lastPurchaseDate: "2023-12-15",
          paymentTerms: "Net 15",
        },
        {
          id: "SUP-003",
          name: "Delhi Hardware",
          contactPerson: "Amit Singh",
          phone: "+91 98765 43212",
          email: "amit@delhi-hardware.com",
          city: "Delhi",
          gstin: "07PQRST9012D3X4",
          status: "BLOCKED",
          totalOrders: 15,
          outstandingAmount: 125000,
          lastPurchaseDate: "2023-11-20",
          paymentTerms: "Net 45",
        },
      ];

      setSuppliers(mockSuppliers);
      setLoading(false);
    };

    fetchSuppliers();
  }, []);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Filtered suppliers
  const filteredSuppliers = suppliers.filter((supplier) => {
    const matchesSearch =
      supplier.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      supplier.gstin.toLowerCase().includes(filters.search.toLowerCase()) ||
      supplier.phone.includes(filters.search) ||
      supplier.contactPerson.toLowerCase().includes(filters.search.toLowerCase());

    const matchesStatus = !filters.status || supplier.status === filters.status;
    const matchesCity = !filters.city || supplier.city === filters.city;
    const matchesOutstanding = !filters.hasOutstanding || supplier.outstandingAmount > 0;

    return matchesSearch && matchesStatus && matchesCity && matchesOutstanding;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredSuppliers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSuppliers = filteredSuppliers.slice(startIndex, startIndex + itemsPerPage);

  const addSupplier = () => {
    setEditingSupplier(null);
    setIsFormOpen(true);
  };

  const viewSupplier = (supplier) => {
    setSelectedSupplier(supplier);
    setIsDrawerOpen(true);
  };

  const editSupplier = (supplier) => {
    setEditingSupplier(supplier);
    setIsFormOpen(true);
  };

  const deleteSupplier = (id) => {
    setSuppliers(suppliers.filter((s) => s.id !== id));
  };

  const handleFilterChange = (changes) => {
    setFilters(prev => ({ ...prev, ...changes }));
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      status: "",
      city: "",
      hasOutstanding: false,
    });
  };

  const handleSaveSupplier = (formData) => {
    if (editingSupplier) {
      // Update existing supplier
      setSuppliers(suppliers.map(s =>
        s.id === editingSupplier.id
          ? { ...s, ...formData, id: s.id, totalOrders: s.totalOrders, outstandingAmount: s.outstandingAmount, lastPurchaseDate: s.lastPurchaseDate }
          : s
      ));
    } else {
      // Add new supplier
      const newSupplier = {
        ...formData,
        id: `SUP-${String(suppliers.length + 1).padStart(3, '0')}`,
        status: "ACTIVE",
        totalOrders: 0,
        outstandingAmount: 0,
        lastPurchaseDate: null,
      };
      setSuppliers([...suppliers, newSupplier]);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Suppliers</h1>
          <p className="text-sm text-slate-500">Manage vendors and purchase partners</p>
        </div>
        <button onClick={addSupplier} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
          + Add Supplier
        </button>
      </div>

      {/* Filters Bar */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow flex flex-wrap gap-4 items-center">
        <input
          type="text"
          placeholder="Search supplier, GST, phone..."
          className="border px-3 py-2 rounded flex-1 min-w-64"
          value={filters.search}
          onChange={(e) => handleFilterChange({ search: e.target.value })}
        />
        <select
          className="border px-3 py-2 rounded"
          value={filters.status}
          onChange={(e) => handleFilterChange({ status: e.target.value })}
        >
          <option value="">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="ON_HOLD">On Hold</option>
          <option value="BLOCKED">Blocked</option>
        </select>
        <select
          className="border px-3 py-2 rounded"
          value={filters.city}
          onChange={(e) => handleFilterChange({ city: e.target.value })}
        >
          <option value="">All Cities</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Delhi">Delhi</option>
        </select>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={filters.hasOutstanding}
            onChange={(e) => handleFilterChange({ hasOutstanding: e.target.checked })}
          />
          Outstanding {">"} ₹0
        </label>
        <button onClick={resetFilters} className="text-slate-500 hover:text-slate-700">
          Reset
        </button>
      </div>

      {/* Supplier Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        {loading ? (
          <div className="p-8">
            <Loader type="table" />
          </div>
        ) : (
          <>
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left">Supplier Name</th>
                  <th className="px-4 py-3 text-left">Contact</th>
                  <th className="px-4 py-3 text-left">Location</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-right">Total Orders</th>
                  <th className="px-4 py-3 text-right">Outstanding Amount</th>
                  <th className="px-4 py-3 text-left">Last Purchase</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedSuppliers.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-4 py-8 text-center text-slate-500">
                      {filteredSuppliers.length === 0 ? "No suppliers found" : "No suppliers match your filters"}
                    </td>
                  </tr>
                ) : (
                  paginatedSuppliers.map((supplier) => (
                    <SupplierRow
                      key={supplier.id}
                      supplier={supplier}
                      onView={viewSupplier}
                      onEdit={editSupplier}
                      onDelete={deleteSupplier}
                    />
                  ))
                )}
              </tbody>
            </table>
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}
      </div>

      {/* Supplier Drawer */}
      <SupplierDrawer
        supplier={selectedSupplier}
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setSelectedSupplier(null);
        }}
      />

      {/* Supplier Form */}
      <SupplierForm
        supplier={editingSupplier}
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingSupplier(null);
        }}
        onSave={handleSaveSupplier}
      />
    </div>
  );
};

export default SuppliersPage;

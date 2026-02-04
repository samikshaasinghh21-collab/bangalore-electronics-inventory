import React, { useState, useEffect } from "react";
import CustomerDrawer from "./CustomerDrawer";
import CustomerForm from "./CustomerForm";
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

// Credit Utilization Bar
const CreditBar = ({ used, limit }) => {
  const percentage = limit > 0 ? (used / limit) * 100 : 0;
  const isOverLimit = used > limit;

  return (
    <div className="flex flex-col gap-1">
      <div className="text-xs text-slate-600">
        ₹{used.toLocaleString()} / ₹{limit.toLocaleString()}
      </div>
      <div className="w-full bg-slate-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${isOverLimit ? 'bg-red-500' : percentage > 80 ? 'bg-yellow-500' : 'bg-blue-500'}`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        ></div>
      </div>
    </div>
  );
};

// Customer Row Component
const CustomerRow = ({ customer, onView, onEdit, onDelete }) => {
  const [showMenu, setShowMenu] = React.useState(false);

  return (
    <tr className="hover:bg-slate-50">
      <td className="px-4 py-3">
        <div className="font-medium">{customer.name}</div>
        <div className="text-xs text-slate-500">{customer.id}</div>
      </td>
      <td className="px-4 py-3">
        <div>{customer.contactPerson}</div>
        <div className="text-xs text-slate-500">{customer.phone}</div>
      </td>
      <td className="px-4 py-3">{customer.city}</td>
      <td className="px-4 py-3">
        <StatusBadge status={customer.status} />
      </td>
      <td className="px-4 py-3 text-right">{customer.totalOrders}</td>
      <td className="px-4 py-3 text-right font-medium">
        ₹ {customer.outstandingAmount.toLocaleString()}
      </td>
      <td className="px-4 py-3">
        <CreditBar used={customer.outstandingAmount} limit={customer.creditLimit} />
      </td>
      <td className="px-4 py-3">{customer.lastInvoiceDate ? new Date(customer.lastInvoiceDate).toLocaleDateString('en-IN') : '—'}</td>
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
              <button onClick={() => { onView(customer); setShowMenu(false); }} className="block w-full text-left px-4 py-2 hover:bg-slate-50">View Customer</button>
              <button onClick={() => { onEdit(customer); setShowMenu(false); }} className="block w-full text-left px-4 py-2 hover:bg-slate-50">Edit</button>
              <button className="block w-full text-left px-4 py-2 hover:bg-slate-50">View Sales Orders</button>
              <button className="block w-full text-left px-4 py-2 hover:bg-slate-50">View Invoices</button>
              <button onClick={() => { onDelete(customer.id); setShowMenu(false); }} className="block w-full text-left px-4 py-2 hover:bg-slate-50 text-red-600">Delete</button>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    city: "",
    hasOutstanding: false,
    overCreditLimit: false,
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Drawer and Form states (placeholders for now)
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);

  // Simulate data fetching
  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockCustomers = [
        {
          id: "CUST-001",
          name: "ABC Retail Pvt Ltd",
          contactPerson: "Anita Sharma",
          phone: "+91 98765 11122",
          email: "accounts@abcretail.com",
          city: "Mumbai",
          gstin: "27ABCDE1234F1Z9",
          status: "ACTIVE",
          totalOrders: 64,
          outstandingAmount: 425000,
          creditLimit: 1000000,
          lastInvoiceDate: "2024-01-18",
          paymentTerms: "Net 15",
        },
        {
          id: "CUST-002",
          name: "XYZ Traders",
          contactPerson: "Rajesh Kumar",
          phone: "+91 98765 11123",
          email: "rajesh@xyztraders.com",
          city: "Delhi",
          gstin: "07PQRST9012D3X4",
          status: "ON_HOLD",
          totalOrders: 28,
          outstandingAmount: 0,
          creditLimit: 500000,
          lastInvoiceDate: "2023-12-15",
          paymentTerms: "Net 30",
        },
        {
          id: "CUST-003",
          name: "Global Electronics",
          contactPerson: "Priya Singh",
          phone: "+91 98765 11124",
          email: "priya@globalelec.com",
          city: "Bangalore",
          gstin: "29ABCDE1234F1Z5",
          status: "BLOCKED",
          totalOrders: 15,
          outstandingAmount: 1250000,
          creditLimit: 1000000,
          lastInvoiceDate: "2023-11-20",
          paymentTerms: "Net 45",
        },
      ];

      setCustomers(mockCustomers);
      setLoading(false);
    };

    fetchCustomers();
  }, []);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Filtered customers
  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      customer.gstin.toLowerCase().includes(filters.search.toLowerCase()) ||
      customer.phone.includes(filters.search) ||
      customer.contactPerson.toLowerCase().includes(filters.search.toLowerCase());

    const matchesStatus = !filters.status || customer.status === filters.status;
    const matchesCity = !filters.city || customer.city === filters.city;
    const matchesOutstanding = !filters.hasOutstanding || customer.outstandingAmount > 0;
    const matchesOverCredit = !filters.overCreditLimit || customer.outstandingAmount > customer.creditLimit;

    return matchesSearch && matchesStatus && matchesCity && matchesOutstanding && matchesOverCredit;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCustomers = filteredCustomers.slice(startIndex, startIndex + itemsPerPage);

  const addCustomer = () => {
    setEditingCustomer(null);
    setIsFormOpen(true);
  };

  const viewCustomer = (customer) => {
    setSelectedCustomer(customer);
  };

  const editCustomer = (customer) => {
    setEditingCustomer(customer);
    setIsFormOpen(true);
  };

  const deleteCustomer = (id) => {
    setCustomers(customers.filter((c) => c.id !== id));
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
      overCreditLimit: false,
    });
  };

  const handleSaveCustomer = (formData) => {
    if (editingCustomer) {
      // Update existing customer
      setCustomers(customers.map(c =>
        c.id === editingCustomer.id
          ? { ...c, ...formData, id: c.id, totalOrders: c.totalOrders, outstandingAmount: c.outstandingAmount, lastInvoiceDate: c.lastInvoiceDate }
          : c
      ));
    } else {
      // Add new customer
      const newCustomer = {
        ...formData,
        id: `CUST-${String(customers.length + 1).padStart(3, '0')}`,
        status: "ACTIVE",
        totalOrders: 0,
        outstandingAmount: 0,
        lastInvoiceDate: null,
      };
      setCustomers([...customers, newCustomer]);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Customers</h1>
          <p className="text-sm text-slate-500">Manage buyers and revenue partners</p>
        </div>
        <button onClick={addCustomer} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
          + Add Customer
        </button>
      </div>

      {/* Filters Bar */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow flex flex-wrap gap-4 items-center">
        <input
          type="text"
          placeholder="Search customer, GST, phone..."
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
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={filters.overCreditLimit}
            onChange={(e) => handleFilterChange({ overCreditLimit: e.target.checked })}
          />
          🚨 Over Credit Limit
        </label>
        <button onClick={resetFilters} className="text-slate-500 hover:text-slate-700">
          ♻ Reset
        </button>
      </div>

      {/* Customer Table */}
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
                  <th className="px-4 py-3 text-left">Customer Name</th>
                  <th className="px-4 py-3 text-left">Contact</th>
                  <th className="px-4 py-3 text-left">Location</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-right">Total Orders</th>
                  <th className="px-4 py-3 text-right">Outstanding</th>
                  <th className="px-4 py-3 text-left">Credit Used / Limit</th>
                  <th className="px-4 py-3 text-left">Last Invoice</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedCustomers.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="px-4 py-8 text-center text-slate-500">
                      {filteredCustomers.length === 0 ? "No customers found" : "No customers match your filters"}
                    </td>
                  </tr>
                ) : (
                  paginatedCustomers.map((customer) => (
                    <CustomerRow
                      key={customer.id}
                      customer={customer}
                      onView={viewCustomer}
                      onEdit={editCustomer}
                      onDelete={deleteCustomer}
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

      {/* Customer Drawer */}
      <CustomerDrawer
        customer={selectedCustomer}
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setSelectedCustomer(null);
        }}
      />

      {/* Customer Form */}
      <CustomerForm
        customer={editingCustomer}
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingCustomer(null);
        }}
        onSave={handleSaveCustomer}
      />
    </div>
  );
};

export default CustomersPage;

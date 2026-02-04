import React, { useState, useEffect } from "react";
import SupplierStats from "../../../components/common/SupplierStats";
import ActivityTimeline from "../../../components/common/ActivityTimeline";
import { formatCurrency, formatDate } from "../../../utils/helpers";

// Status Badge Component
const StatusBadge = ({ status }) => {
  const styles = {
    ACTIVE: "bg-green-100 text-green-700 border-green-200",
    PENDING: "bg-yellow-100 text-yellow-700 border-yellow-200",
    COMPLETED: "bg-blue-100 text-blue-700 border-blue-200",
    CANCELLED: "bg-red-100 text-red-700 border-red-200",
  };

  return (
    <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full border ${styles[status] || "bg-gray-100 text-gray-700 border-gray-200"}`}>
      {status.replace("_", " ")}
    </span>
  );
};

// Purchase Order Row Component
const PurchaseOrderRow = ({ po, onClick }) => {
  return (
    <tr className="hover:bg-slate-50 cursor-pointer" onClick={() => onClick(po)}>
      <td className="px-4 py-3 font-medium">{po.number}</td>
      <td className="px-4 py-3">{formatDate(po.date)}</td>
      <td className="px-4 py-3 text-right font-medium">{formatCurrency(po.amount)}</td>
      <td className="px-4 py-3">
        <StatusBadge status={po.status} />
      </td>
    </tr>
  );
};

// Empty State Component
const EmptyState = ({ title, message, icon = "📄" }) => (
  <div className="text-center py-12">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-lg font-medium text-slate-900 mb-2">{title}</h3>
    <p className="text-slate-500">{message}</p>
  </div>
);

// Tab Component
const Tab = ({ id, label, active, onClick }) => (
  <button
    onClick={() => onClick(id)}
    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
      active
        ? "border-indigo-500 text-indigo-600"
        : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
    }`}
  >
    {label}
  </button>
);

// Tab Content Components
const PurchasesTab = ({ supplier, onPurchaseClick }) => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch purchases for this supplier
    const fetchPurchases = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));

      // Mock data - in real app, this would be fetched based on supplier.id
      const mockPurchases = [
        {
          id: "PO-001",
          number: "PO-2024-001",
          date: "2024-01-15",
          amount: 125000,
          status: "COMPLETED",
          items: 5,
        },
        {
          id: "PO-002",
          number: "PO-2024-002",
          date: "2024-01-10",
          amount: 89000,
          status: "PENDING",
          items: 3,
        },
        {
          id: "PO-003",
          number: "PO-2023-045",
          date: "2023-12-20",
          amount: 156000,
          status: "COMPLETED",
          items: 7,
        },
        {
          id: "PO-004",
          number: "PO-2023-038",
          date: "2023-12-05",
          amount: 67000,
          status: "CANCELLED",
          items: 2,
        },
      ];

      setPurchases(mockPurchases);
      setLoading(false);
    };

    if (supplier) {
      fetchPurchases();
    }
  }, [supplier]);

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-slate-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-slate-200 rounded"></div>
            <div className="h-4 bg-slate-200 rounded"></div>
            <div className="h-4 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (purchases.length === 0) {
    return (
      <div className="p-6">
        <EmptyState
          title="No Purchase Orders"
          message="This supplier doesn't have any purchase orders yet."
          icon="📦"
        />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-medium text-slate-900">Purchase Orders</h3>
        <p className="text-sm text-slate-500">Click on any order to view details</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-slate-700">PO Number</th>
              <th className="px-4 py-3 text-left font-medium text-slate-700">Date</th>
              <th className="px-4 py-3 text-right font-medium text-slate-700">Amount</th>
              <th className="px-4 py-3 text-left font-medium text-slate-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((po) => (
              <PurchaseOrderRow
                key={po.id}
                po={po}
                onClick={onPurchaseClick}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const InvoicesTab = () => (
  <div className="p-6">
    <EmptyState
      title="No Invoices"
      message="Invoice data will be available here once integrated."
      icon="📄"
    />
  </div>
);

const PaymentsTab = () => (
  <div className="p-6">
    <EmptyState
      title="No Payments"
      message="Payment history will be displayed here."
      icon="💳"
    />
  </div>
);

const ActivityTab = ({ supplier }) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch activities for this supplier
    const fetchActivities = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 300));

      // Mock activity data - in real app, this would be fetched based on supplier.id
      const mockActivities = [
        {
          id: 1,
          type: "PO_CREATED",
          title: "Purchase Order Created",
          description: "New purchase order PO-2024-001 was created",
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
          metadata: "₹ 1,25,000 • 5 items",
        },
        {
          id: 2,
          type: "PAYMENT_RECEIVED",
          title: "Payment Received",
          description: "Payment of ₹ 25,000 received for PO-2024-001",
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
          metadata: "Payment ID: PAY-001",
        },
        {
          id: 3,
          type: "PO_UPDATED",
          title: "Purchase Order Updated",
          description: "Status changed to Pending Approval for PO-2024-002",
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
          metadata: "Status: PENDING → APPROVED",
        },
        {
          id: 4,
          type: "INVOICE_CREATED",
          title: "Invoice Generated",
          description: "Invoice INV-2024-001 created for PO-2023-045",
          timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
          metadata: "₹ 1,56,000 • Due in 30 days",
        },
        {
          id: 5,
          type: "SUPPLIER_UPDATED",
          title: "Supplier Information Updated",
          description: "Contact details and payment terms updated",
          timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
          metadata: "Updated by: Admin User",
        },
      ];

      setActivities(mockActivities);
      setLoading(false);
    };

    if (supplier) {
      fetchActivities();
    }
  }, [supplier]);

  return (
    <div className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-medium text-slate-900">Activity Timeline</h3>
        <p className="text-sm text-slate-500">Recent activity and transaction history</p>
      </div>

      <ActivityTimeline
        activities={activities}
        loading={loading}
        emptyMessage="No activity recorded for this supplier yet."
      />
    </div>
  );
};

const SupplierDrawer = ({ supplier, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("purchases");

  const tabs = [
    { id: "purchases", label: "Purchases" },
    { id: "invoices", label: "Invoices" },
    { id: "payments", label: "Payments" },
    { id: "activity", label: "Activity" },
  ];

  const handlePurchaseClick = (po) => {
    // In a real app, this would navigate to the PO details page
    console.log("Navigate to PO:", po.id);
    // For now, just log - in real implementation, use router to navigate
  };

  if (!isOpen || !supplier) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="absolute right-0 top-0 h-full w-full max-w-2xl bg-white shadow-xl transform transition-transform">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200">
            <h2 className="text-xl font-semibold text-slate-900">Supplier Details</h2>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Supplier Header */}
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-medium text-slate-900">{supplier.name}</h3>
                  <p className="text-sm text-slate-500">{supplier.id}</p>
                  <div className="mt-2 flex items-center space-x-4">
                    <StatusBadge status={supplier.status} />
                    <span className="text-sm text-slate-500">{supplier.city}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-slate-500">Trust Score</div>
                  <div className="text-2xl font-bold text-green-600">95%</div>
                </div>
              </div>
            </div>

            {/* Supplier Overview */}
            <div className="p-6 border-b border-slate-200">
              <h4 className="text-sm font-medium text-slate-900 mb-3">Business Information</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-slate-500">Contact Person:</span>
                  <div className="font-medium">{supplier.contactPerson}</div>
                </div>
                <div>
                  <span className="text-slate-500">Phone:</span>
                  <div className="font-medium">{supplier.phone}</div>
                </div>
                <div>
                  <span className="text-slate-500">Email:</span>
                  <div className="font-medium">{supplier.email}</div>
                </div>
                <div>
                  <span className="text-slate-500">GSTIN:</span>
                  <div className="font-medium">{supplier.gstin}</div>
                </div>
                <div>
                  <span className="text-slate-500">Payment Terms:</span>
                  <div className="font-medium">{supplier.paymentTerms}</div>
                </div>
              </div>
            </div>

            {/* Supplier Stats */}
            <div className="p-6 border-b border-slate-200">
              <h4 className="text-sm font-medium text-slate-900 mb-3">Business Intelligence</h4>
              <SupplierStats supplier={supplier} />
            </div>

            {/* Tabs */}
            <div>
              <div className="border-b border-slate-200">
                <div className="flex">
                  {tabs.map((tab) => (
                    <Tab
                      key={tab.id}
                      id={tab.id}
                      label={tab.label}
                      active={activeTab === tab.id}
                      onClick={setActiveTab}
                    />
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              {activeTab === "purchases" && (
                <PurchasesTab supplier={supplier} onPurchaseClick={handlePurchaseClick} />
              )}
              {activeTab === "invoices" && <InvoicesTab />}
              {activeTab === "payments" && <PaymentsTab />}
              {activeTab === "activity" && <ActivityTab />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierDrawer;

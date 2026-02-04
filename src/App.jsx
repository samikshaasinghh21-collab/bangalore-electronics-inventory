import { Routes, Route, Navigate } from "react-router-dom";

// Pages
import Login from "./pages/Auth/Login.jsx";
import MainDashboard from "./pages/Dashboard/MainDashboard.jsx";
import InventoryDashboard from "./pages/Inventory/InventoryDashboard.jsx";
import PurchasePage from "./pages/Inventory/Purchases/PurchasesPage.jsx";
import Vendors from "./pages/Inventory/Purchases/Vendors.jsx";
import BillingPage from "./pages/Inventory/Billing/BillingPage.jsx";
import InvoicePage from "./pages/Inventory/Invoice/InvoicePage.jsx";
import ClientDashboard from "./pages/ClientPortal/ClientDashboard.jsx";
import ProductWiseReport from "./pages/Inventory/Reports/ProductWiseReport.jsx";
import Admin from "./pages/Admin/Admin.jsx";
import Projects from "./pages/Inventory/Projects/Projects.jsx";
import ProjectHome from "./pages/Inventory/Projects/ProjectHome.jsx";
import ProjectInventory from "./pages/Inventory/Projects/ProjectInventory.jsx";
import ProjectPurchaseOrder from "./pages/Inventory/Projects/ProjectPurchaseOrder.jsx";
import ProjectReceive from "./pages/Inventory/Projects/ProjectReceive.jsx";
import ProjectAllocate from "./pages/Inventory/Projects/ProjectAllocate.jsx";
import ProjectDeliveryChallan from "./pages/Inventory/Projects/ProjectDeliveryChallan.jsx";
import PurchaseItems from "./pages/Inventory/Purchases/PurchaseItems.jsx";
import PurchaseOrders from "./pages/Inventory/Purchases/PurchaseOrders.jsx";
import StockTransactions from "./pages/Inventory/Stock/StockTransactions.jsx";
import CreateItems from "./pages/Inventory/Projects/Items/CreateItems.jsx";
import CreateProject from "./pages/Inventory/Projects/CreateProject.jsx";
// Layout & Route Guard
import PageLayout from "./components/layout/PageLayout.jsx";
import ProtectedRoute from "./app/ProtectedRoute.jsx";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Protected Routes */}
      <Route
        element={
          <ProtectedRoute>
            <PageLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<MainDashboard />} />

        {/* Inventory */}
        <Route path="/inventory" element={<InventoryDashboard />} />
        <Route path="/inventory/stock/transactions" element={<StockTransactions />} />

        {/* Purchases */}
        <Route path="/purchases" element={<PurchasePage />} />
        <Route path="/inventory/purchase/items" element={<PurchaseItems />} />
        <Route path="/inventory/purchase/orders" element={<PurchaseOrders />} />
        <Route path="/suppliers" element={<Vendors />} />

        {/* Billing & Invoices */}
        <Route path="/billing" element={<BillingPage />} />
        <Route path="/invoices" element={<InvoicePage />} />

        {/* Customers */}
        <Route path="/customers" element={<ClientDashboard />} />

        {/* Reports */}
        <Route path="/reports" element={<ProductWiseReport />} />

        {/* Projects */}
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/create" element={<CreateProject />} />
        <Route path="/projects/home" element={<ProjectHome />} />
        <Route path="/projects/inventory" element={<ProjectInventory />} />
        <Route path="/projects/purchase-order" element={<ProjectPurchaseOrder />} />
        <Route path="/projects/receive" element={<ProjectReceive />} />
        <Route path="/projects/allocate" element={<ProjectAllocate />} />
        <Route path="/projects/delivery-challan" element={<ProjectDeliveryChallan />} />
        <Route path="/projects/items/create" element={<CreateItems />} />
        <Route path="/project/item/create-items" element={<CreateItems />} />
      </Route>

      {/* Admin Routes */}
      <Route
        element={
          <ProtectedRoute requiredRole="admin">
            <PageLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/admin" element={<Admin />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;

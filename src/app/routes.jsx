import MainDashboard from "../pages/Dashboard/MainDashboard";
import Admin from "../pages/Admin/Admin";
import InventoryDashboard from "../pages/Inventory/InventoryDashboard";
import PurchasesPage from "../pages/Inventory/Purchases/PurchasesPage";
import BillingPage from "../pages/Inventory/Billing/BillingPage";
import InvoicePage from "../pages/Inventory/Invoice/InvoicePage";
import Vendors from "../pages/Inventory/Purchases/Vendors";
import PurchaseItems from "../pages/Inventory/Purchases/PurchaseItems";
import PurchaseOrders from "../pages/Inventory/Purchases/PurchaseOrders";
import StockTransactions from "../pages/Inventory/Stock/StockTransactions";
import ClientDashboard from "../pages/ClientPortal/ClientDashboard";
import ProductWiseReport from "../pages/Inventory/Reports/ProductWiseReport";
import Login from "../pages/Auth/Login";
import ProtectedRoute from "./ProtectedRoute";

const routes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <MainDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/inventory",
    element: (
      <ProtectedRoute>
        <InventoryDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/purchases",
    element: <PurchasesPage />,
  },
  {
    path: "/inventory/purchase/items",
    element: <PurchaseItems />,
  },
  {
    path: "/inventory/purchase/orders",
    element: <PurchaseOrders />,
  },
  {
    path: "/inventory/purchase/vendors",
    element: <Vendors />,
  },
  {
    path: "/inventory/purchase/transactions",
    element: <StockTransactions />,
  },
  {
    path: "/billing",
    element: (
      <ProtectedRoute>
        <BillingPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/invoices",
    element: (
      <ProtectedRoute>
        <InvoicePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/suppliers",
    element: (
      <ProtectedRoute>
        <Vendors />
      </ProtectedRoute>
    ),
  },
  {
    path: "/customers",
    element: (
      <ProtectedRoute>
        <ClientDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/reports",
    element: (
      <ProtectedRoute>
        <ProductWiseReport />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute requiredRole="admin">
        <Admin />
      </ProtectedRoute>
    ),
  },
];

export default routes;

import MainDashboard from "../pages/Dashboard/MainDashboard";
import Admin from "../pages/Admin/Admin";
import InventoryDashboard from "../pages/Inventory/InventoryDashboard";
import PurchasesPage from "../pages/Inventory/Purchases/PurchasesPage";
import BillingPage from "../pages/Inventory/Billing/BillingPage";
import InvoicePage from "../pages/Inventory/Invoice/InvoicePage";
import Invoice from "../pages/Inventory/Invoice/Invoice";
import Vendors from "../pages/Inventory/Purchases/Vendors";
import PurchaseItems from "../pages/Inventory/Purchases/PurchaseItems";
import PurchaseOrders from "../pages/Inventory/Purchases/PurchaseOrders";
import SuppliersPage from "../pages/Inventory/Suppliers/SuppliersPage";
import CustomersPage from "../pages/Inventory/Customers/CustomersPage";
import StockTransactions from "../pages/Inventory/Stock/StockTransactions";
import ClientDashboard from "../pages/ClientPortal/ClientDashboard";
import ProductWiseReport from "../pages/Inventory/Reports/ProductWiseReport";
import Login from "../pages/Auth/Login";
import Cart from "../pages/Inventory/Cart/Cart";
import ProtectedRoute from "./ProtectedRoute";
import CartProvider from "../context/CartContext";

/* ✅ PROJECT IMPORTS */
import Projects from "../pages/Inventory/Projects/Projects";
import ProjectHome from "../pages/Inventory/Projects/ProjectHome";
import ProjectAllocate from "../pages/Inventory/Projects/ProjectAllocate";
import ProjectPurchaseOrder from "../pages/Inventory/Projects/ProjectPurchaseOrder";
import ProjectReceive from "../pages/Inventory/Projects/ProjectReceive";
import ProjectInventory from "../pages/Inventory/Projects/ProjectInventory";
import ProjectDeliveryChallan from "../pages/Inventory/Projects/ProjectDeliveryChallan";

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

  /* ================= PURCHASES ================= */
  {
    path: "/purchases",
    element: (
      <ProtectedRoute>
        <PurchasesPage />
      </ProtectedRoute>
    ),
  },

  {
    path: "/inventory/purchase/items",
    element: (
      <ProtectedRoute>
        <CartProvider>
          <PurchaseItems />
        </CartProvider>
      </ProtectedRoute>
    ),
  },

  {
    path: "/inventory/purchase/orders",
    element: (
      <ProtectedRoute>
        <CartProvider>
          <PurchaseOrders />
        </CartProvider>
      </ProtectedRoute>
    ),
  },

  {
    path: "/inventory/purchase/vendors",
    element: (
      <ProtectedRoute>
        <Vendors />
      </ProtectedRoute>
    ),
  },

  {
    path: "/inventory/purchase/transactions",
    element: (
      <ProtectedRoute>
        <StockTransactions />
      </ProtectedRoute>
    ),
  },

  {
    path: "/inventory/cart",
    element: (
      <ProtectedRoute>
        <CartProvider>
          <Cart />
        </CartProvider>
      </ProtectedRoute>
    ),
  },

  /* ================= PROJECTS (ERP FLOW) ================= */
  {
    path: "/inventory/projects",
    element: (
      <ProtectedRoute>
        <Projects />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <ProjectHome /> }, // default
      { path: "home", element: <ProjectHome /> },
      { path: "allocate", element: <ProjectAllocate /> },
      { path: "po", element: <ProjectPurchaseOrder /> },
      { path: "receive", element: <ProjectReceive /> },
      { path: "inventory", element: <ProjectInventory /> },
      { path: "delivery", element: <ProjectDeliveryChallan /> },
    ],
  },

  /* ================= OTHER MODULES ================= */
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
    path: "/invoice",
    element: (
      <ProtectedRoute>
        <Invoice />
      </ProtectedRoute>
    ),
  },

  {
    path: "/suppliers",
    element: (
      <ProtectedRoute>
        <SuppliersPage />
      </ProtectedRoute>
    ),
  },

  {
    path: "/customers",
    element: (
      <ProtectedRoute>
        <CustomersPage />
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

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login.jsx";
import MainDashboard from "./pages/Dashboard/MainDashboard.jsx";
import InventoryDashboard from "./pages/Inventory/InventoryDashboard.jsx";
import PurchasePage from "./pages/Inventory/Purchases/PurchasesPage.jsx";
import PurchaseItems from "./pages/Inventory/Purchases/PurchaseItems.jsx";
import PurchaseOrders from "./pages/Inventory/Purchases/PurchaseOrders.jsx";
import Vendors from "./pages/Inventory/Purchases/Vendors.jsx";
import LowStockAlerts from "./pages/Inventory/Stock/LowStockAlerts.jsx";
import StockTransactions from "./pages/Inventory/Stock/StockTransactions.jsx";
import StockItems from "./pages/Inventory/Stock/StockItems.jsx";
import StockPage from "./pages/Inventory/Stock/StockPage.jsx";
import Projects from "./pages/Inventory/Projects/Projects.jsx";
import ProjectHome from "./pages/Inventory/Projects/ProjectHome.jsx";
import ProjectInventory from "./pages/Inventory/Projects/ProjectInventory.jsx";
import ProjectPurchaseOrder from "./pages/Inventory/Projects/ProjectPurchaseOrder.jsx";
import ProjectReceive from "./pages/Inventory/Projects/ProjectReceive.jsx";
import ProjectAllocate from "./pages/Inventory/Projects/ProjectAllocate.jsx";
import ProjectDeliveryChallan from "./pages/Inventory/Projects/ProjectDeliveryChallan.jsx";



import ProtectedRoute from "./app/ProtectedRoute.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        {/* Inventory routes */}
        <Route
          path="/inventory/*"
          element={
            <ProtectedRoute>
              <MainDashboard />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<InventoryDashboard />} />

          {/* Purchase section */}
          <Route path="purchase" element={<PurchasePage />} />
          <Route path="purchase/items" element={<PurchaseItems />} />
          <Route path="purchase/orders" element={<PurchaseOrders />} />
          <Route path="purchase/vendors" element={<Vendors />} />
          <Route path="purchase/low" element={<LowStockAlerts />} />
          <Route path="purchase/transactions" element={<StockTransactions />} />

          {/* Stock section */}
          <Route path="stock" element={<StockPage />} />
          <Route path="stock/items" element={<StockItems />} />
          <Route path="stock/transactions" element={<StockTransactions />} />
          <Route path="stock/low" element={<LowStockAlerts />} />

          {/* Projects section */}
          <Route path="projects" element={<Projects />}>
            <Route index element={<ProjectHome />} />
            <Route path="items" element={<ProjectInventory />} />
            <Route path="purchase-order" element={<ProjectPurchaseOrder />} />
            <Route path="receive" element={<ProjectReceive />} />
            <Route path="allocate" element={<ProjectAllocate />} />
            <Route path="delivery-challan" element={<ProjectDeliveryChallan />} />
          </Route>
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// ✅ FIXED PATHS
import MainDashboard from "./pages/Dashboard/MainDashboard";
import InventoryDashboard from "./pages/Inventory/InventoryDashboard";
import StockPage from "./pages/Inventory/Stock/StockPage";
import PurchasesPage from "./pages/Inventory/Purchases/PurchasesPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/inventory/dashboard" />} />

        {/* Dashboard Layout */}
        <Route path="/inventory" element={<MainDashboard />}>
          <Route path="dashboard" element={<InventoryDashboard />} />
          <Route path="stock" element={<StockPage />} />
          <Route path="purchases" element={<PurchasesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

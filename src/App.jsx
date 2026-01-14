import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login.jsx";
import MainDashboard from "./pages/Dashboard/MainDashboard.jsx";
import InventoryDashboard from "./pages/Inventory/InventoryDashboard.jsx";
import StockPage from "./pages/Inventory/Stock/StockPage.jsx";
import LowStockAlerts from "./pages/Inventory/Stock/LowStockAlerts.jsx";
import StockTransactions from "./pages/Inventory/Stock/StockTransactions.jsx";
import ProtectedRoute from "./app/ProtectedRoute.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
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
          <Route path="stockpage" element={<StockPage />} />
          <Route path="stock" element={<StockPage />} />
          <Route path="stock/items" element={<StockPage />} />
          <Route path="stock/low" element={<LowStockAlerts />} />
          <Route path="stock/transactions" element={<StockTransactions />} />
          {/* Add more pages here */}
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import MainDashboard from "../pages/Dashboard/MainDashboard";

export const routes = [
  {
    path: "/dashboard",
    element: <MainDashboard />,
  },
];

import MainDashboard from "../pages/Dashboard/MainDashboard";
import Admin from "../pages/Admin/Admin";
import ProtectedRoute from "./ProtectedRoute";
import App from "../App.jsx";
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
    path: "/admin",
    element: (
      <ProtectedRoute requiredRole="admin">
        <Admin />
      </ProtectedRoute>
    ),
  },
];

export default routes;

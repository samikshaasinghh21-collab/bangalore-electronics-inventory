import Login from "../pages/Auth/Login";
import MainDashboard from "../pages/Dashboard/MainDashboard";
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
];

export default routes;

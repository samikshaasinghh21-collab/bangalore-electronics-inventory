import React, { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import {
  AiOutlineHome,
  AiOutlineStock,
  AiOutlineShoppingCart,
  AiOutlineShop,
  AiOutlineEnvironment,
  AiOutlineProject,
  AiOutlineTruck,
  AiOutlineSwap,
  AiOutlineBarChart,
  AiOutlineTool,
  AiOutlineMenu,
  AiOutlineDown,
  AiOutlineUp,
} from "react-icons/ai";
import { FiBell, FiUser, FiSettings, FiLogOut } from "react-icons/fi";

// Example low stock data; replace with real data from context/API
const exampleProducts = [
  { id: 1, name: "Switches", quantity: 3, reorderLevel: 5 },
  { id: 2, name: "Hub", quantity: 8, reorderLevel: 10 },
  { id: 3, name: "Router", quantity: 2, reorderLevel: 5 },
];

const MainDashboard = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [stockMenuOpen, setStockMenuOpen] = useState(true);

  // Dynamic low stock count
  const lowStockCount = exampleProducts.filter(p => p.quantity <= p.reorderLevel).length;

  // Responsive: auto open/close sidebar on resize
  useEffect(() => {
    const handleResize = () => setSidebarOpen(window.innerWidth >= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Sidebar Links with optional children
  const sidebarLinks = [
    { name: "Dashboard", icon: AiOutlineHome, path: "/inventory/dashboard" },
    {
      name: "Stock",
      icon: AiOutlineStock,
      badge: lowStockCount,
      children: [
        { name: "Overview", path: "/inventory/stock" },
        { name: "Items", path: "/inventory/stock/items" },
        { name: "Transactions", path: "/inventory/stock/transactions" },
        { name: "Low Stock Alerts", path: "/inventory/stock/low" },
      ],
    },
    { name: "Purchases", icon: AiOutlineShoppingCart, path: "/inventory/purchasespage" },
    { name: "Vendors", icon: AiOutlineShop, path: "/inventory/vendors" },
    { name: "Locations", icon: AiOutlineEnvironment, path: "/inventory/locationspage" },
    { name: "Projects", icon: AiOutlineProject, path: "/inventory/projectspage" },
    { name: "Delivery", icon: AiOutlineTruck, path: "/inventory/deliverypage" },
    { name: "Relocation", icon: AiOutlineSwap, path: "/inventory/reallocation" },
    { name: "Reports", icon: AiOutlineBarChart, path: "/inventory/reportspage" },
    { name: "Maintenance", icon: AiOutlineTool, path: "/inventory/maintenancepage" },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">

      {/* Sidebar */}
      {sidebarOpen && (
        <>
          <aside
            className={`fixed md:relative z-20 h-screen bg-gradient-to-b from-blue-900 to-blue-600 text-white transition-all duration-300
              ${collapsed ? "w-20" : "w-64"} p-6`}
          >
            {/* Logo / Title */}
            <div className="flex items-center justify-between mb-8">
              {!collapsed && <h2 className="text-2xl font-bold">📦 Inventory</h2>}
              {collapsed ? (
                <button className="text-white" onClick={() => setCollapsed(false)}>☰</button>
              ) : (
                <button className="text-white md:hidden" onClick={() => setSidebarOpen(false)}>✖</button>
              )}
            </div>

            {/* User Info */}
            {!collapsed && (
              <div className="mb-6">
                <p className="font-bold truncate">{user?.email}</p>
                <p className="text-sm text-slate-300 capitalize">{user?.role}</p>
              </div>
            )}

            {/* Navigation */}
            <nav className="flex flex-col gap-1 overflow-y-auto h-[calc(100vh-10rem)]">
              {sidebarLinks.map((link) => (
                <div key={link.name}>
                  {/* Main Link */}
                  <NavLink
                    to={link.path}
                    end={!link.children}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-lg font-semibold transition duration-200
                      ${isActive ? "bg-white/20" : "hover:bg-white/10"}`
                    }
                    title={link.name}
                    onClick={() => link.children && setStockMenuOpen(!stockMenuOpen)}
                  >
                    <link.icon size={22} />
                    {!collapsed && <span>{link.name}</span>}
                    {!collapsed && link.badge && (
                      <span className="ml-auto bg-red-500 text-xs px-2 py-0.5 rounded-full font-bold">{link.badge}</span>
                    )}
                    {!collapsed && link.children && (
                      <span className="ml-auto">{stockMenuOpen ? <AiOutlineUp /> : <AiOutlineDown />}</span>
                    )}
                  </NavLink>

                  {/* Child Links */}
                  {!collapsed && link.children && stockMenuOpen && (
                    <div className="ml-6 mt-1 flex flex-col gap-1">
                      {link.children.map((child) => (
                        <NavLink
                          key={child.path}
                          to={child.path}
                          className={({ isActive }) =>
                            `flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition duration-200
                            ${isActive ? "bg-white/20" : "hover:bg-white/10"}`
                          }
                        >
                          {child.name}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Admin Panel */}
              {user?.role === "admin" && (
                <NavLink
                  to="/inventory/admin"
                  className={({ isActive }) =>
                    `mt-4 flex items-center gap-3 px-3 py-2 rounded-lg font-semibold transition duration-200
                    ${isActive ? "bg-white/30" : "hover:bg-white/10"}`
                  }
                  title="Admin Panel"
                >
                  🔒
                  {!collapsed && <span>Admin Panel</span>}
                </NavLink>
              )}

              {/* Collapse toggle */}
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="mt-6 flex items-center justify-center w-full p-2 rounded-lg hover:bg-white/10"
              >
                <AiOutlineMenu size={22} />
              </button>
            </nav>
          </aside>

          {/* Mobile Overlay */}
          {sidebarOpen && window.innerWidth < 768 && (
            <div className="fixed inset-0 bg-black/40 z-10" onClick={() => setSidebarOpen(false)} />
          )}
        </>
      )}

      {/* Main Content */}
      <main className={`flex-1 p-5 md:ml-0 ${!collapsed && sidebarOpen ? "md:ml-64" : ""}`}>
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <AiOutlineMenu
              size={26}
              className="cursor-pointer md:hidden"
              onClick={() => setSidebarOpen(true)}
            />
            <h1 className="text-2xl font-bold">Inventory Dashboard</h1>
          </div>

          <div className="flex gap-4 text-xl items-center">
            <FiBell />
            <FiSettings />
            <button onClick={logout}><FiLogOut /></button>
            <FiUser />
          </div>
        </header>

        {/* Nested pages */}
        <Outlet />
      </main>
    </div>
  );
};

export default MainDashboard;

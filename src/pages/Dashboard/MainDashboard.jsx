import React from "react";
import { Link, Outlet } from "react-router-dom";
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
} from "react-icons/ai";
import { FiBell, FiUser, FiSettings, FiLogOut } from "react-icons/fi";

const SIDEBAR_WIDTH = 270;

const sidebarLinks = [
  { name: "Dashboard", icon: AiOutlineHome, path: "/inventory/dashboard" },
  { name: "Stock", icon: AiOutlineStock, path: "/inventory/stock" },
  { name: "Purchases", icon: AiOutlineShoppingCart, path: "/inventory/purchases" },
  { name: "Vendors", icon: AiOutlineShop, path: "/inventory/vendors" },
  { name: "Locations", icon: AiOutlineEnvironment, path: "/inventory/locations" },
  { name: "Projects", icon: AiOutlineProject, path: "/inventory/projects" },
  { name: "Delivery Challan", icon: AiOutlineTruck, path: "/inventory/delivery" },
  { name: "Relocation", icon: AiOutlineSwap, path: "/inventory/relocation" },
  { name: "Reports", icon: AiOutlineBarChart, path: "/inventory/reports" },
  { name: "Maintenance", icon: AiOutlineTool, path: "/inventory/maintenance" },
];

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "12px 15px",
  borderRadius: "8px",
  fontWeight: 600,
  fontSize: "1.05rem",
  transition: "background 0.25s ease",
};

const cardStyle = {
  flex: "1 1 220px",
  background: "#fff",
  padding: "25px",
  borderRadius: "14px",
  boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
  fontSize: "1.05rem",
  color: "#111827",
  minWidth: "220px",
};

const MainDashboard = () => {
  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: SIDEBAR_WIDTH,
          minWidth: SIDEBAR_WIDTH,
          height: "100vh",
          background: "linear-gradient(180deg, #1E3A8A, #2563EB)",
          color: "#fff",
          padding: "30px 20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h2 style={{ fontSize: "2rem", marginBottom: "50px", fontWeight: 700 }}>
            📦 Inventory
          </h2>

          <div style={{ marginBottom: "40px" }}>
            <p style={{ fontWeight: 700, fontSize: "1.1rem" }}>Samiksha Singh</p>
            <p style={{ fontSize: "0.95rem", color: "#CBD5E1" }}>Admin</p>
          </div>

          <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {sidebarLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                style={linkStyle}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#3B82F6")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                {React.createElement(link.icon, { size: 22 })}
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          height: "100vh",
          backgroundColor: "#F8FAFC",
          padding: "28px",
          overflowY: "auto",
          overflowX: "hidden",
          boxSizing: "border-box",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "28px",
          }}
        >
          <h1 style={{ fontSize: "2rem", fontWeight: 700 }}>
            📊 Inventory Dashboard
          </h1>

          <div style={{ display: "flex", gap: "20px", fontSize: "1.4rem", color: "#374151" }}>
            <FiBell />
            <FiSettings />
            <FiLogOut />
            <FiUser />
          </div>
        </div>

        {/* Stats Cards */}
        <div
          style={{
            display: "flex",
            gap: "24px",
            flexWrap: "wrap",
            marginBottom: "36px",
          }}
        >
          <div style={cardStyle}>📦 Total Stock<br /><strong>12,345 Items</strong></div>
          <div style={cardStyle}>⚠️ Low Stock Alerts<br /><strong>8 Alerts</strong></div>
          <div style={cardStyle}>📝 Pending Orders<br /><strong>15 Orders</strong></div>
          <div style={cardStyle}>🔄 Items to Reallocate<br /><strong>5 Transfers</strong></div>
        </div>

        {/* Child Routes */}
        <div style={{ width: "100%", minHeight: "200px" }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainDashboard;

import { NavLink } from "react-router-dom";
import { FaHome, FaBoxOpen, FaExclamationTriangle, FaExchangeAlt } from "react-icons/fa";
import { AiOutlineStock } from "react-icons/ai";

const Sidebar = ({ isOpen, onClose }) => {
  const role = "admin"; // replace with context/auth if available

  const links = [
    { to: "/inventory/dashboard", label: "Dashboard", icon: <FaHome /> },
    { to: "/inventory/stock", label: "Stock", icon: <AiOutlineStock />, badge: 3 },
    { to: "/inventory/stock/items", label: "Stock Items", icon: <FaBoxOpen /> },
    { to: "/inventory/stock/low", label: "Low Stock Alerts", icon: <FaExclamationTriangle /> },
    { to: "/inventory/stock/transactions", label: "Stock Transactions", icon: <FaExchangeAlt /> },
    // Add more links
  ];

  return (
    <>
      <aside
        className={`
          fixed top-0 left-0 z-30 h-screen w-64
          bg-gradient-to-b from-blue-900 to-blue-600
          text-white p-6
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0
        `}
      >
        <h2 className="text-2xl font-bold mb-8">📦 Inventory</h2>

        <nav className="flex flex-col gap-2 overflow-y-auto h-[calc(100vh-6rem)]">
          {links.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition duration-200
                 ${isActive ? "bg-white/20" : "hover:bg-white/10"}`
              }
            >
              {link.icon} {link.label}
              {link.badge && (
                <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {link.badge}
                </span>
              )}
            </NavLink>
          ))}

          {/* Admin-only link */}
          {role === "admin" && (
            <NavLink
              to="/inventory/admin"
              onClick={onClose}
              className={({ isActive }) =>
                `mt-4 flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition duration-200
                 ${isActive ? "bg-white/30" : "hover:bg-white/10"}`
              }
            >
              🔒 Admin Panel
            </NavLink>
          )}
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 md:hidden"
          onClick={onClose}
        />
      )}
    </>
  );
};

export default Sidebar;

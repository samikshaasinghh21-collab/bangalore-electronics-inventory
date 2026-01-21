import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  ShoppingCart,
  Package,
  Users,
  Truck,
  BarChart3
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gradient-to-b from-teal-700 to-teal-600 text-white min-h-screen">
      <div className="p-6 text-2xl font-bold tracking-wide">
        BE Billing
      </div>

      <nav className="px-4 space-y-2">
        <NavItem to="/dashboard" icon={<LayoutDashboard size={18} />} label="Dashboard" />
        <NavItem to="/invoices" icon={<FileText size={18} />} label="Invoices" />
        <NavItem to="/inventory" icon={<Package size={18} />} label="Products / Stock" />
        <NavItem to="/purchases" icon={<ShoppingCart size={18} />} label="Purchases" />
        <NavItem to="/suppliers" icon={<Truck size={18} />} label="Suppliers" />
        <NavItem to="/customers" icon={<Users size={18} />} label="Customers" />
        <NavItem to="/reports" icon={<BarChart3 size={18} />} label="Reports" />
      </nav>
    </aside>
  );
}

function NavItem({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
          isActive ? "bg-white/20" : "hover:bg-white/10"
        }`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
}

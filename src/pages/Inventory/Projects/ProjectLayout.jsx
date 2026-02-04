import { NavLink, Outlet } from "react-router-dom";
import {
  AiOutlineProject,
  AiOutlineUnorderedList,
  AiOutlineFileText,
  AiOutlineInbox,
  AiOutlineCheckCircle,
  AiOutlineTruck,
} from "react-icons/ai";

export default function ProjectLayout() {
  return (
    <div className="flex min-h-full bg-gray-100">

      {/* PROJECT SIDEBAR (WHITE + BLUE BORDER) */}
      <aside className="w-64 bg-white border-r-2 border-blue-600 p-5">
        <h2 className="text-xl font-bold text-blue-600 mb-6">
          Project Module
        </h2>

        <nav className="space-y-1">
          <ProjectLink to="/inventory/projects" icon={AiOutlineProject}>
            Project Overview
          </ProjectLink>

          <ProjectLink to="/inventory/projects/items" icon={AiOutlineUnorderedList}>
            Project Items
          </ProjectLink>

          <ProjectLink to="/inventory/projects/purchase-order" icon={AiOutlineFileText}>
            Purchase Order
          </ProjectLink>

          <ProjectLink to="/inventory/projects/receive" icon={AiOutlineInbox}>
            Receive Goods
          </ProjectLink>

          <ProjectLink to="/inventory/projects/allocate" icon={AiOutlineCheckCircle}>
            Allocate Inventory
          </ProjectLink>

          <ProjectLink to="/inventory/projects/delivery-challan" icon={AiOutlineTruck}>
            Delivery Challan
          </ProjectLink>
        </nav>
      </aside>

      {/* PROJECT CONTENT */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}

function ProjectLink({ to, icon: Icon, children }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition
        ${
          isActive
            ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600"
            : "text-gray-700 hover:bg-blue-50"
        }`
      }
    >
      <Icon size={18} />
      {children}
    </NavLink>
  );
}

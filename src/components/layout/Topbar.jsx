import { Bell, User } from "lucide-react";

export default function Topbar() {
  return (
    <header className="h-16 bg-white shadow flex items-center justify-between px-6">
      <h1 className="text-xl font-semibold">Billing Dashboard</h1>

      <div className="flex items-center gap-4">
        <Bell className="text-gray-600" />
        <div className="flex items-center gap-2">
          <User />
          <span className="text-sm">Admin</span>
          
        </div>
      </div>
    </header>
  );
}

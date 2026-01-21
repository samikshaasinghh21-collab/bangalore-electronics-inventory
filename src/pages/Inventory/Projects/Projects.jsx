import React from "react";
import { Outlet } from "react-router-dom";

export default function Projects() {
  return (
    <div className="h-screen bg-gray-100">
      <main className="h-full">
        <Outlet />
      </main>
    </div>
  );
}

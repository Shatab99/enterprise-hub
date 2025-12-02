import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { cn } from "@/lib/utils";

export function MainLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentRole, setCurrentRole] = useState('super-admin');

  return (
    <div className="min-h-screen bg-background dark">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      <Header 
        sidebarCollapsed={sidebarCollapsed}
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
      />
      <main
        className={cn(
          "pt-16 transition-all duration-300",
          sidebarCollapsed ? "pl-[70px]" : "pl-[260px]"
        )}
      >
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

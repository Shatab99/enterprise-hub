import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import HR from "./pages/HR";
import Payroll from "./pages/Payroll";
import Inventory from "./pages/Inventory";
import CRM from "./pages/CRM";
import Finance from "./pages/Finance";
import Ecommerce from "./pages/Ecommerce";
import RealEstate from "./pages/RealEstate";
import Projects from "./pages/Projects";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/hr" element={<HR />} />
            <Route path="/payroll" element={<Payroll />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/crm" element={<CRM />} />
            <Route path="/finance" element={<Finance />} />
            <Route path="/ecommerce" element={<Ecommerce />} />
            <Route path="/ecommerce/*" element={<Ecommerce />} />
            <Route path="/real-estate" element={<RealEstate />} />
            <Route path="/real-estate/*" element={<RealEstate />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

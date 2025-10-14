import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Onboarding from "./pages/Onboarding";
import ConfirmationSent from "./pages/ConfirmationSent";
import AccountPending from "./pages/AccountPending";
import Dashboard from "./pages/Dashboard";
import TemplateDetail from "./pages/TemplateDetail";
import PublishTemplate from "./pages/PublishTemplate";
import EditSite from "./pages/EditSite";
import DnsGuide from "./pages/DnsGuide";
import SmartlinkGuide from "./pages/SmartlinkGuide";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/confirmation-sent" element={<ConfirmationSent />} />
          <Route path="/account-pending" element={<AccountPending />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/template/:id" element={<TemplateDetail />} />
          <Route path="/publish-template" element={<PublishTemplate />} />
          <Route path="/edit-site/:id" element={<EditSite />} />
          <Route path="/dns-guide" element={<DnsGuide />} />
          <Route path="/smartlink-guide" element={<SmartlinkGuide />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
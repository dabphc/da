import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Work from "./pages/Work";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login"; // Import Login
import Admin from "./pages/Admin"; // Import Admin
import MemberDashboard from "./pages/MemberDashboard"; // Import MemberDashboard
import ScrollToTop from "./components/ScrollToTop";
import { InkCursor } from "./components/InkCursor";
import { useIsMobile } from "./hooks/use-mobile";
import Events from "./pages/Events";

import EventResources from "./pages/EventResources";

const queryClient = new QueryClient();

const App = () => {
  const isMobile = useIsMobile();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {!isMobile && <InkCursor />}
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/work" element={<Work />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id/resources" element={<EventResources />} />
            
            {/* Admin Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/dashboard" element={<MemberDashboard />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
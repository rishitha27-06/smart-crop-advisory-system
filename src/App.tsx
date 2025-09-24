import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import "./i18n";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Features from "./pages/Features";
import CropMarket from "./pages/CropMarket";
import BuyInputs from "./pages/BuyInputs";
import Machinery from "./pages/Machinery";
import KnowledgeCenter from "./pages/KnowledgeCenter";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import AdvisoryChat from "./pages/AdvisoryChat";
import PestDetection from "./pages/PestDetection";
import Feedback from "./pages/Feedback";
import Checkout from "./pages/Checkout";
import OrderSummary from "./pages/OrderSummary";
import OrderSuccess from "./pages/OrderSuccess";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="flex flex-col min-h-screen overflow-x-hidden">
              <Navbar />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/features" element={<Features />} />
                  <Route path="/crop-market" element={<CropMarket />} />
                  <Route path="/buy-inputs" element={<BuyInputs />} />
                  <Route path="/machinery" element={<Machinery />} />
                  <Route path="/knowledge-center" element={<KnowledgeCenter />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/advisory-chat"
                    element={
                      <ProtectedRoute>
                        <AdvisoryChat />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/pest-detection"
                    element={
                      <ProtectedRoute>
                        <PestDetection />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/feedback" element={<Feedback />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/order-summary" element={<OrderSummary />} />
                  <Route path="/order-success" element={<OrderSuccess />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import BuyerDashboard from "./pages/dashboards/BuyerDashboard";
import SellerDashboard from "./pages/dashboards/SellerDashboard";
import MiddlemanDashboard from "./pages/dashboards/MiddlemanDashboard";
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import NotFound from "./pages/NotFound";

// Buyer Pages
import PaymentMethodsPage from "./pages/buyer/PaymentMethodsPage";
import BrowseMiddlemenPage from "./pages/buyer/BrowseMiddlemenPage";
import OrdersPage from "./pages/buyer/OrdersPage";
import BuyerChatPage from "./pages/buyer/ChatPage";

// Seller Pages
import SellerProductsPage from "./pages/seller/ProductsPage";
import SellerAnalyticsPage from "./pages/seller/AnalyticsPage";
import SellerOrdersPage from "./pages/seller/OrdersPage";
import SellerPaymentsPage from "./pages/seller/PaymentsPage";
import SellerChatPage from "./pages/seller/ChatPage";

// Middleman Pages
import MiddlemanTransactionsPage from "./pages/middleman/TransactionsPage";
import MiddlemanHistoryPage from "./pages/middleman/HistoryPage";
import MiddlemanSchedulePage from "./pages/middleman/SchedulePage";
import MiddlemanClientsPage from "./pages/middleman/ClientsPage";
import MiddlemanChatPage from "./pages/middleman/ChatPage";

// Admin Pages
import AdminOverviewPage from "./pages/admin/OverviewPage";
import AdminUsersPage from "./pages/admin/UsersPage";
import AdminAnalyticsPage from "./pages/admin/AnalyticsPage";
import AdminSettingsPage from "./pages/admin/SettingsPage";

// Info Pages
import AboutUsPage from "./pages/info/AboutUsPage";
import CareersPage from "./pages/info/CareersPage";
import BlogPage from "./pages/info/BlogPage";
import TermsOfServicePage from "./pages/info/TermsOfServicePage";
import PrivacyPolicyPage from "./pages/info/PrivacyPolicyPage";
import SecurityPage from "./pages/info/SecurityPage";

// Profile Pages
import SellerProfile from "./pages/profile/SellerProfile";
import BuyerProfile from "./pages/profile/BuyerProfile";
import MiddlemanProfile from "./pages/profile/MiddlemanProfile";
import AdminProfile from "./pages/profile/AdminProfile";

// Middleman Application Page
import MiddlemanApplicationPage from "./pages/apply/MiddlemanApplicationPage";

import { ProductProvider } from "@/ProductContext";
import { OrderProvider } from "@/OrderContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <OrderProvider>
        <ProductProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              
              {/* Authentication Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/login/:role" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/signup/:role" element={<SignupPage />} />
              
              {/* Dashboard Routes */}
              <Route path="/dashboard/buyer" element={<BuyerDashboard />} />
              <Route path="/dashboard/seller" element={<SellerDashboard />} />
              <Route path="/dashboard/middleman" element={<MiddlemanDashboard />} />
              <Route path="/dashboard/admin" element={<AdminDashboard />} />
              
              {/* Buyer Feature Routes */}
              <Route path="/dashboard/buyer/payment-methods" element={<PaymentMethodsPage />} />
              <Route path="/dashboard/buyer/middlemen" element={<BrowseMiddlemenPage />} />
              <Route path="/dashboard/buyer/orders" element={<OrdersPage />} />
              <Route path="/dashboard/buyer/chat" element={<BuyerChatPage />} />
              
              {/* Seller Feature Routes */}
              <Route path="/dashboard/seller/products" element={<SellerProductsPage />} />
              <Route path="/dashboard/seller/analytics" element={<SellerAnalyticsPage />} />
              <Route path="/dashboard/seller/orders" element={<SellerOrdersPage />} />
              <Route path="/dashboard/seller/payments" element={<SellerPaymentsPage />} />
              <Route path="/dashboard/seller/chat" element={<SellerChatPage />} />
              
              {/* Middleman Feature Routes */}
              <Route path="/dashboard/middleman/transactions" element={<MiddlemanTransactionsPage />} />
              <Route path="/dashboard/middleman/history" element={<MiddlemanHistoryPage />} />
              <Route path="/dashboard/middleman/schedule" element={<MiddlemanSchedulePage />} />
              <Route path="/dashboard/middleman/clients" element={<MiddlemanClientsPage />} />
              <Route path="/dashboard/middleman/chat" element={<MiddlemanChatPage />} />
              
              {/* Admin Feature Routes */}
              <Route path="/dashboard/admin/overview" element={<AdminOverviewPage />} />
              <Route path="/dashboard/admin/users" element={<AdminUsersPage />} />
              <Route path="/dashboard/admin/analytics" element={<AdminAnalyticsPage />} />
              <Route path="/dashboard/admin/settings" element={<AdminSettingsPage />} />
              
              {/* Information Pages */}
              <Route path="/about" element={<AboutUsPage />} />
              <Route path="/careers" element={<CareersPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/terms" element={<TermsOfServicePage />} />
              <Route path="/privacy" element={<PrivacyPolicyPage />} />
              <Route path="/security" element={<SecurityPage />} />
              
              {/* Profile Routes */}
              <Route path="/profile/seller" element={<SellerProfile />} />
              <Route path="/profile/buyer" element={<BuyerProfile />} />
              <Route path="/profile/middleman" element={<MiddlemanProfile />} />
              <Route path="/profile/admin" element={<AdminProfile />} />
              
              {/* Middleman Application Route */}
              <Route path="/apply/middleman" element={<MiddlemanApplicationPage />} />
              
              {/* Catch-all Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ProductProvider>
      </OrderProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

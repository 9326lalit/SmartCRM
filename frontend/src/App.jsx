import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "./components/ui/layout/Sidebar";
import Navbar from "./components/ui/layout/Navbar";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Leads from "./pages/Leads";
import Profile from "./pages/Profile";
import SupportTickets from "./pages/Tickes/SupportTickets";
import AnalyticsReports from "./pages/Tickes/Reports";
import Tasks from "./pages/Tasks";
import Invoices from "./pages/Invoices";
import Team from "./pages/Team";
import Settings from "./pages/Setting";
import BillingPage from "./pages/BillingPage";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import { Toaster } from "react-hot-toast";
import FormPage from "./pages/FormPage";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) setIsAuthenticated(true);
  }, []);

  const handleLogin = () => {
    localStorage.setItem("user", "loggedIn");
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="flex h-screen overflow-hidden">
        {/* Fixed Sidebar */}
        <div className="w-64 h-full fixed">
          <Sidebar />
        </div>

        <Toaster />
        {/* Right Side (Navbar + Pages) */}
        <div className="flex-1 ml-64 flex flex-col h-screen">
          {/* Navbar */}
          <Navbar onLogout={handleLogout} />

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/leads" element={<Leads />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/billing" element={<BillingPage />} />
              <Route path="/support" element={<SupportTickets />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/analytics" element={<AnalyticsReports />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/team" element={<Team />} />
              <Route path="/form" element={<FormPage />} />

              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      </div>
    
    
    
    </Router>
  );
};

export default App;

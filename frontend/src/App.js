import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import DonorPage from "./pages/DonorPage";
import RegisteredDonorsPage from "./pages/RegisteredDonorsPage";
import BloodRequestPage from "./pages/BloodRequestPage";
import ShortageAlertPage from "./pages/ShortageAlertPage";
import AvailableBloodStockPage from "./pages/AvailableBloodStockPage";
import RequestedUsersListPage from "./pages/RequestedUsersListPage";
import DonorCertificatePage from "./pages/DonorCertificatePage";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/donor"
            element={
              <ProtectedRoute>
                <DonorPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/registered-donors"
            element={
              <ProtectedRoute>
                <RegisteredDonorsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/request"
            element={
              <ProtectedRoute>
                <BloodRequestPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/shortage"
            element={
              <ProtectedRoute>
                <ShortageAlertPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/stock"
            element={
              <ProtectedRoute>
                <AvailableBloodStockPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/requests-list"
            element={
              <ProtectedRoute>
                <RequestedUsersListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/certificate"
            element={
              <ProtectedRoute>
                <DonorCertificatePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;

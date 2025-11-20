import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";

import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";

/* Landing, Auth & Registration */
import LandingPage from "./pages/landing-page";
import SignIn from "./pages/sign-in";
import RegisterStep1 from "./pages/register-step-1";
import RegisterStep2 from "./pages/register-step-2";
import UserVerification from "./pages/usermail-verification"; // Updated import from your first file

/* Brand & Creator */
import BrandDashboard from "./pages/brand-dashboard";
import CreatorDashboard from "./pages/creator-dashboard";

/* Admin Panel */
import AdminDashboard from "./pages/admin-dashboard";
import CampaignCreation from "./pages/campaign-creation";
import CampaignDetails from "./pages/campaign-details";
import SubscriptionManagement from "./pages/subscription-management";
import MessagingCenter from "./pages/messaging-center";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>

          {/* Landing & Authentication */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/landing-page" element={<LandingPage />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/register-step-1" element={<RegisterStep1 />} />
          <Route path="/register-step-2" element={<RegisterStep2 />} />
          <Route path="/usermail-verification" element={<UserVerification />} />

          {/* Brand / Creator Dashboards */}
          <Route path="/brand-dashboard" element={<BrandDashboard />} />
          <Route path="/creator-dashboard" element={<CreatorDashboard />} />

          {/* Admin Section */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/campaign-creation" element={<CampaignCreation />} />
          <Route path="/campaign-details" element={<CampaignDetails />} />
          <Route path="/subscription-management" element={<SubscriptionManagement />} />
          <Route path="/messaging-center" element={<MessagingCenter />} />

          {/* 404 Fallback */}
          <Route path="*" element={<NotFound />} />

        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;

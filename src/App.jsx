import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Navbar from "./component/navigationBar/NavBar";
import WelcomeSection from "./component/welcomeSection/WelcomeSection";
import FeaturesSection from "./component/featuresSection/FeaturesSection";
import CurrencyChartPage from "./pages/currencyChart/CurrencyChartPage";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import DashboardPage from "./pages/dashboard/DashboardPage";

function App() {
  const [showChart, setShowChart] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const toggleChart = () => {
    setShowChart((prev) => !prev);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    setIsAuthenticated(false);
  };

  const userName = localStorage.getItem("userName") || "User";

  return (
    <Router>
      <Navbar
        isAuthenticated={isAuthenticated}
        userName={userName}
        onLogout={handleLogout}
      />
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <>
                <WelcomeSection
                  onToggleChart={toggleChart}
                  showChart={showChart}
                />
                {showChart && <CurrencyChartPage />}
                <FeaturesSection />
              </>
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />
          }
        />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/register" element={<RegisterPage onLogin={handleLogin} />} />
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;

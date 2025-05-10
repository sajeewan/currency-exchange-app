import "./App.css";
import { useState } from "react";
import Navbar from "./component/navigationBar/NavBar";
import WelcomeSection from "./component/welcomeSection/WelcomeSection";
import FeaturesSection from "./component/featuresSection/FeaturesSection";
import CurrencyChartPage from "./pages/currencyChart/CurrencyChartPage";

function App() {
  const [showChart, setShowChart] = useState(false);

  const toggleChart = () => {
    setShowChart((prev) => !prev);
  };
  return (
    <>
      <Navbar />
      <WelcomeSection onToggleChart={toggleChart} showChart={showChart} />
      {showChart && <CurrencyChartPage />}
      <FeaturesSection />
    </>
  );
}

export default App;

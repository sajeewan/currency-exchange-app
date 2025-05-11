import "./DashboardPage.css";
import CurrencyChartPage from "../currencyChart/CurrencyChartPage";
import HistoryComponent from "../../component/historyComponent/HistoryComponent";
import ExchangeRateForm from "../../component/exchangeRateForm/ExchangeRateForm";
import { useState } from "react";

const DashboardPage = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleRateAdded = () => {
    setRefreshTrigger((prev) => prev + 1);
  };
  return (
    <div>
      <CurrencyChartPage />
      <ExchangeRateForm onRateAdded={handleRateAdded}/>
      <HistoryComponent refreshTrigger={refreshTrigger} />
    </div>
  );
};

export default DashboardPage;

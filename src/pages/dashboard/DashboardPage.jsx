import "./DashboardPage.css";
import CurrencyChartPage from "../currencyChart/CurrencyChartPage";
import HistoryComponent from "../../component/historyComponent/HistoryComponent";
import ExchangeRateForm from "../../component/exchangeRateForm/ExchangeRateForm";

const DashboardPage = () => {
  return (
    <div>
      <CurrencyChartPage />
      <ExchangeRateForm />
      <HistoryComponent />
    </div>
  );
};

export default DashboardPage;

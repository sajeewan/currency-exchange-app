
import "./DashboardPage.css";
import CurrencyChartPage from "../currencyChart/CurrencyChartPage";
import HistoryComponent from '../../component/historyComponent/HistoryComponent';

const DashboardPage = () => {
  return (
    <div>
      <CurrencyChartPage />
      <HistoryComponent />
    </div>
  );
};

export default DashboardPage;

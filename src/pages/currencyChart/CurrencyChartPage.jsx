import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./CurrencyChartPage.css";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CurrencyChartPage = () => {
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [chartData, setChartData] = useState(null);
  const [currentRate, setCurrentRate] = useState(null);
  const [weeklyAverage, setWeeklyAverage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Available currencies for the dropdown
  const currencies = ["USD", "GBP", "AUD", "CAD"];

  // Format date for API (YYYY-MM-DD)
  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  // Fetch exchange rates
  const fetchExchangeRates = async (currency, date) => {
    setLoading(true);
    setError(null);
    try {
      const baseUrl = "http://127.0.0.1:8000/api"; 
      const url = `${baseUrl}/exchange-rates?base_currency=${currency}&date=${formatDate(
        date
      )}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch exchange rates");
      const data = await response.json();

      // Extract rates, current rate, and weekly average
      const rates = data.rates;
      const labels = rates.map((rate) => rate.date);
      const rateValues = rates.map((rate) => rate.rate);

      // Current rate (most recent date)
      const latestRate = rates.reduce((latest, rate) => {
        return new Date(rate.date) > new Date(latest.date) ? rate : latest;
      }, rates[0]);
      setCurrentRate(latestRate.rate);

      // Weekly average
      setWeeklyAverage(data.average);

      // Set chart data
      setChartData({
        labels: labels,
        datasets: [
          {
            label: `Exchange Rate (${currency})`,
            data: rateValues,
            borderColor: "#2563eb",
            backgroundColor: "rgba(37, 99, 235, 0.1)",
            fill: true,
            tension: 0.4,
          },
        ],
      });
    } catch (err) {
      setError(err.message);
      setChartData(null);
      setCurrentRate(null);
      setWeeklyAverage(null);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on initial render and when currency or date changes
  useEffect(() => {
    fetchExchangeRates(baseCurrency, selectedDate);
  }, [baseCurrency, selectedDate]);

  // Chart options 
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "7-Day Currency Exchange Rate",
      },
      tooltip: {
        mode: "index",
        intersect: false,
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y.toFixed(4); 
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Exchange Rate",
        },
        beginAtZero: false,
        ticks: {
          callback: function (value) {
            return value.toFixed(4); 
          },
        },
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
  };

  return (
    <div className="chart-page">
      <h2 className="chart-title">Currency Exchange Chart</h2>
      <div className="controls">
        <div className="control-group">
          <label htmlFor="currency-select">Base Currency:</label>
          <select
            id="currency-select"
            value={baseCurrency}
            onChange={(e) => setBaseCurrency(e.target.value)}
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
        <div className="control-group">
          <label>Date:</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            maxDate={new Date()}
            dateFormat="yyyy-MM-dd"
            className="date-picker"
          />
        </div>
      </div>
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">Error: {error}</p>}
      {currentRate !== null && weeklyAverage !== null && (
        <div className="rate-info">
          <p>
            <strong>Current Rate:</strong> {currentRate.toFixed(4)}
          </p>
          <p>
            <strong>Weekly Average:</strong> {weeklyAverage.toFixed(4)}
          </p>
        </div>
      )}
      {chartData && (
        <div className="chart-container">
          <Line data={chartData} options={chartOptions} />
        </div>
      )}
    </div>
  );
};

export default CurrencyChartPage;

import React from "react";
import { Link } from "react-router-dom";
import "./DashboardPage.css";

const DashboardPage = () => {
  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Dashboard</h2>
      <p className="dashboard-welcome">
        Welcome! Access your currency exchange tools and insights.
      </p>
    </div>
  );
};

export default DashboardPage;

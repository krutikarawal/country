import React from 'react';
import './Dashboard.css'; // Import the Dashboard component CSS
import Header from './Header/Header';
import CountryList from './DashboardContent/CountryListing';

const Dashboard = () => {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="dashboard-header">
        <h2>Welcome to the Dashboard!</h2>
      </div>
      <div className="container mt-3">
        <div className="dashboard-content">
          <CountryList/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

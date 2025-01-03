import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Sidebar.css';
import { FaHome, FaPlus, FaDollarSign, FaChartBar } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h1>Masroofy - Expense Tracker</h1>
      <nav>
        <Link to="/">
          <FaHome className="icon" /> Home
        </Link>
        <Link to="/add-transaction">
          <FaPlus className="icon" /> Add an Expense
        </Link>
        <Link to="/update-budget">
          <FaDollarSign className="icon" /> Add / Update Your Budget
        </Link>
        <Link to="/categories">
          <FaChartBar className="icon" /> View Spending in Categories
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;

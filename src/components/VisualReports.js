import React, { useContext } from "react";
import { AppContext } from "../Context";
import '../styles/VisualReports.css';

const VisualReports = () => {
  const { spendingByCategory, income, totalExpenses } = useContext(AppContext);

  const totalBudget = income;  // Revenu total = budget + income

  return (
    <div className="visual-reports">
      <div className="spending-container">
        <h3>Spending Categories</h3>
        {Object.keys(spendingByCategory).length > 0 ? (
          <ul>
            {Object.entries(spendingByCategory).map(([category, amount]) => (
              <li key={category}>
                {category}: {amount.toFixed(2)} DA
              </li>
            ))}
            <li className="budget-item">
              Budget: {totalBudget.toFixed(2)}DA
            </li>
          </ul>
        ) : (
          <p>No spending data available yet.</p>
        )}
      </div>

      
    </div>
  );
};

export default VisualReports;

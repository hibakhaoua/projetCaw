import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseBudgetChart = ({ income, totalExpenses }) => {
  const [chartData, setChartData] = useState({
    labels: ['Expense', 'Budget'],
    datasets: [
      {
        data: [totalExpenses, income - totalExpenses],
        backgroundColor: ['#32cd32', '#ff6347'], // green for expense, red for budget
        hoverOffset: 4
      }
    ]
  });

  // Update chart data whenever income or expenses change
  useEffect(() => {
    setChartData({
      labels: ['Expense', 'Budget'],
      datasets: [
        {
          data: [totalExpenses, income ],
          backgroundColor: ['#32cd32', '#ff6347'], // green for expense, red for budget
          hoverOffset: 4
        }
      ]
    });
  }, [income, totalExpenses]);

  return (
    <div className="circle-container">
      <div className="circle-schematic">
        <Pie data={chartData} />
      </div>
    </div>
  );
};

export default ExpenseBudgetChart;

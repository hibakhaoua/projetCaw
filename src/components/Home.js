import '../styles/Home.css';
import React, { useContext } from "react";
import { AppContext } from "../Context";
import { FaTrashAlt } from "react-icons/fa"; // Icône de corbeille (via react-icons)
import ExpenseBudgetChart from "../components/ExpenseBudgetChart";

const Home = () => {
  const { income, setIncome, expenses, setExpenses, balance, transactionHistory, setTransactionHistory } = useContext(AppContext);

  // Assurez-vous que les valeurs sont des nombres valides avant d'afficher
  const formatValue = (value) => {
    return isNaN(value) || value === null || value === undefined ? 0 : value;
  };

  // Supprimer une transaction
  const deleteTransaction = (index) => {
    // Identifier la transaction à supprimer
    const transactionToDelete = transactionHistory[index];

    // Filtrer l'historique des transactions
    const updatedHistory = transactionHistory.filter((_, i) => i !== index);
    setTransactionHistory(updatedHistory);

    // Vérifier si la transaction est une dépense ou un revenu (budget)
    if (transactionToDelete.includes("(Expense)")) {
      // Supprimer la dépense correspondante
      const updatedExpenses = expenses.filter((_, i) => i !== index);
      setExpenses(updatedExpenses);
    } else if (transactionToDelete.includes("(Income)")) {
      // Supprimer le montant du revenu
      const incomeToDelete = parseFloat(transactionToDelete.match(/\+?\$([\d,\.]+)/)?.[1]) || 0;
      setIncome((prevIncome) => prevIncome - incomeToDelete);
    }
  };

  // Calculer les pourcentages pour les dépenses et le budget
  const totalExpenses = expenses.reduce((acc, exp) => acc + exp.amount, 0);
  const expensePercentage = (formatValue(totalExpenses) / formatValue(income)) * 100;
  const budgetPercentage = 100 - expensePercentage;

  return (
    <div className="home">
      <div className="header">
        <h2>Welcome to Your Budget Tracker</h2>
      </div>
      <div className="summary">
        <div className="summary-item">
          <h3>Income / Budget</h3>
          <p>{formatValue(income).toFixed(2)} DA </p>
        </div>
        <div className="summary-item">
          <h3>Expenses</h3>
          <p>{formatValue(totalExpenses).toFixed(2)} DA </p>
        </div>
        <div className="summary-item">
          <h3>Balance</h3>
          <p>{formatValue(balance).toFixed(2)} DA</p>
        </div>
      </div>

      {/* Transaction History */}
      <div className="transaction-history">
        <h3>Transaction History</h3>
        {transactionHistory.length > 0 ? (
          <ul>
            {transactionHistory.map((transaction, index) => {
              // Vérifier si la transaction est une dépense ou un revenu
              const isExpense = transaction.includes("(Expense)");
              const isIncome = transaction.includes("(Income)");

              // Extraire le montant en DA (par exemple 1000.00)
              const amount = parseFloat(transaction.match(/\+?\$([\d,\.]+)/)?.[1]) || 0;

              // Afficher le montant formaté comme "10000 DA"
              const formattedTransaction = transaction.replace(/\$([\d,\.]+)/, amount.toFixed(2) + ' DA');

              return (
                <li
                  key={index}
                  className={`transaction-item ${isExpense ? "expense" : isIncome ? "income" : ""}`}
                >
                  {formattedTransaction}
                  <FaTrashAlt
                    className="delete-icon"
                    onClick={() => deleteTransaction(index)}
                  />
                </li>
              );
            })}
          </ul>
        ) : (
          <p>No transactions yet. Add income or expenses to see the history.</p>
        )}
      </div>

      {/* Expense vs Budget Pie Chart */}
      <div className="chart-container">
        <ExpenseBudgetChart income={income} totalExpenses={totalExpenses} />
      </div>
    </div>
  );
};

export default Home;

import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [categories] = useState([]);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [spendingByCategory, setSpendingByCategory] = useState({});
  const [budgetsByCategory, setBudgetsByCategory] = useState({});

  // Ajouter des dépenses
  const addExpense = ({ label, amount, category }) => {
    const amountValue = parseFloat(amount);
    if (isNaN(amountValue) || amountValue <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    setExpenses([...expenses, { label, amount: amountValue, category }]);
    setSpendingByCategory((prev) => ({
      ...prev,
      [category]: (prev[category] || 0) + amountValue,
    }));
    setTransactionHistory([
      ...transactionHistory,
      `${label} - ${category} - $${amountValue.toFixed(2)} (Expense)`,
    ]);
  };

  // Ajouter un revenu
  const addIncome = (amount) => {
    const amountValue = parseFloat(amount);
    if (isNaN(amountValue) || amountValue <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    setIncome(income + amountValue);
    setTransactionHistory([...transactionHistory, `+$${amountValue.toFixed(2)} (Income)`]);
  };

  // Réinitialiser les dépenses
  const resetExpenses = () => {
    setExpenses([]);
    setSpendingByCategory({});
    setTransactionHistory([...transactionHistory, `Expenses have been reset to $0`]);
  };

  // Réinitialiser le budget
  const resetBudget = () => {
    setIncome(0);
    setTransactionHistory([...transactionHistory, `Budget has been reset to $0`]);
  };

  // Mettre à jour le budget
  const setBudget = (budget) => {
    const budgetValue = parseFloat(budget);
    if (isNaN(budgetValue) || budgetValue <= 0) {
      alert("Please enter a valid budget amount");
      return;
    }
    setIncome(budgetValue);
    setTransactionHistory([...transactionHistory, `Budget has been set to $${budgetValue.toFixed(2)}`]);
  };

  // Mettre à jour le budget d'une catégorie
  const setBudgetForCategory = (category, budget) => {
    setBudgetsByCategory((prev) => ({
      ...prev,
      [category]: budget,
    }));
    setTransactionHistory([...transactionHistory, `${category} budget has been set to $${budget.toFixed(2)}`]);
  };

  // Calculer le total des dépenses
  const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  const balance = income - totalExpenses;

  return (
    <AppContext.Provider
      value={{
        income,
        expenses,
        categories,
        transactionHistory,
        spendingByCategory,
        budgetsByCategory,
        addExpense,
        addIncome,
        resetExpenses,
        resetBudget,
        setBudgetForCategory,
        setBudget, // Ajout de la fonction setBudget
        totalExpenses,
        balance,
        setTransactionHistory,
        setExpenses,
        setIncome,
        
      }}
    >
      {children}
    </AppContext.Provider>
  );
};





import '../styles/TransactionList.css';

import React, { useContext } from "react";
import { AppContext } from "../Context";
import Transaction from "./Transaction";

const TransactionList = () => {
  const { expenses, setExpenses, setBalance } = useContext(AppContext);

  const deleteTransaction = (indexToDelete) => {
    const transactionToRemove = expenses[indexToDelete];
    setExpenses((prev) => prev.filter((_, index) => index !== indexToDelete));

    // Mise à jour de la balance après suppression
    setBalance((prevBalance) => prevBalance + transactionToRemove.amount);
  };

  return (
    <div>
      <h2>Transaction History</h2>
      <ul className="transaction-list">
        {expenses.map((transaction, index) => (
          <Transaction
            key={index}
            transaction={transaction}
            onDelete={() => deleteTransaction(index)}
          />
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;

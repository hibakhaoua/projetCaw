import React from "react";

const Transaction = ({ transaction, onDelete }) => {
  const { label, amount, category } = transaction;

  return (
    <li className="transaction-item">
      <span>{label}</span>
      <span>${amount}</span>
      <span>{category}</span>
      <button onClick={onDelete}>Delete</button>
    </li>
  );
};

export default Transaction;

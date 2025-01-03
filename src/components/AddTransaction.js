import '../styles/AddTransaction.css';
import React, { useState, useContext } from "react";
import { AppContext } from "../Context";

const AddTransaction = () => {
  const { addExpense, resetExpenses } = useContext(AppContext);
  const [label, setLabel] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Validation de l'amount pour s'assurer qu'il est valide
    const amountValue = parseFloat(amount);
    if (!amountValue || amountValue <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    // Ajout de la dépense seulement si la valeur est valide
    addExpense({ label, amount: amountValue, category });
    setLabel("");
    setAmount("");
    setCategory("");
  };

  const handleReset = () => {
    resetExpenses();
  };

  return (
    <div className="add-transaction-container">
      <h1>Add an Expense</h1>
      <p>Adds on to your current expense amount.</p>

      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Label *</label>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            required
            placeholder="Enter a label"
          />
        </div>

        <div className="form-field">
          <label>Amount *</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            placeholder="Enter amount"
          />
        </div>

        <div className="form-field">
          <label>Add a Category to Your Expense</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="" disabled>Select a category Or create a new category</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <button type="submit">Add Expense</button>
      </form>

      <div className="reset-section">
        <p>Resets your expenses back to 0</p>
        <button className="reset-button" onClick={handleReset}>Reset Expenses</button>
      </div>
    </div>
  );
};

export default AddTransaction;

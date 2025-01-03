import React, { useContext, useState } from "react";
import { AppContext } from "../Context";
import '../styles/AddBudget.css';

const AddBudget = () => {
  const { addIncome, resetBudget, setBudget } = useContext(AppContext);

  const [label, setLabel] = useState("");
  const [amount, setAmount] = useState("");
  const [budget, setBudgetValue] = useState("");

  const handleAddIncome = (e) => {
    e.preventDefault();
    if (label && amount) {
      addIncome(parseFloat(amount));
      setLabel("");
      setAmount("");
    }
    
  };

  const handleSetBudget = (e) => {
    e.preventDefault();
    if (budget) {
      setBudget(parseFloat(budget));
      setBudgetValue(""); // Clear the budget input after setting
    }
  };

  return (
    <div className="add-budget">
      {/* Section pour définir le budget */}
      <div className="budget-container">
        <h2>Set Your Income / Budget</h2>
        <form onSubmit={handleSetBudget}>
          <div className="form-field">
            <label>Enter your budget *</label>
            <input
              type="number"
              placeholder="Enter your budget"
              value={budget}
              onChange={(e) => setBudgetValue(e.target.value)}
              required
            />
          </div>
          <button type="submit">Set Budget</button>
        </form>
      </div>

      {/* Section pour ajouter une source de revenus */}
      <div className="income-container">
        <h3>Add an Income Source</h3>
        <form onSubmit={handleAddIncome}>
          <div className="form-field">
            <label>Label *</label>
            <input
              type="text"
              placeholder="Ex: Salary"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              required
            />
          </div>
          <div className="form-field">
            <label>Amount *</label>
            <input
              type="number"
              placeholder="Ex: 1000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <button type="submit">Add to Budget</button>
        </form>
      </div>

      {/* Section pour réinitialiser le budget */}
      <div className="reset-container">
        <h3>Reset Your Budget</h3>
        <p>Resets your budget back to 0.</p>
        <button onClick={resetBudget}>Reset Budget</button>
      </div>
    </div>
  );
};

export default AddBudget;


import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./Context";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import AddTransaction from "./components/AddTransaction";
import AddBudget from "./components/AddBudget";
import VisualReports from "./components/VisualReports";
import './styles/App.css';

const App = () => {
  return (
    <AppProvider>
      <Router>
        <div className="container">
          <Sidebar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add-transaction" element={<AddTransaction />} />
              <Route path="/update-budget" element={<AddBudget />} />
              <Route path="/categories" element={<VisualReports />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AppProvider>
  );
};

export default App;

import React from 'react';
import "./App.css";
<<<<<<< Updated upstream

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
=======

import Home from "./pages/Home";
import AdminDashboard from "./components/writer/admin/dashboard/AdminDashboard";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import NewsByCategoryCom from './components/reader/newsByCategoryCom';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="/category/:id" element={<NewsByCategoryCom />} />
        </Routes>
      </Router>
>>>>>>> Stashed changes
  );
}

export default App;

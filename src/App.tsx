import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home";
import AdminDashboard from "./components/writer/admin/AdminDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home/:id" element={<Home />} />
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

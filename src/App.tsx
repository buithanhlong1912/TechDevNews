import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home";
import AdminDashboard from "./components/writer/admin/dashboard/AdminDashboard";
import AdminLogin from "./pages/LoginAdmin/LoginAdmin";
import NewsByCategoryCom from "./components/reader/NewsByCategoryCom";
import ArticleDetails from "./components/ArticleDetails/ArticleDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home/*" element={<Home />} />
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>
    </Router>
  );
}

export default App;

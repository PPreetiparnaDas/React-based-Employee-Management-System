// Importing React core library
import React from "react";
// Importing routing components from react-router-dom
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// Importing custom components for different routes
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import EmployeeDashboard from "./components/EmployeeDashboard";
//main component
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/employee" element={<EmployeeDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

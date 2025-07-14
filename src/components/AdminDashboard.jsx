// File: components/EmployeeDashboard.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import PersonalDetails from "./dashboard/PersonalDetails";
import Attendance from "./dashboard/Attendance";
import LeaveBalance from "./dashboard/LeaveBalance";
import SalarySlips from "./dashboard/SalarySlips";
import ApplyLeave from "./dashboard/ApplyLeave";
import Announcements from "./dashboard/Announcements";

function EmployeeDashboard() {
  const [activeSection, setActiveSection] = useState("personal");
  const navigate = useNavigate();

  const handleLogout = () => {
    alert("\ud83d\udeaa Logged out successfully!");
    navigate("/");
  };

  const renderContent = () => {
    switch (activeSection) {
      case "personal":
        return <PersonalDetails />;
      case "attendance":
        return <Attendance />;
      case "leave":
        return <LeaveBalance />;
      case "salary":
        return <SalarySlips />;
      case "apply":
        return <ApplyLeave />;
      case "announcements":
        return <Announcements />;
      default:
        return <h4>Welcome to Dashboard</h4>;
    }
  };

  return (
    <div className="container-fluid p-0">
      <nav className="navbar navbar-dark bg-dark px-3">
        <span className="navbar-brand mb-0 h4">Employee Dashboard</span>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </nav>

      <div className="row vh-100">
        <div className="col-md-3 bg-info text-white p-3">
          <h5 className="text-center mb-4">Employee Menu</h5>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <button
                className="btn btn-outline-light w-100"
                onClick={() => setActiveSection("personal")}
              >
                View Personal Details
              </button>
            </li>
            <li className="nav-item mb-2">
              <button
                className="btn btn-outline-light w-100"
                onClick={() => setActiveSection("attendance")}
              >
                Check Attendance
              </button>
            </li>
            <li className="nav-item mb-2">
              <button
                className="btn btn-outline-light w-100"
                onClick={() => setActiveSection("leave")}
              >
                Track Leave Balance
              </button>
            </li>
            <li className="nav-item mb-2">
              <button
                className="btn btn-outline-light w-100"
                onClick={() => setActiveSection("salary")}
              >
                View Salary Slips
              </button>
            </li>
            <li className="nav-item mb-2">
              <button
                className="btn btn-outline-light w-100"
                onClick={() => setActiveSection("apply")}
              >
                Apply for Leave
              </button>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-outline-light w-100"
                onClick={() => setActiveSection("announcements")}
              >
                HR Announcements
              </button>
            </li>
          </ul>
        </div>
        <div className="col-md-9 bg-light p-4">{renderContent()}</div>
      </div>
    </div>
  );
}

export default EmployeeDashboard;

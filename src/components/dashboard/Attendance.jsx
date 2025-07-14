// File: components/dashboard/Attendance.jsx
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import employees from "../../data/employee.json";
import "../../styles/CalendarOverride.css"; // Custom styles for calendar visuals

function Attendance() {
  const [user, setUser] = useState(null);
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      const matched = employees.find((emp) => emp.email === loggedInUser.email);
      if (matched) {
        setUser(matched);
        setAttendance(matched.attendance);
      }
    }
  }, []);

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const day = date.getDay(); // 0 = Sunday, 6 = Saturday
      const formattedDate = date.toISOString().split("T")[0];
      const record = attendance.find((a) => a.date === formattedDate);
      const today = new Date().toISOString().split("T")[0];

      if (record && record.status === "Absent") {
        return "bg-light-red text-dark border";
      }

      if (day === 0 || day === 6) {
        return "bg-secondary text-white border";
      }

      if (formattedDate > today) {
        return "border"; // Future dates — no color
      }

      return "bg-light-green text-dark border"; // Past/present working day
    }

    return null;
  };

  return (
    <div className="container-fluid p-4 bg-light h-100">
      <h4 className="mb-4">📅 Attendance Calendar</h4>
      <div className="calendar-wrapper h-100">
        <Calendar className="w-100 h-100" tileClassName={tileClassName} />
      </div>
      <div className="mt-3">
        <span
          className="badge"
          style={{ backgroundColor: "#d4edda", color: "#155724" }}
        >
          Present
        </span>{" "}
        <span
          className="badge"
          style={{ backgroundColor: "#f8d7da", color: "#721c24" }}
        >
          Absent
        </span>{" "}
        <span className="badge bg-secondary">Weekend</span>
      </div>
    </div>
  );
}

export default Attendance;

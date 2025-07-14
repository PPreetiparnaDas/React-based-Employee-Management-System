// File: components/dashboard/ApplyLeave.jsx
import React, { useEffect, useState } from "react";
import employees from "../../data/employee.json"; // adjust as needed
import "bootstrap/dist/css/bootstrap.min.css";

function ApplyLeave() {
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [formData, setFormData] = useState({
    type: "",
    days: "",
    reason: "",
    date: "",
  });

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      const employee = employees.find(
        (emp) => emp.email === loggedInUser.email
      );
      if (employee?.leave) {
        setLeaveTypes(Object.keys(employee.leave));
        setFormData((prev) => ({
          ...prev,
          type: Object.keys(employee.leave)[0],
        }));
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate sending leave request
    console.log("Leave Applied:", formData);

    alert("✅ Leave request submitted successfully!");
    setFormData({
      type: leaveTypes[0] || "",
      days: "",
      reason: "",
      date: "",
    });
  };

  return (
    <div className="container">
      <h3 className="text-center mb-4">Apply for Leave</h3>
      <form
        onSubmit={handleSubmit}
        className="p-4 border rounded shadow bg-light"
      >
        <div className="mb-3">
          <label className="form-label">Leave Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="form-select"
            required
          >
            {leaveTypes.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Number of Days</label>
          <input
            type="number"
            name="days"
            value={formData.days}
            onChange={handleChange}
            className="form-control"
            min="1"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Reason</label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            className="form-control"
            rows="3"
            required
          />
        </div>
        <button type="submit" className="btn btn-success w-100">
          Apply Leave
        </button>
      </form>
    </div>
  );
}

export default ApplyLeave;

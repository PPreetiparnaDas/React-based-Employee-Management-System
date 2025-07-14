import React, { useEffect, useState } from "react";
import employees from "../../data/employee.json";
import "bootstrap/dist/css/bootstrap.min.css";

function LeaveBalance() {
  const [leaveData, setLeaveData] = useState(null);
  const [expandedType, setExpandedType] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      const employee = employees.find(
        (emp) => emp.email === loggedInUser.email
      );
      if (employee?.leave) {
        setLeaveData(employee.leave);
      }
    }
  }, []);

  const toggleDetails = (type) => {
    setExpandedType(expandedType === type ? null : type);
  };

  const formatType = (type) => type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <div className="container">
      <h3 className="text-center mb-4">Leave Balance</h3>
      {leaveData ? (
        <table className="table table-striped table-bordered shadow text-center">
          <thead className="table-info">
            <tr>
              <th>Leave Type</th>
              <th>Balance</th>
              <th>More Details</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(leaveData)
              .filter(([type]) => type !== "applied")
              .map(([type, balance]) => (
                <React.Fragment key={type}>
                  <tr>
                    <td>{formatType(type)}</td>
                    <td>{balance}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => toggleDetails(type)}
                      >
                        {expandedType === type ? "Hide" : "More Details"}
                      </button>
                    </td>
                  </tr>

                  {expandedType === type && leaveData.applied && (
                    <tr>
                      <td colSpan="3">
                        <table className="table table-bordered text-start m-0">
                          <thead className="table-light">
                            <tr>
                              <th>Date</th>
                              <th>Days</th>
                              <th>Type</th>
                              <th>Reason</th>
                            </tr>
                          </thead>
                          <tbody>
                            {leaveData.applied
                              .filter((entry) => entry.type === type)
                              .map((entry, index) => (
                                <tr key={index}>
                                  <td>{entry.date}</td>
                                  <td>{entry.days}</td>
                                  <td>{formatType(entry.type)}</td>
                                  <td>{entry.reason}</td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-danger">Leave data not available.</p>
      )}
    </div>
  );
}

export default LeaveBalance;

import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import employees from "../../data/employee.json";

function PersonalDetails() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get logged-in email from localStorage
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      const matchedUser = employees.find(
        (emp) => emp.email === loggedInUser.email
      );
      setUser(matchedUser);
    }
  }, []);

  if (!user) return <p className="text-center mt-5">Loading user details...</p>;

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <div className="row">
          {/* Profile Image */}
          <div className="col-md-4 text-center mb-3">
            <img
              src={user.image || "https://via.placeholder.com/150"} // default if not present
              alt={user.name}
              className="rounded-circle img-thumbnail"
              style={{ width: "180px", height: "180px", objectFit: "cover" }}
            />
            <h5 className="mt-3">{user.name}</h5>
            <p className="text-muted">{user.designation}</p>
          </div>

          {/* Personal Details */}
          <div className="col-md-8">
            <h4 className="mb-4">Personal Information</h4>
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <th>Employee ID</th>
                  <td>{user.id}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{user.email}</td>
                </tr>
                <tr>
                  <th>Phone</th>
                  <td>{user.phone}</td>
                </tr>
                <tr>
                  <th>Address</th>
                  <td>{user.address}</td>
                </tr>
                <tr>
                  <th>Designation</th>
                  <td>{user.designation}</td>
                </tr>
                <tr>
                  <th>Gender</th>
                  <td>{user.gender}</td>
                </tr>
                <tr>
                  <th>Salary</th>
                  <td>₹ {user.salary}</td>
                </tr>
              </tbody>
            </table>

            {/* Update Button */}
            <div className="text-end">
              <button className="btn btn-warning">✏️ Update Details</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalDetails;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import data from "../data/employee.json";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
  const [email, setEmail] = useState(""); // ✅ changed from username to email
  const [password, setPassword] = useState("");
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setEmployees(data);
  }, []);

  const handleLogin = () => {
    const user = employees.find(
      (emp) => emp.email === email && emp.password === password
    );

    if (user) {
      alert("✅ Login Successful!");
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      if (user.role === "admin") {
        navigate("/admin");
      } else if (user.role === "employee") {
        navigate("/employee");
      }
    } else {
      alert("❌ Invalid credentials");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card p-4 shadow"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h2 className="text-center mb-4">Login</h2>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} //  changed from setUsername to setEmail
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="d-grid">
          <button className="btn btn-primary" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;

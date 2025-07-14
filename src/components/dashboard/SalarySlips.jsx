import React, { useEffect, useState } from "react";
import employees from "../../data/employee.json";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "bootstrap/dist/css/bootstrap.min.css";

function SalarySlips() {
  const [salaryData, setSalaryData] = useState([]);
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      const emp = employees.find((e) => e.email === loggedInUser.email);
      if (emp) {
        setSalaryData(emp.salarySlips || []);
        setEmployee(emp);
      }
    }
  }, []);

  const handleDownload = (slip) => {
    if (!employee) return;

    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("RVS Tech Solution Pvt. Ltd.", 70, 15);

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text("234/1124,Sijua ,Bhubaneswar, Odisha IN, 751019", 70, 22);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(`Pay Slip - ${slip.month} ${slip.year}`, 150, 30);

    // Employee Info Table
    autoTable(doc, {
      startY: 35,
      head: [["Employee ID", employee.id, "UAN", employee.uan]],
      body: [
        ["Name", employee.name, "PF No.", employee.pf],
        ["Designation", employee.designation, "ESI No.", employee.esi],
        ["Department", employee.department, "Bank", employee.bank],
        ["DOJ", employee.doj, "Account No.", employee.account],
      ],
      theme: "grid",
      styles: { fontSize: 10 },
      headStyles: { fillColor: [230, 230, 230], textColor: "#000" },
    });

    // Summary Table (Gross Wages, Working Days, Leaves, Paid Days)
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 5,
      head: [["Gross Wages", "Working Days", "Leaves", "Paid Days"]],
      body: [[slip.netSalary.toString(), "30", "0", "30"]],
      theme: "grid",
      headStyles: {
        fillColor: [230, 230, 230],
        textColor: "#000",
        halign: "center",
      },
      bodyStyles: { halign: "center" },
      styles: { fontSize: 10 },
    });

    // Earnings & Deductions Table
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 5,
      head: [["Earnings", "Amount", "Deductions", "Amount"]],
      body: [
        ["Basic", slip.basic, "EPF", "900"],
        ["HRA", slip.hra, "ESI", "113"],
        ["Other Allowance", slip.otherAllowance, "Professional Tax", "0"],
      ],
      theme: "grid",
      headStyles: { fillColor: [200, 221, 255], textColor: "#000" },
      styles: { fontSize: 10 },
    });

    const totalEarnings = slip.basic + slip.hra + slip.otherAllowance;

    // Total Section + Net Salary
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 5,
      body: [
        ["Total Earnings", totalEarnings, "Total Deductions", "1013"],
        [
          {
            content: "Net Salary: " + slip.netSalary,
            colSpan: 4,
            styles: {
              halign: "center",
              fontSize: 14,
              fontStyle: "bold",
              fillColor: [220, 220, 220],
              textColor: "#007bff",
            },
          },
        ],
      ],
      theme: "grid",
      styles: { fontSize: 11 },
    });

    doc.save(`SalarySlip_${slip.month}_${slip.year}.pdf`);
  };

  return (
    <div className="container">
      <h3 className="text-center mb-4">Salary Slips</h3>
      {salaryData.length > 0 ? (
        <table className="table table-bordered table-striped shadow text-center">
          <thead className="table-primary">
            <tr>
              <th>Month</th>
              <th>Year</th>
              <th>Basic</th>
              <th>HRA</th>
              <th>Other Allowance</th>
              <th>Deductions</th>
              <th>Net Salary</th>
              <th>Download</th>
            </tr>
          </thead>
          <tbody>
            {salaryData.map((slip, index) => (
              <tr key={index}>
                <td>{slip.month}</td>
                <td>{slip.year}</td>
                <td>{slip.basic}</td>
                <td>{slip.hra}</td>
                <td>{slip.otherAllowance}</td>
                <td>{slip.deductions}</td>
                <td>
                  <strong>{slip.netSalary}</strong>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => handleDownload(slip)}
                  >
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-danger">No salary slips available.</p>
      )}
    </div>
  );
}

export default SalarySlips;

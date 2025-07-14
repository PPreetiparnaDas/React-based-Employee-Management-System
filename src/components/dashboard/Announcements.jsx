// File: components/dashboard/HRAnnouncements.jsx
import React, { useEffect, useState } from "react";
import "../../styles/HRAnnouncements.css"; // custom styles
import { Bell } from "react-bootstrap-icons";

const HRAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);

  // Dummy data – you can fetch this from a real API or file
  useEffect(() => {
    const dummyAnnouncements = [
      {
        id: 1,
        title: "Holiday Notice",
        message: "The office will remain closed on 21st June for Rath Yatra.",
        date: "2025-06-15",
      },
      {
        id: 2,
        title: "Policy Update",
        message:
          "Updated leave policies for 2025 have been published. Check your mail for the PDF.",
        date: "2025-06-10",
      },
      {
        id: 3,
        title: "Health Camp",
        message:
          "Free health check-up camp on 28th June, 10AM - 4PM at Conference Hall 2.",
        date: "2025-06-05",
      },
    ];
    setAnnouncements(dummyAnnouncements);
  }, []);

  return (
    <div className="container-fluid p-4 bg-light h-100">
      <h4 className="mb-4">
        <Bell className="me-2 text-primary" size={24} />
        🛎 HR Announcements
      </h4>

      <div className="announcement-wrapper">
        {announcements.map((a) => (
          <div key={a.id} className="announcement-card shadow-sm">
            <div className="card-header d-flex justify-content-between">
              <h5 className="mb-0">{a.title}</h5>
              <small className="text-muted">{a.date}</small>
            </div>
            <div className="card-body">
              <p className="mb-0">{a.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HRAnnouncements;

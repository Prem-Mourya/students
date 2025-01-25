// Sidebar.js
// import { MarginTwoTone } from "@mui/icons-material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";

const Sidebar = () => {
  const navigate = useNavigate();
  const handleStudentsPageClick = () => {
    console.log("Navigating to Students Page");
    navigate("/studentspage");
  };

const handleLogoutClick = () => {
       // Clear localStorage/sessionStorage (if any tokens are stored here)
  localStorage.removeItem("authToken");
  sessionStorage.removeItem("authToken");
  
    // Sign out from Firebase Authentication
    signOut(auth)
        .then(() => {
            console.log("Successfully logged out");
            // Redirect to login page or home page
            navigate("/");
        })
        .catch((error) => {
            console.error("Error during logout:", error);
        });
    console.log("Logging out");
    // Add your logout logic here (e.g., clearing tokens, redirecting to login page).
  };

  return (
    <div style={sidebarStyle}>
      <ul style={listStyle}>
        <li style={itemStyle} onClick={handleStudentsPageClick}>
          Students Page
        </li>
        <li style={itemStyle} onClick={handleLogoutClick}>
          Logout
        </li>
      </ul>

      <h3>
        <h4>
          "I believe in, "Promise only what you can deliver Then deliver more
          than you promise"."
        </h4>
      </h3>
    </div>
  );
};

const sidebarStyle = {
  width: "220px",
  height: "100vh",
  backgroundColor: "#2c3e50", // Darker shade for a modern look
  color: "white",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  boxShadow: "4px 0 10px rgba(0, 0, 0, 0.2)",
};

const listStyle = {
  listStyleType: "none",
  padding: "0",
};

const itemStyle = {
  padding: "12px 20px",
  cursor: "pointer",
  backgroundColor: "#34495e", // Slightly lighter background for items
  borderRadius: "5px",
  marginBottom: "10px",
  textAlign: "center",
  fontSize: "16px",
  fontWeight: "bold",
  transition: "background-color 0.3s, transform 0.2s",
  backgroundColor: "#1abc9c", // Color change on hover
  transform: "scale(1.05)",
};

export default Sidebar;


import React from 'react'
import Sidebar from './Sidebar'
 
const LandingPage = () => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div
        style={{
          marginLeft: "150px",
          paddingTop: "40px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Main content goes here */}
        <h2 style={{ fontWeight: "bolder", fontSize: "46px" }}>
          Welcome to Madrocket Assignment Submission by Prem Mourya 🤗 .
        </h2>
        <h4 style={{ fontWeight: "bold", fontSize: "40px", color: "#2c3e50" }}>
          The dashboard have sidebar with 2 options :
        </h4>
        <h6 style={{ fontSize: "25px", color: "#2c3e50" }}>
          i. Students Page : When students page is clicked, students page will
          open,
        </h6>
        <h6 style={{ fontSize: "25px", color: "#2c3e50" }}>
          ii.Logout : When Logout button is pressed user will get logged out.
        </h6>
        <h6 style={{ fontSize: "25px", color: "red" }}>
          *Note: Please wait after any Activity. Data will load... and then render in
          UI 🤗.
        </h6>
      </div>
    </div>
  );
}

export default LandingPage
import React from 'react'
import Sidebar from './Sidebar'
import StudentsPage from './StudentHandle';

const StudentsPageop = () => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ marginLeft: "150px", paddingTop: "40px" }}>
        {/* Main content goes here */}

        <h1>Students Page</h1>

        <StudentsPage></StudentsPage>
      </div>
    </div>
  );
}

export default StudentsPageop

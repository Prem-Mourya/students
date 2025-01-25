import * as React from "react";
import "./App.css";
import SignIn from "./components/login";
import StudentsPageop from "./components/StudentsPage";
import LandingPage from "./components/LandingPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { auth } from "./firebase/config";

function App() {
  const [user, setUser] = React.useState(null);
  return (
    <Router>
      <Routes>
        {/* Route for SignIn page */}
        <Route path="/" element={<SignIn setUser={setUser} />} />

        {/* Only show StudentsPage after successful login */}
        <Route
          path="/landingpage"
          element={user ? <LandingPage /> : <SignIn setUser={setUser} />}
        />

        <Route
          path="/studentspage"
          element={user ? <StudentsPageop /> : <SignIn setUser={setUser} />}
        />
      </Routes>
    </Router>
  );
}

export default App;

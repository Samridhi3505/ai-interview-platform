import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import AOS from "aos";
import "aos/dist/aos.css";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import InterviewRoom from "./pages/InterviewRoom";
import Report from "./pages/Report";

import "./styles/global.css";

function App() {

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });
  }, []);

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Landing />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/interview" element={<InterviewRoom />} />

        <Route path="/report" element={<Report />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LeadListing from "./components/LeadListing";
import LeadDetails from "./components/LeadDetails";
import LeadManagement from "./components/LeadManagement";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="p-6">
        <Routes>
          {/* Route for the Lead Listing Page */}
          <Route path="/" element={<LeadListing />} />
          
          {/* Route for displaying Lead Details */}
          <Route path="/lead/:_id?" element={<LeadDetails />} />
          
          {/* Route for Adding a New Lead */}
          <Route path="/add-lead" element={<LeadManagement />} />
          
          {/* Route for Dashboard or updating Leads */}
          <Route path="/update-lead" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

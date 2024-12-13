import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [totalLeads, setTotalLeads] = useState(0);
  const [contactedLeads, setContactedLeads] = useState(0);
  const [convertedLeads, setConvertedLeads] = useState(0);
  const [newLeads, setNewLeads] = useState(0);
  const [notInterestedLeads, setNotInterestedLeads] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/leads")
      .then((res) => {
        const leads = res.data;
        setTotalLeads(leads.length);
        setContactedLeads(leads.filter((lead) => lead.status === "Contacted").length);
        setConvertedLeads(leads.filter((lead) => lead.status === "Converted").length);
        setNewLeads(leads.filter((lead) => lead.status === "New").length);
        setNotInterestedLeads(leads.filter((lead) => lead.status === "Not Interested").length);
      })
      .catch((err) => console.error("Error fetching dashboard data:", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-5 gap-4">
        <div className="p-4 bg-blue-200 text-center rounded">
          <h2>Total Leads</h2>
          <p className="text-xl font-bold">{totalLeads}</p>
        </div>
        <div className="p-4 bg-yellow-200 text-center rounded">
          <h2>Contacted Leads</h2>
          <p className="text-xl font-bold">{contactedLeads}</p>
        </div>
        <div className="p-4 bg-green-200 text-center rounded">
          <h2>Converted Leads</h2>
          <p className="text-xl font-bold">{convertedLeads}</p>
        </div>
        <div className="p-4 bg-gray-200 text-center rounded">
          <h2>New Leads</h2>
          <p className="text-xl font-bold">{newLeads}</p>
        </div>
        <div className="p-4 bg-red-200 text-center rounded">
          <h2>Not Interested</h2>
          <p className="text-xl font-bold">{notInterestedLeads}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
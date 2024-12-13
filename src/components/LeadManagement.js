import React, { useState } from "react";
import axios from "axios";

const LeadManagement = ({fetchLeads}) => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [source, setSource] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("New");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newLead = { name, contact, source, priority, status };
    axios.post("http://localhost:5000/api/leads", newLead)
      .then((res) => {
        alert("Lead added successfully!");
        setName("");
        setContact("");
        setSource("");
        fetchLeads();
      })
      .catch((err) => console.error("Error adding lead:", err));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add New Lead</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block">Contact</label>
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block">Source</label>
          <input
            type="text"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Converted">Converted</option>
            <option value="Not Interested">Not Interested</option>
          </select>
        </div>

        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Add Lead
        </button>
      </form>
    </div>
  );
};

export default LeadManagement;

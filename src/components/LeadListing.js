import React, { useEffect, useState } from "react";
import axios from "axios";

const LeadListing = () => {
  const [leads, setLeads] = useState([]); // State to store all leads
  const [filteredLeads, setFilteredLeads] = useState([]); // State for filtered leads
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for errors
  const [statusFilter, setStatusFilter] = useState(""); // State for status filter
  const [priorityFilter, setPriorityFilter] = useState(""); // State for priority filter
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [editingLead, setEditingLead] = useState(null); // State for the lead being edited
  const [newStatus, setNewStatus] = useState(""); // State for the new status of the lead

  // Function to fetch leads from the backend
  const fetchLeads = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/leads");
      setLeads(response.data); // Set fetched leads in state
      setFilteredLeads(response.data); // Initially, all leads are shown
      setLoading(false); // Set loading to false after fetching
    } catch (err) {
      setError("Error fetching leads");
      setLoading(false);
    }
  };

  // Filter leads based on filters and search term
  useEffect(() => {
    const filterLeads = () => {
      let updatedLeads = leads;

      if (statusFilter) {
        updatedLeads = updatedLeads.filter((lead) => lead.status === statusFilter);
      }

      if (priorityFilter) {
        updatedLeads = updatedLeads.filter((lead) => lead.priority === priorityFilter);
      }

      if (searchTerm) {
        updatedLeads = updatedLeads.filter(
          (lead) =>
            lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.contact.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      setFilteredLeads(updatedLeads);
    };

    filterLeads();
  }, [leads, statusFilter, priorityFilter, searchTerm]);

  // Delete a lead
  const deleteLead = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/leads/${id}`);
      fetchLeads(); // Re-fetch leads after deleting
    } catch (err) {
      console.error("Error deleting lead:", err);
    }
  };

  // Save the edited lead's status
  const saveEditedLead = async () => {
    if (editingLead) {
      try {
        await axios.put(`http://localhost:5000/api/leads/${editingLead._id}`, {
          ...editingLead,
          status: newStatus,
        });
        setEditingLead(null); // Close the editing UI
        setNewStatus(""); // Clear the new status
        fetchLeads(); // Re-fetch leads
      } catch (err) {
        console.error("Error saving edited lead:", err);
      }
    }
  };

  // Fetch leads on component mount
  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Lead Listing</h1>

      {/* Display loading message */}
      {loading && <p>Loading leads...</p>}

      {/* Display error message if any */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="flex justify-between mb-4">
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Search by Name or Contact..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded"
          />
        </div>
        <div className="flex space-x-4">
          <select
            className="p-2 border rounded"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Converted">Converted</option>
            <option value="Not Interested">Not Interested</option>
          </select>
          <select
            className="p-2 border rounded"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="">All Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      {/* Lead list table */}
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Contact</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Priority</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredLeads.map((lead) => (
            <tr key={lead._id}>
              <td className="border px-4 py-2">{lead.name}</td>
              <td className="border px-4 py-2">{lead.contact}</td>
              <td className="border px-4 py-2">
                {editingLead?._id === lead._id ? (
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="p-2 border rounded"
                  >
                    <option value="">Select Status</option>
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Converted">Converted</option>
                    <option value="Not Interested">Not Interested</option>
                  </select>
                ) : (
                  lead.status
                )}
              </td>
              <td className="border px-4 py-2">{lead.priority}</td>
              <td className="border px-4 py-2">
                {editingLead?._id === lead._id ? (
                  <button
                    onClick={saveEditedLead}
                    className="px-4 py-2 bg-green-500 text-white rounded"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setEditingLead(lead);
                      setNewStatus(lead.status);
                    }}
                    className="px-4 py-2 bg-yellow-500 text-white rounded"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => deleteLead(lead._id)}
                  className="ml-2 px-4 py-2 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadListing;

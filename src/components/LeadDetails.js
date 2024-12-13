import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const LeadDetails = () => {
  const { id } = useParams(); // Extract lead ID from route parameters
  const navigate = useNavigate(); // To redirect to the correct lead details page
  const [lead, setLead] = useState(null); // State to hold lead data
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchLead = async () => {
      setLoading(true);
      try {
        let response;
        if (!id) {
          // If no ID is provided, fetch the latest lead
          response = await axios.get("http://localhost:5000/api/leads/latest");
          navigate(`/lead/${response.data._id}`); // Redirect to the latest lead's details
        } else {
          // Fetch lead by ID
          response = await axios.get(`http://localhost:5000/api/leads/${id}`);
        }
        setLead(response.data); // Set the lead data
        setError(null);
      } catch (err) {
        console.error("Error fetching lead details:", err);
        setError("Could not fetch lead details.");
        setLead(null);
      } finally {
        setLoading(false);
      }
    };

    fetchLead();
  }, [id, navigate]);

  // Handle status change
  const handleStatusChange = (e) => {
    const updatedLead = { ...lead, status: e.target.value };
    setLead(updatedLead); // Update local state immediately for instant feedback
    axios
      .put(`http://localhost:5000/api/leads/${lead._id}`, updatedLead)
      .then((res) => setLead(res.data))
      .catch((err) => console.error("Error updating lead status:", err));
  };

  // Handle notes change
  const handleNoteChange = (e) => {
    const updatedLead = { ...lead, notes: e.target.value };
    setLead(updatedLead); // Update local state immediately for instant feedback
    axios
      .put(`http://localhost:5000/api/leads/${lead._id}`, updatedLead)
      .then((res) => setLead(res.data))
      .catch((err) => console.error("Error updating lead notes:", err));
  };

  if (loading) return <div className="text-center">Loading Lead Details...</div>;
  if (error) return <div className="text-center">{error}</div>;
  if (!lead) return <div className="text-center">No lead found.</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Lead Details</h1>
      <div className="mb-4">
        <div><strong>Name:</strong> {lead.name}</div>
        <div><strong>Contact:</strong> {lead.contact}</div>
        <div><strong>Source:</strong> {lead.source}</div>
        <div>
          <strong>Status:</strong>
          <select
            value={lead.status || ""}
            onChange={handleStatusChange}
            className="ml-2 p-2 border rounded"
          >
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Converted">Converted</option>
            <option value="Not Interested">Not Interested</option>
          </select>
        </div>
        <div><strong>Priority:</strong> {lead.priority}</div>
      </div>

      <div className="mb-4">
        <strong>Notes:</strong>
        <textarea
          className="w-full p-2 border rounded"
          rows="4"
          value={lead.notes || ""}
          onChange={handleNoteChange}
        ></textarea>
      </div>
    </div>
  );
};

export default LeadDetails;


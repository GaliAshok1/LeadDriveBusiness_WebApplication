import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const sampleLeadId = "63a0f0a8c9ab12345678abcd"; // Replace this with an actual ID from your database

  return (
    <nav className="bg-gray-800 text-white px-4 py-2">
      <div className="flex justify-between items-center">
        <NavLink to="/" className="text-xl font-bold hover:text-blue-300">
          LeadDrive
        </NavLink>
        <ul className="flex space-x-6">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-blue-400" : "hover:text-blue-300"
              }
            >
              Lead Listing
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/update-lead"
              className={({ isActive }) =>
                isActive ? "text-blue-400" : "hover:text-blue-300"
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/add-lead"
              className={({ isActive }) =>
                isActive ? "text-blue-400" : "hover:text-blue-300"
              }
            >
              Add Lead
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/lead/${sampleLeadId}`} // Link to a specific lead ID
              className={({ isActive }) =>
                isActive ? "text-blue-400" : "hover:text-blue-300"
              }
            >
              Lead Details
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

import React, { useState } from "react";
import axios from "axios";

const RegistrationOverlay = ({ event, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    registrationNumber: "",
    department: "",
    year: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { name, email, registrationNumber, department, year } = formData;

    if (!name || !email || !registrationNumber || !department || !year) {
      setError("All fields are required.");
      return;
    }

    try {
      const { data } = await axios.post(
        `https://cems-backend.onrender.com/api/v1/event/${event._id}/register`,
        {
          name,
          email,
          registrationNumber,
          department,
          year,
        },
        { withCredentials: true }
      );

      setSuccess(data.message);
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      const msg =
        err?.response?.data?.message || "Something went wrong. Try again.";
      setError(msg);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-xl font-bold text-gray-500 hover:text-red-600"
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold mb-4">Register for Event</h2>
        <div className="mb-3 text-sm text-gray-700">
          <p><strong>Event:</strong> {event.name}</p>
          <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
          <p><strong>Location:</strong> {event.location}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="w-full border px-3 py-2 rounded"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border px-3 py-2 rounded"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="text"
            name="registrationNumber"
            placeholder="Registration Number / Roll Number"
            className="w-full border px-3 py-2 rounded"
            value={formData.registrationNumber}
            onChange={handleChange}
          />
          <input
            type="text"
            name="department"
            placeholder="Department"
            className="w-full border px-3 py-2 rounded"
            value={formData.department}
            onChange={handleChange}
          />
          <input
            type="text"
            name="year"
            placeholder="Year"
            className="w-full border px-3 py-2 rounded"
            value={formData.year}
            onChange={handleChange}
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm">{success}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationOverlay;




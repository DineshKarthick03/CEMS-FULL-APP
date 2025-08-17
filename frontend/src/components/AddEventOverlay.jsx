import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const AddEventOverlay = ({ onClose, onEventAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    date: "",
    deadline: "",
    coordinators: "",
    maxParticipants: ""
  });
  //const API_BASE_URL = "https://cems-backend.onrender.com";
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://cems-full-app.onrender.com/api/v1/event",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      toast.success("Event created successfully");
      onEventAdded(); // refetch events
      onClose(); // close overlay
    } catch (err) {
      console.error("Error creating event:", err);
      toast.error(
        err?.response?.data?.message || "Error creating event"
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-2 right-3 text-xl font-bold">
          ×
        </button>
        <h2 className="text-xl font-bold mb-4">Add New Event</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Event Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="datetime-local"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="datetime-local"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="coordinators"
            placeholder="Coordinator Name"
            value={formData.coordinators}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="number"
            name="maxParticipants"
            placeholder="Max Participants"
            value={formData.maxParticipants}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
            min="1"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEventOverlay;

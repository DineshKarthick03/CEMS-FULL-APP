import React from "react";

const AdminEventCard = ({ event, onShowParticipants }) => {
  const start = new Date(event.date).toLocaleString();

  return (
    <div className="border shadow-md p-4 rounded-lg bg-white space-y-2">
      <h3 className="text-xl font-semibold">{event.name}</h3>
      <p>{event.description}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p><strong>Start:</strong> {start}</p>
      <p><strong>Participants:</strong> {event.participants?.length || 0} / {event.maxParticipants || 0}</p>
      <div className="flex justify-end">
        <button
          onClick={() => onShowParticipants(event)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          View Participants
        </button>
      </div>
    </div>
  );
};

export default AdminEventCard;

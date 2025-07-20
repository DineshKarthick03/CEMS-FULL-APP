import React from "react";

const ParticipantsOverlay = ({ event, onClose }) => {
  if (!event || !Array.isArray(event.participants)) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Participants</h2>
          <p>No participants data available.</p>
          <div className="flex justify-end mt-4">
            <button
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Participants</h2>
        {event.participants.length === 0 ? (
          <p>No participants have registered yet.</p>
        ) : (
          <ul className="space-y-2">
            {event.participants.map((participant, index) => (
              <li key={index} className="border p-2 rounded">
                <p><strong>Name:</strong> {participant.name}</p>
                <p><strong>Email:</strong> {participant.email}</p>
                <p><strong>Reg No:</strong> {participant.registrationNumber}</p>
                <p><strong>Department:</strong> {participant.department}</p>
                <p><strong>Year:</strong> {participant.year}</p>
              </li>
            ))}
          </ul>
        )}
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParticipantsOverlay;

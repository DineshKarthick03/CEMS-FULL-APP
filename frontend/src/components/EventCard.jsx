import React from 'react';

const EventCard = ({ event, user, onRegisterClick, onShowParticipantsClick }) => {
  const now = new Date();
  const eventDate = new Date(event.date);
  const deadline = new Date(event.deadline);

  const isPast = now >= eventDate;
  const isFull = event.participants.length >= event.maxParticipants;
  const isClosed = now > deadline;

  const showRegisterButton = !isPast && !isClosed && !isFull;

  const handleRegisterClick = () => {
    onRegisterClick(event);
  };

  const handleShowParticipantsClick = () => {
    onShowParticipantsClick(event);
  };

  return (
    <div className="border p-4 rounded shadow bg-white space-y-2">
      <h2 className="font-bold text-lg">{event.name}</h2>
      <p className="text-sm text-gray-500">{new Date(event.date).toLocaleString()}</p>
      <p className="text-gray-700">{event.description}</p>
      <p className="text-gray-600">Location: {event.location}</p>
      <p className="text-gray-600">Participants: {event.participants.length} / {event.maxParticipants}</p>

      {user?.role === 'admin' ? (
        <button
          className="mt-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={handleShowParticipantsClick}
        >
          Show Participants
        </button>
      ) : (
        <>
          {isFull && <p className="text-red-600 font-semibold">Full</p>}
          {isClosed && !isPast && <p className="text-yellow-600 font-semibold">Closed</p>}
          {isPast && <p className="text-gray-600 font-semibold">Event Over</p>}

          {showRegisterButton && (
            <button
              className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={handleRegisterClick}
            >
              Register Now
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default EventCard;

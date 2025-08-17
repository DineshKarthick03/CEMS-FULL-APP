import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Searchbar from "../components/Searchbar.jsx";
import EventFilterDropdown from "../components/EventFilterDropdown.jsx";
import AddEventOverlay from "../components/AddEventOverlay.jsx";
import ParticipantsOverlay from "../components/ParticipantsOverlay.jsx";
import Pagination from "../components/Pagination.jsx";
import axios from "axios";
import AdminEventCard from "../components/AdminEventCard.jsx";

const AdminEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filterType, setFilterType] = useState("upcoming");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showAddOverlay, setShowAddOverlay] = useState(false);
  const [selectedEventParticipants, setSelectedEventParticipants] = useState(null);
  const API_BASE_URL = "https://cems-full-app.onrender.com";

  // Fetch Events by type (upcoming/past)
  const fetchEvents = async () => {
    try {
      const endpoint =
        filterType === "upcoming"
          ? `${API_BASE_URL}/api/v1/event/upcoming?page=${page}&limit=6`
          : `${API_BASE_URL}/api/v1/event/past?page=${page}&limit=6`;
      const token = localStorage.getItem("token");
      const { data } = await axios.get(endpoint,{ headers: { Authorization: `Bearer ${token}` },});

      if (data?.events && Array.isArray(data.events)) {
        setEvents(data.events);
        setFilteredEvents(data.events); // initial filter
        setTotalPages(data.totalPages || 1);
      } else {
        setEvents([]);
        setFilteredEvents([]);
      }
    } catch (error) {
      console.error("Error fetching admin events:", error);
      setEvents([]);
      setFilteredEvents([]);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [filterType, page]);

  useEffect(() => {
    setPage(1); // reset page on filter change
  }, [filterType]);

  // Search Filtering
  useEffect(() => {
    const runSearch = async () => {
      if (!searchQuery.trim()) {
        setFilteredEvents(events);
        return;
      }

      try {
        const endpoint = `${API_BASE_URL}/api/v1/event/search?name=${encodeURIComponent(
          searchQuery
        )}`;
        const token = localStorage.getItem("token");
        const { data } = await axios.get(endpoint, {headers: { Authorization: `Bearer ${token}` },});

        if (data?.event && Array.isArray(data.event)) {
          const now = new Date();
          const filtered = data.event.filter((e) =>
            filterType === "upcoming"
              ? new Date(e.date) >= now
              : new Date(e.date) < now
          );
          setFilteredEvents(filtered);
        } else {
          setFilteredEvents([]);
        }
      } catch (err) {
        console.error("Search error:", err);
        setFilteredEvents([]);
      }
    };

    runSearch();
  }, [searchQuery, filterType, events]);

  const handleShowParticipants = (event) => {
    setSelectedEventParticipants(event);
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <Searchbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <EventFilterDropdown filterType={filterType} setFilterType={setFilterType} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEvents.map((event) => (
            <AdminEventCard
              key={event._id}
              event={event}
              onShowParticipants={() => handleShowParticipants(event)}
            />
          ))}
        </div>
      </div>

      {showAddOverlay && (
        <AddEventOverlay onClose={() => setShowAddOverlay(false)} onEventAdded={fetchEvents} />
      )}

      {selectedEventParticipants && (
        <ParticipantsOverlay
          event={selectedEventParticipants}
          onClose={() => setSelectedEventParticipants(null)}
        />
      )}

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />

      {/* Floating + button */}
      <button
        className="fixed bottom-8 right-8 bg-green-600 text-white px-4 py-2 rounded-full shadow-lg text-2xl"
        onClick={() => setShowAddOverlay(true)}
      >
        +
      </button>
    </div>
  );
};

export default AdminEventsPage;

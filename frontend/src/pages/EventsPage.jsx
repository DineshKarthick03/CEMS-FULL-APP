import React from "react";

import Navbar from "../components/Navbar.jsx";
import Searchbar from "../components/Searchbar.jsx";
import EventFilterDropdown from "../components/EventFilterDropdown.jsx";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import EventCard from "../components/EventCard.jsx";
import Pagination from "../components/Pagination.jsx";
import RegistrationOverlay from "../components/RegisterOverlay.jsx";


const EventsPage = () => {
  const [allEvents, setAllEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showRegisterOverlay, setShowRegisterOverlay] = useState(false);
  const [filterType, setFilterType] = useState("upcoming");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const API_BASE_URL = "https://cems-full-app.onrender.com";
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const endpoint = filterType === "upcoming"
          ? `${API_BASE_URL}/api/v1/event/upcoming?page=${page}&limit=6`
          : `${API_BASE_URL}/api/v1/event/past?page=${page}&limit=6`;

        const { data } = await axios.get(endpoint, {
          withCredentials: true,
        });

        //  Defensive check
        if (data?.events && Array.isArray(data.events)) {
          setAllEvents(data.events);
          setTotalPages(data.totalPages || 1);
        } else {
          console.warn("No events array found in response:", data);
          setAllEvents([]); // fallback to empty to avoid .filter() crash
        }

        setSearchQuery(""); // clear search on new fetch
      } catch (error) {
        console.error("Error fetching events:", error);
        setAllEvents([]); // fallback to avoid crash
      }
    };

    fetchEvents();
  }, [filterType, page]);
  useEffect(() => {
    setPage(1);
  }, [filterType]);


  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery.trim() === "") {
        setFilteredEvents(allEvents); // If no search, show all
        return;
      }

      try {
        const endpoint = `${API_BASE_URL}api/v1/event/search?name=${encodeURIComponent(searchQuery)}`;
        const { data } = await axios.get(endpoint, {
          withCredentials: true,
        });
        console.log("Search response:", data);

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
      } catch (error) {
        console.error("Search API failed:", error);
        setFilteredEvents([]);
      }
    };

    fetchSearchResults();
  }, [searchQuery, filterType, allEvents]);






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
            <EventCard key={event._id} event={event} onRegisterClick={(e) => {
              setSelectedEvent(e);
              setShowRegisterOverlay(true);
            }} />
          ))}
        </div>
      </div>
      {showRegisterOverlay && selectedEvent && (
        <RegistrationOverlay
          event={selectedEvent}
          onClose={() => setShowRegisterOverlay(false)}
        />
      )}
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      <br></br>
    </div>
  );
};

export default EventsPage;

const EventFilterDropdown = ({ filterType, setFilterType }) => {
  return (
    <select
      value={filterType}
      onChange={(e) => setFilterType(e.target.value)}
      className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
    >
      <option value="upcoming">Upcoming Events</option>
      <option value="past">Past Events</option>
    </select>
  );
};
export default EventFilterDropdown;
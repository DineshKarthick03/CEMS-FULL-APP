import React from 'react'

const Searchbar = ({searchQuery,setSearchQuery}) => {
  return (
    <div className='w-full md:w-1/2 mb-4 md:mb-0'>
        <input type="text" placeholder='Search Events' value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)}
        className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"/>
    </div>
  );
};

export default Searchbar;
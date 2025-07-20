import React from 'react'

const Pagination = ({page,totalPages,onPageChange}) => {
  if (totalPages <= 1) return null;
  const prevDisabled = page <= 1;
  const nextDisabled = page >= totalPages;
  return (
    <div className='flex items-center justify-center gap-2 mt-6'>
        <button disabled={prevDisabled}  onClick={()=>onPageChange(page-1)} 
        className={`px-3 py-1 rounded ${prevDisabled ? "bg-gray-300":"bg-indigo-500 text-white"}`}>
            Prev
        </button>
        <span className='px-3 py-1 border rounded'>
            {page} / {totalPages}
        </span>
        <button disabled={nextDisabled} onClick={()=>onPageChange(page+1)}
        className={`px-3 py-1 rounded ${nextDisabled ? "bg-gray-300":"bg-indigo-500 text-white"}`}>
            Next
        </button> 
    </div>
  )
}

export default Pagination;
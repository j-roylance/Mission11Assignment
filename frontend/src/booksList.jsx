import React, { useState, useEffect } from 'react'

function BooksList() {
  const [books, setBooks] = useState([]); // List of books
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(5) 
  const [sortDirection, setSortDirection] = useState('asc') // or 'desc'

  useEffect(() => {
    fetch('/api/Books')
      .then(res => (res.ok ? res.json() : Promise.reject(res)))
      .then(data => setBooks(data))
      .catch(() => setBooks([]))
  }, [])

// create a sorted copy so we don't mutate original state
const sortedBooks = [...books].sort((a, b) => {
  const titleA = (a.title || '').toLowerCase()
  const titleB = (b.title || '').toLowerCase()

  if (titleA < titleB) return sortDirection === 'asc' ? -1 : 1
  if (titleA > titleB) return sortDirection === 'asc' ? 1 : -1
  return 0
})

const totalPages = Math.ceil(sortedBooks.length / pageSize) || 1

const startIndex = (currentPage - 1) * pageSize
const currentBooks = sortedBooks.slice(startIndex, startIndex + pageSize)
  
  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }
  
  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  return (
    <div className="container my-4">
      <h2>Book List</h2>
      <div className="d-flex justify-content-end mb-3">
        <label className="me-2" htmlFor="pageSizeSelect">
          Results per page:
        </label>
        <select
          id="pageSizeSelect"
          className="form-select w-auto"
          value={pageSize}
          onChange={(e) => {
            const newSize = Number(e.target.value)
            setPageSize(newSize)
            setCurrentPage(1) // reset to first page when page size changes
          }}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>
      <table className="table table-striped">
        
        <thead>
          <tr>
                      <th style={{ cursor: 'pointer' }} onClick={() => setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'))}
            >
              Title {sortDirection === 'asc' ? '▲' : '▼'}
            </th>
            <th>Author</th>
            <th>Publisher</th>
            <th>ISBN</th>
            <th>Classification</th>
            <th>Category</th>
            <th>Pages</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {currentBooks.map((b) => (
            <tr key={b.bookID}>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.publisher}</td>
              <td>{b.isbn}</td>
              <td>{b.classification}</td>
              <td>{b.category}</td>
              <td>{b.pageCount}</td>
              <td>{b.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-between align-items-center mt-3">
  <button
    className="btn btn-primary"
    onClick={goToPreviousPage}
    disabled={currentPage === 1}
  >
    Previous
  </button>

  <span>
    Page {currentPage} of {totalPages}
  </span>

  <button
    className="btn btn-primary"
    onClick={goToNextPage}
    disabled={currentPage === totalPages}
  >
    Next
  </button>
</div>
    </div>
  )
}

export default BooksList
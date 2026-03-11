import React, { useState, useEffect } from 'react';
import { bookService } from '../services/api';
import { Edit2, Trash2, Search, Filter } from 'lucide-react';
import '../styles/BookList.css';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await bookService.getAll();
      setBooks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = async (e) => {
    setSearch(e.target.value);
    if (e.target.value.trim() === '') {
      fetchBooks();
    } else {
      const res = await bookService.search(e.target.value);
      setBooks(res.data);
    }
  };

  const deleteBook = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      await bookService.delete(id);
      fetchBooks();
    }
  };

  return (
    <div className="list-page">
      <div className="list-header">
        <div>
          <h1 className="list-title">Book Collection</h1>
          <p className="list-subtitle">Manage and track your library's inventory.</p>
        </div>
      </div>

      <div className="table-card">
        <div className="table-toolbar">
           <div className="toolbar-search">
              <Search className="search-icon" size={18} />
              <input 
                type="text" 
                placeholder="Search by title or author..." 
                className="toolbar-input"
                value={search}
                onChange={handleSearch}
              />
           </div>
           <button className="filter-btn">
              <Filter size={18} />
              <span className="text-sm font-medium">Filter</span>
           </button>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th className="px-6 py-4">Title & Author</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Quantity</th>
              <th className="px-6 py-4">Available</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map(book => (
              <tr key={book.id}>
                <td className="px-6 py-4">
                  <div className="book-info">
                    <div className="title">{book.title}</div>
                    <div className="author">{book.author}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="badge badge-primary">
                    {book.category}
                  </span>
                </td>
                <td className="px-6 py-4 color-slate-600">{book.quantity}</td>
                <td className="px-6 py-4">
                  <div className="avail-status">
                    <div className={`status-dot ${book.available > 0 ? 'dot-online' : 'dot-offline'}`}></div>
                    <span className="font-medium">{book.available}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="action-btn action-edit">
                      <Edit2 size={18} />
                    </button>
                    <button 
                      onClick={() => deleteBook(book.id)}
                      className="action-btn action-delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {books.length === 0 && (
          <div className="empty-state">
            No books found in the collection.
          </div>
        )}
      </div>
    </div>
  );
};

export default BookList;


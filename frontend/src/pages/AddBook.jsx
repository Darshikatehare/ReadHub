import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { bookService } from '../services/api';
import { PlusCircle, ArrowLeft } from 'lucide-react';
import '../styles/Forms.css';

const AddBook = () => {
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: '',
    author: '',
    category: '',
    quantity: 1,
    available: 1
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await bookService.save(book);
      navigate('/books');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="form-page-container">
      <button 
        onClick={() => navigate(-1)}
        className="back-link"
      >
        <ArrowLeft size={20} />
        <span className="font-medium">Back</span>
      </button>

      <div className="form-container-boxed">
        <div className="form-header-flex">
          <div className="header-icon-box">
             <PlusCircle size={24} />
          </div>
          <div className="header-text">
            <h1>Add New Book</h1>
            <p>Fill in the details to add a book to the collection.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid-layout">
            <div className="full-width">
              <div className="form-control-block">
                <label>Book Title</label>
                <input
                  type="text"
                  required
                  className="form-field"
                  placeholder="e.g. The Great Gatsby"
                  value={book.title}
                  onChange={e => setBook({...book, title: e.target.value})}
                />
              </div>
            </div>
            <div>
              <div className="form-control-block">
                <label>Author Name</label>
                <input
                  type="text"
                  required
                  className="form-field"
                  placeholder="e.g. F. Scott Fitzgerald"
                  value={book.author}
                  onChange={e => setBook({...book, author: e.target.value})}
                />
              </div>
            </div>
            <div>
              <div className="form-control-block">
                <label>Category</label>
                <select
                  className="form-field select-field"
                  value={book.category}
                  onChange={e => setBook({...book, category: e.target.value})}
                >
                  <option value="">Select Category</option>
                  <option value="Fiction">Fiction</option>
                  <option value="Non-Fiction">Non-Fiction</option>
                  <option value="Science">Science</option>
                  <option value="History">History</option>
                  <option value="Technology">Technology</option>
                </select>
              </div>
            </div>
            <div>
              <div className="form-control-block">
                <label>Total Quantity</label>
                <input
                  type="number"
                  min="1"
                  required
                  className="form-field"
                  value={book.quantity}
                  onChange={e => setBook({...book, quantity: parseInt(e.target.value), available: parseInt(e.target.value)})}
                />
              </div>
            </div>
          </div>

          <div className="btn-group">
             <button
               type="button"
               onClick={() => navigate('/books')}
               className="btn btn-secondary"
             >
               Cancel
             </button>
             <button
               type="submit"
               className="btn btn-primary"
             >
               Add to Inventory
             </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;


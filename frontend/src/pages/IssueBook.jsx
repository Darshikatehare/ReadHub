import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { bookService, userService, issueService } from '../services/api';
import { BookUp, User, Book as BookIcon } from 'lucide-react';
import '../styles/Forms.css';

const IssueBook = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [selection, setSelection] = useState({ bookId: '', userId: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const bRes = await bookService.getAll();
      const uRes = await userService.getAll();
      setBooks(bRes.data.filter(b => b.available > 0));
      setUsers(uRes.data);
    };
    fetchData();
  }, []);

  const handleIssue = async (e) => {
    e.preventDefault();
    if (!selection.bookId || !selection.userId) return;
    
    setLoading(true);
    try {
      await issueService.issue(selection);
      navigate('/');
    } catch (err) {
      console.error(err);
      alert("Failed to issue book.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Issue a Book</h1>
        <p className="dashboard-subtitle">Record a new book issuance to a library member.</p>
      </div>

      <form onSubmit={handleIssue} className="selection-grid">
        <div className="selection-card">
           <div className="card-header-small text-primary-blue">
              <BookIcon size={20} />
              <h2 className="font-bold text-lg">Select Book</h2>
           </div>
           <div className="option-list">
             {books.map(book => (
               <label 
                 key={book.id} 
                 className={`option-item ${selection.bookId === book.id ? 'selected-blue' : ''}`}
               >
                 <input 
                   type="radio" 
                   name="book" 
                   className="hidden" 
                   onChange={() => setSelection({...selection, bookId: book.id})}
                 />
                 <div>
                   <div className="item-main-text">{book.title}</div>
                   <div className="item-sub-text">{book.author}</div>
                   <div className="availability-tag">
                      {book.available} Available
                   </div>
                 </div>
               </label>
             ))}
           </div>
        </div>

        <div className="selection-card-box">
          <div className="selection-card">
             <div className="card-header-small text-primary-purple">
                <User size={20} />
                <h2 className="font-bold text-lg">Select Member</h2>
             </div>
             <div className="option-list">
                {users.map(user => (
                  <label 
                    key={user.id} 
                    className={`option-item ${selection.userId === user.id ? 'selected-purple' : ''}`}
                  >
                    <input 
                      type="radio" 
                      name="user" 
                      className="hidden" 
                      onChange={() => setSelection({...selection, userId: user.id})}
                    />
                    <div className="item-avatar-small">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <div className="item-main-text">{user.name}</div>
                      <div className="item-sub-text">{user.email}</div>
                    </div>
                  </label>
                ))}
             </div>
          </div>

          <button
            disabled={!selection.bookId || !selection.userId || loading}
            className="confirm-btn-large mt-6"
          >
            <BookUp size={20} />
            {loading ? 'Processing...' : 'Confirm Issuance'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default IssueBook;


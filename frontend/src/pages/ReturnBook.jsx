import React, { useState, useEffect } from 'react';
import { issueService } from '../services/api';
import { BookDown, Clock, CheckCircle, Search } from 'lucide-react';
import '../styles/BookList.css';
import '../styles/Forms.css';

const ReturnBook = () => {
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchIssued();
  }, []);

  const fetchIssued = async () => {
    try {
      const res = await issueService.getIssued();
      setIssuedBooks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleReturn = async (id) => {
    try {
      await issueService.return(id);
      fetchIssued();
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = issuedBooks.filter(record => 
    record.status === 'ISSUED' && 
    (record.book.title.toLowerCase().includes(search.toLowerCase()) || 
     record.user.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="list-page">
      <div className="list-header">
        <div>
          <h1 className="list-title">Return Process</h1>
          <p className="list-subtitle">Search for active issuances and record returns.</p>
        </div>
      </div>

      <div className="table-card">
        <div className="table-toolbar">
           <div className="toolbar-search">
              <Search className="search-icon" size={18} />
              <input 
                type="text" 
                placeholder="Search by book or member name..." 
                className="toolbar-input"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
           </div>
        </div>

        <div className="user-items">
           {filtered.map(record => (
             <div key={record.id} className="user-item">
               <div className="user-main-info gap-6">
                 <div className="stat-icon-wrapper amber-icon">
                    <Clock size={24} />
                 </div>
                 <div>
                   <h3 className="user-name" style={{fontSize: '1.125rem'}}>{record.book.title}</h3>
                   <p className="user-details" style={{marginTop: '4px'}}>
                      <span className="font-medium">Issued to:</span> {record.user.name}
                   </p>
                   <p className="item-sub-text" style={{marginTop: '4px'}}>Date Issued: {record.issueDate}</p>
                 </div>
               </div>
               <button
                 onClick={() => handleReturn(record.id)}
                 className="btn btn-primary"
                 style={{padding: '0.75rem 1.5rem', width: 'auto', display: 'flex', alignItems: 'center', gap: '8px'}}
               >
                 <BookDown size={18} />
                 Record Return
               </button>
             </div>
           ))}
           {filtered.length === 0 && (
             <div className="empty-state">
                {issuedBooks.length === 0 ? "No active issuances found." : "No records match your search."}
             </div>
           )}
        </div>
      </div>
      
      {issuedBooks.some(r => r.status === 'RETURNED') && (
        <div style={{marginTop: '3rem'}}>
           <h2 className="list-title" style={{fontSize: '1.25rem', marginBottom: '1.5rem'}}>Recently Returned</h2>
           <div className="table-card">
             <div className="user-items">
               {issuedBooks.filter(r => r.status === 'RETURNED').slice(0, 5).map(record => (
                 <div key={record.id} className="user-item" style={{opacity: 0.7}}>
                   <div className="user-main-info">
                      <CheckCircle className="text-online" size={20} style={{color: '#10b981'}} />
                      <div>
                        <span className="user-name">{record.book.title}</span>
                        <span style={{margin: '0 8px', color: '#94a3b8'}}>|</span>
                        <span className="user-details">{record.user.name}</span>
                      </div>
                   </div>
                   <span className="item-sub-text">Returned on {record.returnDate}</span>
                 </div>
               ))}
             </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default ReturnBook;


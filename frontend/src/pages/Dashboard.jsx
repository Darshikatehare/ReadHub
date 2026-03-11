import React, { useState, useEffect } from 'react';
import { bookService, userService, issueService } from '../services/api';
import { Book, Users, BookMarked, AlertCircle } from 'lucide-react';
import '../styles/Dashboard.css';

const StatCard = ({ title, value, icon: Icon, colorClass }) => (
  <div className="stat-card">
    <div className={`stat-icon-wrapper ${colorClass}`}>
      <Icon size={24} />
    </div>
    <div className="stat-info">
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalBooks: 0,
    availableBooks: 0,
    issuedBooks: 0,
    totalUsers: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const booksRes = await bookService.getAll();
        const usersRes = await userService.getAll();
        const issuesRes = await issueService.getIssued();
        
        const totalBooks = booksRes.data.reduce((acc, book) => acc + book.quantity, 0);
        const availableBooks = booksRes.data.reduce((acc, book) => acc + book.available, 0);
        const activeIssues = issuesRes.data.filter(i => i.status === 'ISSUED').length;

        setStats({
          totalBooks,
          availableBooks,
          issuedBooks: activeIssues,
          totalUsers: usersRes.data.length
        });
      } catch (error) {
        console.error("Error fetching stats", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="dashboard-content">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Library Dashboard</h1>
        <p className="dashboard-subtitle">Welcome back, Admin. Here's what's happening today.</p>
      </div>

      <div className="stats-grid">
        <StatCard 
          title="Total Books" 
          value={stats.totalBooks} 
          icon={Book} 
          colorClass="blue-icon" 
        />
        <StatCard 
          title="Available" 
          value={stats.availableBooks} 
          icon={BookMarked} 
          colorClass="emerald-icon" 
        />
        <StatCard 
          title="Issued Books" 
          value={stats.issuedBooks} 
          icon={AlertCircle} 
          colorClass="amber-icon" 
        />
        <StatCard 
          title="Total Users" 
          value={stats.totalUsers} 
          icon={Users} 
          colorClass="purple-icon" 
        />
      </div>

      <div className="dashboard-sections">
        <div className="section-card">
           <h2 className="section-title">Quick Stats Overview</h2>
           <div className="placeholder-box">
              <p>Library statistics visualization goes here.</p>
           </div>
        </div>
        <div className="section-card">
           <h2 className="section-title">System Notifications</h2>
           <ul className="notification-list">
              <li className="notification-item">
                 <div className="dot dot-blue"></div>
                 System is running smoothly.
              </li>
              <li className="notification-item">
                 <div className="dot dot-emerald"></div>
                 Database backup completed.
              </li>
           </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


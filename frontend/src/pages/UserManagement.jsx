import React, { useState, useEffect } from 'react';
import { userService } from '../services/api';
import { Trash2, UserPlus, Mail, Phone } from 'lucide-react';
import '../styles/UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', phone: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await userService.getAll();
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await userService.save(newUser);
      setNewUser({ name: '', email: '', phone: '' });
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm('Delete this user?')) {
      await userService.delete(id);
      fetchUsers();
    }
  };

  return (
    <div className="user-mgmt-page">
      <div className="user-mgmt-header">
        <div>
          <h1 className="user-mgmt-title">User Management</h1>
          <p className="user-mgmt-subtitle">Add new users and manage existing library members.</p>
        </div>
      </div>

      <div className="user-grid">
        {/* Add User Form */}
        <div className="form-card">
          <h2 className="form-title">
             <UserPlus size={20} className="text-primary-600" />
             Register New User
          </h2>
          <form onSubmit={handleAddUser}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                required
                className="form-input"
                value={newUser.name}
                onChange={e => setNewUser({...newUser, name: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                required
                className="form-input"
                value={newUser.email}
                onChange={e => setNewUser({...newUser, email: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="text"
                required
                className="form-input"
                value={newUser.phone}
                onChange={e => setNewUser({...newUser, phone: e.target.value})}
              />
            </div>
            <button
              type="submit"
              className="submit-btn"
            >
              Create Member
            </button>
          </form>
        </div>

        {/* User List */}
        <div className="user-list-card">
          <div className="list-header-box">
             <h2>Library Members</h2>
          </div>
          <div className="user-items">
            {users.map(user => (
              <div key={user.id} className="user-item">
                <div className="user-main-info">
                  <div className="user-avatar">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <div className="user-name">{user.name}</div>
                    <div className="user-details">
                      <div className="detail-item">
                        <Mail size={12} /> {user.email}
                      </div>
                      <div className="detail-item">
                        <Phone size={12} /> {user.phone}
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => deleteUser(user.id)}
                  className="delete-user-btn"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
            {users.length === 0 && (
              <div className="empty-state">
                No users registered yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;


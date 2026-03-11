import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  BookUp, 
  BookDown, 
  PlusCircle, 
  Search, 
  Library 
} from 'lucide-react';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import BookList from './pages/BookList';
import UserManagement from './pages/UserManagement';
import IssueBook from './pages/IssueBook';
import ReturnBook from './pages/ReturnBook';
import AddBook from './pages/AddBook';
import './styles/App.css';

const SidebarItem = ({ to, icon: Icon, label, active }) => (
  <Link
    to={to}
    className={`nav-item ${active ? 'active' : ''}`}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </Link>
);

function App() {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  return (
    <div className={isLandingPage ? "" : "app-container"}>
      {/* Sidebar - only show if not on landing page */}
      {!isLandingPage && (
        <aside className="sidebar">
          <div className="brand">
            <Library className="text-primary-600" size={32} />
            <h1 className="brand-name">ReadHub</h1>
          </div>
          
          <nav className="nav-menu">
            <SidebarItem 
              to="/dashboard" 
              icon={LayoutDashboard} 
              label="Dashboard" 
              active={location.pathname === '/dashboard'} 
            />
            <SidebarItem 
              to="/books" 
              icon={BookOpen} 
              label="Books" 
              active={location.pathname === '/books'} 
            />
            <SidebarItem 
              to="/users" 
              icon={Users} 
              label="Users" 
              active={location.pathname === '/users'} 
            />
            <div className="nav-section-title">
              Actions
            </div>
            <SidebarItem 
              to="/add-book" 
              icon={PlusCircle} 
              label="Add Book" 
              active={location.pathname === '/add-book'} 
            />
            <SidebarItem 
              to="/issue" 
              icon={BookUp} 
              label="Issue Book" 
              active={location.pathname === '/issue'} 
            />
            <SidebarItem 
              to="/return" 
              icon={BookDown} 
              label="Return Book" 
              active={location.pathname === '/return'} 
            />
          </nav>
        </aside>
      )}

      {/* Main Content */}
      <main className={isLandingPage ? "" : "main-content"}>
        {/* Navbar - only show if not on landing page */}
        {!isLandingPage && (
          <header className="navbar">
            <div className="search-container">
              <Search className="search-icon" size={18} />
              <input 
                type="text" 
                placeholder="Search books..." 
                className="search-input"
              />
            </div>
            <div className="user-profile">
              <div className="avatar">
                AD
              </div>
            </div>
          </header>
        )}

        {/* Page Container */}
        <div className={isLandingPage ? "" : "page-container"}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/books" element={<BookList />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/issue" element={<IssueBook />} />
            <Route path="/return" element={<ReturnBook />} />
            <Route path="/add-book" element={<AddBook />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;



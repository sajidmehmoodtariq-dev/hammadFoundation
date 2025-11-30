import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SliderManager from './components/SliderManager';
import DirectorEditor from './components/DirectorEditor';
import StatsEditor from './components/StatsEditor';
import BankDetailsEditor from './components/BankDetailsEditor';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('slider');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const sections = [
    { id: 'slider', label: 'Hero Slider', icon: '🖼️' },
    { id: 'director', label: 'Director Message', icon: '👤' },
    { id: 'stats', label: 'Statistics', icon: '📊' },
    { id: 'bank', label: 'Bank Details', icon: '💳' },
  ];

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2>🎓 Admin Panel</h2>
        </div>
        
        <nav className="sidebar-nav">
          {sections.map((section) => (
            <button
              key={section.id}
              className={`nav-btn ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => setActiveSection(section.id)}
            >
              <span className="nav-icon">{section.icon}</span>
              <span>{section.label}</span>
            </button>
          ))}
        </nav>

        <button className="logout-btn" onClick={handleLogout}>
          <span>🚪</span>
          <span>Logout</span>
        </button>
      </aside>

      <main className="admin-content">
        <header className="content-header">
          <h1>
            {sections.find(s => s.id === activeSection)?.icon}{' '}
            {sections.find(s => s.id === activeSection)?.label}
          </h1>
        </header>

        <div className="content-body">
          {activeSection === 'slider' && <SliderManager />}
          {activeSection === 'director' && <DirectorEditor />}
          {activeSection === 'stats' && <StatsEditor />}
          {activeSection === 'bank' && <BankDetailsEditor />}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;

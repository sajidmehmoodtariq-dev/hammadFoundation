import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    if (!isHomePage) {
      setActiveSection('');
      return;
    }

    const handleScroll = () => {
      const sections = ['about', 'director', 'academics', 'facilities'];
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            return;
          }
        }
      }

      // If scrolled to top, clear active section
      if (window.scrollY < 100) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const handleSectionClick = (sectionId) => {
    setIsMobileMenuOpen(false);
    if (isHomePage) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo" onClick={() => setIsMobileMenuOpen(false)}>
          <h2>Hammad Foundation School</h2>
        </Link>
        
        <button 
          className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          </li>
          {isHomePage && (
            <>
              <li className="nav-item">
                <a 
                  href="#about" 
                  className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
                  onClick={() => handleSectionClick('about')}
                >
                  About
                </a>
              </li>
              <li className="nav-item">
                <a 
                  href="#director" 
                  className={`nav-link ${activeSection === 'director' ? 'active' : ''}`}
                  onClick={() => handleSectionClick('director')}
                >
                  Director
                </a>
              </li>
              <li className="nav-item">
                <a 
                  href="#academics" 
                  className={`nav-link ${activeSection === 'academics' ? 'active' : ''}`}
                  onClick={() => handleSectionClick('academics')}
                >
                  Academics
                </a>
              </li>
              <li className="nav-item">
                <a 
                  href="#facilities" 
                  className={`nav-link ${activeSection === 'facilities' ? 'active' : ''}`}
                  onClick={() => handleSectionClick('facilities')}
                >
                  Facilities
                </a>
              </li>
            </>
          )}
          <li className="nav-item">
            <Link to="/donate" className="nav-link donate-btn" onClick={() => setIsMobileMenuOpen(false)}>
              <span className="btn-icon">❤️</span>
              <span>Donate Now</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

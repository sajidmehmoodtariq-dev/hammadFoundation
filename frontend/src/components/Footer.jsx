import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Hammad Foundation School</h3>
          <p>Providing 100% Free Quality Education</p>
        </div>
        
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: info@hammadfoundation.edu.pk</p>
          <p>Phone: +92 300 8099015</p>
          <p>Address: [School Address Here]</p>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#about">About Us</a></li>
            <li><a href="#academics">Academic Programs</a></li>
            <li><a href="#facilities">Facilities</a></li>
            <li><a href="/donate">Donate</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Our Branches</h4>
          <ul>
            <li><a href="#">Main Campus - [Location]</a></li>
            <li><a href="#">Branch Campus 1 - [Location]</a></li>
            <li><a href="#">Branch Campus 2 - [Location]</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-links">
            <a href="#" aria-label="Facebook">📘 Facebook</a>
            <a href="#" aria-label="Twitter">🐦 Twitter</a>
            <a href="#" aria-label="Instagram">📷 Instagram</a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2025 Hammad Foundation School. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

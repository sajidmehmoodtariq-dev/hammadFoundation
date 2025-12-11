import { useState, useEffect } from 'react';
import './Footer.css';

const Footer = () => {
  const [contactInfo, setContactInfo] = useState({
    email: 'info@hammadfoundation.edu.pk',
    phone: '92 300 8099015',
    address: '[School Address Here]',
    socialMedia: {
      facebook: '',
      twitter: '',
      instagram: '',
      linkedin: ''
    },
    branches: []
  });

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    try {
      const response = await fetch('https://hammad-foundation-beackend.vercel.app/api/content/contact');
      const data = await response.json();
      
      if (data.success && data.contact) {
        setContactInfo(data.contact);
      }
    } catch (error) {
      console.error('Failed to load contact info:', error);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Hammad Foundation School</h3>
          <p>Providing 100% Free Quality Education</p>
        </div>
        
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: {contactInfo.email}</p>
          <p>Phone: {contactInfo.phone}</p>
          <p>Address: {contactInfo.address}</p>
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
            {contactInfo.branches && contactInfo.branches.length > 0 ? (
              contactInfo.branches.map((branch, index) => (
                <li key={index}>
                  <a href={branch.link || '#'}>
                    {branch.name} - {branch.location}
                  </a>
                </li>
              ))
            ) : (
              <>
                <li><a href="#">Main Campus - [Location]</a></li>
                <li><a href="#">Branch Campus 1 - [Location]</a></li>
                <li><a href="#">Branch Campus 2 - [Location]</a></li>
              </>
            )}
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-links">
            {contactInfo.socialMedia.facebook && (
              <a href={contactInfo.socialMedia.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">📘 Facebook</a>
            )}
            {contactInfo.socialMedia.twitter && (
              <a href={contactInfo.socialMedia.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">🐦 Twitter</a>
            )}
            {contactInfo.socialMedia.instagram && (
              <a href={contactInfo.socialMedia.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">📷 Instagram</a>
            )}
            {contactInfo.socialMedia.linkedin && (
              <a href={contactInfo.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">💼 LinkedIn</a>
            )}
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

import { useState, useEffect } from 'react';
import './ContactEditor.css';

const ContactEditor = () => {
  const [contactInfo, setContactInfo] = useState({
    email: 'info@hammadfoundation.edu.pk',
    phone: '92 300 8099015',
    address: '[School Address Here]',
    donationEmail: 'donations@hammadfoundation.edu.pk',
    officeHours: 'Monday - Friday, 9:00 AM - 5:00 PM',
    socialMedia: {
      facebook: '',
      twitter: '',
      instagram: '',
      linkedin: ''
    }
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('social_')) {
      const socialKey = name.replace('social_', '');
      setContactInfo(prev => ({
        ...prev,
        socialMedia: {
          ...prev.socialMedia,
          [socialKey]: value
        }
      }));
    } else {
      setContactInfo(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('https://hammad-foundation-beackend.vercel.app/api/content/contact', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactInfo),
      });

      const data = await response.json();

      if (data.success) {
        setMessage('Contact information updated successfully!');
      } else {
        setMessage('Failed to update contact information');
      }
    } catch (error) {
      setMessage('Error updating contact information');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-editor">
      <h2>Contact Information Settings</h2>
      
      {message && <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>{message}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>General Contact</h3>
          
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={contactInfo.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={contactInfo.phone}
              onChange={handleChange}
              placeholder="92 300 8099015"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">School Address</label>
            <textarea
              id="address"
              name="address"
              value={contactInfo.address}
              onChange={handleChange}
              rows="3"
              required
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Donations Contact</h3>
          
          <div className="form-group">
            <label htmlFor="donationEmail">Donations Email</label>
            <input
              type="email"
              id="donationEmail"
              name="donationEmail"
              value={contactInfo.donationEmail}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="officeHours">Office Hours</label>
            <input
              type="text"
              id="officeHours"
              name="officeHours"
              value={contactInfo.officeHours}
              onChange={handleChange}
              placeholder="Monday - Friday, 9:00 AM - 5:00 PM"
              required
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Social Media Links</h3>
          
          <div className="form-group">
            <label htmlFor="social_facebook">Facebook URL</label>
            <input
              type="url"
              id="social_facebook"
              name="social_facebook"
              value={contactInfo.socialMedia.facebook}
              onChange={handleChange}
              placeholder="https://facebook.com/..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="social_twitter">Twitter URL</label>
            <input
              type="url"
              id="social_twitter"
              name="social_twitter"
              value={contactInfo.socialMedia.twitter}
              onChange={handleChange}
              placeholder="https://twitter.com/..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="social_instagram">Instagram URL</label>
            <input
              type="url"
              id="social_instagram"
              name="social_instagram"
              value={contactInfo.socialMedia.instagram}
              onChange={handleChange}
              placeholder="https://instagram.com/..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="social_linkedin">LinkedIn URL</label>
            <input
              type="url"
              id="social_linkedin"
              name="social_linkedin"
              value={contactInfo.socialMedia.linkedin}
              onChange={handleChange}
              placeholder="https://linkedin.com/..."
            />
          </div>
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default ContactEditor;

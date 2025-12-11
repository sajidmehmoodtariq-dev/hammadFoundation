import { useState, useEffect } from 'react';
import HeroSlider from '../components/HeroSlider';
import './HomePage.css';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('mission');
  const [stats, setStats] = useState([
    { icon: '👨‍🏫', number: '35+', label: 'Qualified Staff' },
    { icon: '📚', number: '999+', label: 'Current Enrollments' },
    { icon: '🎓', number: '999+', label: 'Successful Graduates' },
    { icon: '⭐', number: '100%', label: 'Free Education' }
  ]);
  const [director, setDirector] = useState({
    name: 'Director Name',
    title: 'Director, Hammad Foundation School',
    image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    message: `Dear Students, Parents, and Well-wishers,

It gives me immense pleasure to welcome you to Hammad Foundation School. Education is the most powerful tool for changing the world, and at our school, we are committed to providing that tool to every child, regardless of their financial circumstances.

Our dedicated faculty and staff work tirelessly to create a nurturing environment where students can explore their talents, develop critical thinking skills, and grow into responsible citizens. We believe in holistic education that develops not just academic excellence but also character, creativity, and compassion.

I invite you to join us in our mission to educate and empower the next generation. Together, we can make a difference.`
  });

  const [galleryItems, setGalleryItems] = useState([]);

  useEffect(() => {
    fetchStats();
    fetchDirector();
    fetchGallery();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('https://hammad-foundation-beackend.vercel.app/api/content/stats');
      const data = await response.json();
      
      if (data.success && data.stats) {
        const formattedStats = data.stats.map(stat => ({
          icon: stat.icon,
          number: stat.number,
          label: stat.label
        }));
        setStats(formattedStats);
      }
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  };

  const fetchDirector = async () => {
    try {
      const response = await fetch('https://hammad-foundation-beackend.vercel.app/api/content/director');
      const data = await response.json();
      
      if (data.success && data.director) {
        setDirector(data.director);
      }
    } catch (error) {
      console.error('Failed to load director info:', error);
    }
  };

  const fetchGallery = async () => {
    try {
      const response = await fetch('https://hammad-foundation-beackend.vercel.app/api/content/gallery');
      const data = await response.json();
      if (data.success && data.gallery && Array.isArray(data.gallery)) {
        // Filter active items and sort by display_order
        const activeItems = data.gallery.filter(item => item.is_active).sort((a, b) => a.display_order - b.display_order);
        setGalleryItems(activeItems);
      }
    } catch (error) {
      console.error('Error fetching gallery items:', error);
    }
  };

  return (
    <div className="home-page">
      {/* Hero Slider Section */}
      <HeroSlider />

      {/* School Name and About Section */}
      <section className="school-intro" id="about">
        <div className="container">
          <div className="intro-badge">
            <span className="badge-icon">✨</span>
            <span>Transforming Lives Through Education</span>
          </div>
          <h1 className="school-name">Hammad Foundation School</h1>
          
          <div className="about-section">
            <div className="about-content">
              <h2>About Us</h2>
              <p className="lead-text">
                Hammad Foundation School is dedicated to providing <strong>world-class education</strong> to students 
                completely free of charge. We believe that every child deserves access to excellent 
                education regardless of their economic background.
              </p>
              <p>
                Our mission is to empower the next generation through comprehensive learning and character 
                development. With dedicated faculty, modern facilities, and a nurturing environment, we're 
                building a brighter future for our community.
              </p>
            </div>
            
            <div className="free-education-highlight">
              <div className="highlight-icon">🎓</div>
              <h3>100% Free Education</h3>
              <p>No tuition fees. No hidden charges. Just quality education for all.</p>
            </div>
            
            <div className="mission-vision-cards">
              <div 
                className={`value-card ${activeTab === 'mission' ? 'active' : ''}`}
                onClick={() => setActiveTab('mission')}
              >
                <div className="card-icon">🎯</div>
                <h3>Our Mission</h3>
                <p>
                  To provide accessible, high-quality education that nurtures intellectual 
                  curiosity, critical thinking, and moral values. Creating an inclusive 
                  environment where every student reaches their full potential.
                </p>
              </div>
              
              <div 
                className={`value-card ${activeTab === 'vision' ? 'active' : ''}`}
                onClick={() => setActiveTab('vision')}
              >
                <div className="card-icon">🌟</div>
                <h3>Our Vision</h3>
                <p>
                  To become a leading educational institution recognized for academic excellence, 
                  character development, and community service. Empowering students to become 
                  confident, compassionate leaders of tomorrow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <h2 className="stats-heading">Our School at a Glance</h2>
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Director's Message Section */}
      <section className="director-message" id="director">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Leadership</span>
            <h2 className="section-title">Director's Message</h2>
            <p className="section-subtitle">A word from our visionary leader</p>
          </div>
          <div className="director-content">
            <div className="director-image-wrapper">
              <div className="director-image">
                <img 
                  src={director.image_url} 
                  alt={director.name} 
                />
              </div>
              <div className="director-badge">
                <span className="badge-title">Director</span>
                <span className="badge-subtitle">Educational Leader</span>
              </div>
            </div>
            <div className="director-text">
              <div className="quote-icon">"</div>
              <h3>Welcome from Our Director</h3>
              <div style={{ whiteSpace: 'pre-wrap' }}>
                {director.message}
              </div>
              <p className="director-signature">
                <strong>— {director.name}</strong><br />
                <em>{director.title}</em>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Programs Section */}
      <section className="academic-programs" id="academics">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Our Programs</span>
            <h2 className="section-title">Academic Programs</h2>
            <p className="section-subtitle">
              Comprehensive education from early childhood to high school
            </p>
          </div>
          
          <div className="programs-grid">
            <div className="program-card">
              <div className="program-icon">🧸</div>
              <h3>Nursery & Kindergarten</h3>
              <p>
                Our early childhood program focuses on play-based learning, social development, 
                and building a strong foundation for future academic success. We provide a safe, 
                nurturing environment where young minds begin their educational journey.
              </p>
              <ul className="program-features">
                <li>Ages 3-5</li>
                <li>Play-based learning</li>
                <li>Social skill development</li>
                <li>Creative activities</li>
              </ul>
            </div>

            <div className="program-card">
              <div className="program-icon">📚</div>
              <h3>Primary School</h3>
              <p>
                Our primary program (Grades 1-5) emphasizes fundamental literacy, numeracy, 
                and critical thinking skills. We foster curiosity and love for learning through 
                engaging lessons and hands-on activities.
              </p>
              <ul className="program-features">
                <li>Grades 1-5</li>
                <li>Core subjects mastery</li>
                <li>English & Urdu language</li>
                <li>Arts & Physical Education</li>
              </ul>
            </div>

            <div className="program-card">
              <div className="program-icon">🔬</div>
              <h3>Middle School</h3>
              <p>
                Middle school (Grades 6-8) prepares students for advanced academic work with 
                a focus on science, mathematics, languages, and social studies. We encourage 
                independent thinking and research skills.
              </p>
              <ul className="program-features">
                <li>Grades 6-8</li>
                <li>Advanced curriculum</li>
                <li>Science & Technology</li>
                <li>Leadership development</li>
              </ul>
            </div>

            <div className="program-card">
              <div className="program-icon">🎓</div>
              <h3>High School</h3>
              <p>
                Our high school program (Grades 9-10) offers comprehensive preparation for 
                matriculation examinations. We provide guidance and support to help students 
                achieve their academic and career goals.
              </p>
              <ul className="program-features">
                <li>Grades 9-10</li>
                <li>Matric preparation</li>
                <li>Career counseling</li>
                <li>College guidance</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="facilities" id="facilities">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Our Campus</span>
            <h2 className="section-title">Student Facilities</h2>
            <p className="section-subtitle">
              Modern amenities to support comprehensive learning
            </p>
          </div>
          
          <div className="facilities-grid">
            <div className="facility-card">
              <div className="facility-icon">📖</div>
              <h3>Library</h3>
              <p>Well-stocked library with books, magazines, and digital resources</p>
            </div>

            <div className="facility-card">
              <div className="facility-icon">💻</div>
              <h3>Computer Lab</h3>
              <p>Modern computer lab with internet access for digital literacy</p>
            </div>

            <div className="facility-card">
              <div className="facility-icon">🔬</div>
              <h3>Science Labs</h3>
              <p>Fully equipped science laboratories for practical experiments</p>
            </div>

            <div className="facility-card">
              <div className="facility-icon">⚽</div>
              <h3>Sports Facilities</h3>
              <p>Playground and sports equipment for physical education</p>
            </div>

            <div className="facility-card">
              <div className="facility-icon">🎨</div>
              <h3>Art Room</h3>
              <p>Dedicated space for creative arts and craft activities</p>
            </div>

            <div className="facility-card">
              <div className="facility-icon">🍽️</div>
              <h3>Cafeteria</h3>
              <p>Clean and hygienic cafeteria serving nutritious meals</p>
            </div>

            <div className="facility-card">
              <div className="facility-icon">🚌</div>
              <h3>Transportation</h3>
              <p>Safe and reliable transportation services available</p>
            </div>

            <div className="facility-card">
              <div className="facility-icon">🏥</div>
              <h3>Medical Room</h3>
              <p>First-aid facility and basic medical care on campus</p>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="location-section" id="location">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Visit Us</span>
            <h2 className="section-title">Our Location</h2>
            <p className="section-subtitle">
              Come visit us and see our campus facilities
            </p>
          </div>

          <div className="location-content">
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3401.4974847934814!2d74.35825137543695!3d31.50802574876879!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391905888888888f%3A0x6e6e6e6e6e6e6e6e!2sHammad%20Foundation%20School!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
                width="100%"
                height="450"
                style={{ border: 0, borderRadius: '12px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Hammad Foundation School Location"
              ></iframe>
            </div>

            <div className="location-details">
              <div className="location-card">
                <div className="location-icon">📍</div>
                <h3>Address</h3>
                <p>Hammad Foundation School<br />
                [Your Complete Address Here]<br />
                Lahore, Pakistan</p>
                <a 
                  href="https://maps.app.goo.gl/9DBLCK2DUaDhtGs17" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-location"
                >
                  📍 Open in Google Maps
                </a>
              </div>

              <div className="location-card">
                <div className="location-icon">📞</div>
                <h3>Contact</h3>
                <p>
                  <strong>Phone:</strong> +92 300 8099015<br />
                  <strong>Email:</strong> info@hammadfoundationschool.org<br />
                  <strong>Office Hours:</strong> Mon-Fri, 9AM-5PM
                </p>
              </div>

              <div className="location-card">
                <div className="location-icon">🚌</div>
                <h3>How to Reach</h3>
                <p>
                  Our school is easily accessible by public transport. 
                  Free transportation services are available for eligible students.
                  Contact us for more details about school bus routes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Admission Gallery Section */}
      <section className="admission-gallery" id="admissions">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Join Us</span>
            <h2 className="section-title">Wish to Know About Our Admission Process?</h2>
            <p className="section-subtitle">
              Take a glimpse of our campus life and start your journey with us
            </p>
          </div>
          
          <div className="gallery-grid">
            {galleryItems.length > 0 ? (
              galleryItems.map((item) => (
                <div key={item._id} className="gallery-item">
                  <img 
                    src={item.image_url} 
                    alt={item.title} 
                  />
                  <div className="gallery-overlay">
                    <h4>{item.title}</h4>
                  </div>
                </div>
              ))
            ) : (
              <div className="gallery-item">
                <img 
                  src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80" 
                  alt="Students in classroom" 
                />
                <div className="gallery-overlay">
                  <h4>Interactive Learning</h4>
                </div>
              </div>
            )}
          </div>

          <div className="admission-cta">
            <div className="cta-content">
              <h3>Ready to Join Our School Family?</h3>
              <p>Admissions are open! Contact us today to learn more about our free education program.</p>
              <div className="cta-buttons">
                <a href="#contact" className="btn btn-primary">Contact Admissions</a>
                <a href="/donate" className="btn btn-secondary">Support Our Mission</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

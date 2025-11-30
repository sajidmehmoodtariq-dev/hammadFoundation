import { useState } from 'react';
import HeroSlider from '../components/HeroSlider';
import './HomePage.css';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('mission');

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
            <div className="stat-card">
              <div className="stat-icon">👨‍🏫</div>
              <div className="stat-number" data-target="35">35+</div>
              <div className="stat-label">Qualified Staff</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">📚</div>
              <div className="stat-number" data-target="999">999+</div>
              <div className="stat-label">Current Enrollments</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">🎓</div>
              <div className="stat-number" data-target="999">999+</div>
              <div className="stat-label">Successful Graduates</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">⭐</div>
              <div className="stat-number" data-target="100">100%</div>
              <div className="stat-label">Free Education</div>
            </div>
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
                {/* Placeholder - Replace with actual director's image */}
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" 
                  alt="Director" 
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
              <p>
                Dear Students, Parents, and Well-wishers,
              </p>
              <p>
                It gives me immense pleasure to welcome you to Hammad Foundation School. 
                Education is the most powerful tool for changing the world, and at our school, 
                we are committed to providing that tool to every child, regardless of their 
                financial circumstances.
              </p>
              <p>
                Our dedicated faculty and staff work tirelessly to create a nurturing environment 
                where students can explore their talents, develop critical thinking skills, and 
                grow into responsible citizens. We believe in holistic education that develops 
                not just academic excellence but also character, creativity, and compassion.
              </p>
              <p>
                I invite you to join us in our mission to educate and empower the next generation. 
                Together, we can make a difference.
              </p>
              <p className="director-signature">
                <strong>— Director Name</strong><br />
                <em>Director, Hammad Foundation School</em>
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
            <div className="gallery-item">
              <img 
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80" 
                alt="Students in classroom" 
              />
              <div className="gallery-overlay">
                <h4>Interactive Learning</h4>
              </div>
            </div>

            <div className="gallery-item">
              <img 
                src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&q=80" 
                alt="Science lab activities" 
              />
              <div className="gallery-overlay">
                <h4>Science & Technology</h4>
              </div>
            </div>

            <div className="gallery-item">
              <img 
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80" 
                alt="Sports activities" 
              />
              <div className="gallery-overlay">
                <h4>Sports & Recreation</h4>
              </div>
            </div>

            <div className="gallery-item">
              <img 
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80" 
                alt="Library reading" 
              />
              <div className="gallery-overlay">
                <h4>Library Resources</h4>
              </div>
            </div>

            <div className="gallery-item">
              <img 
                src="https://images.unsplash.com/photo-1581726707445-75cbe4efc586?w=600&q=80" 
                alt="Art activities" 
              />
              <div className="gallery-overlay">
                <h4>Creative Arts</h4>
              </div>
            </div>

            <div className="gallery-item">
              <img 
                src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=600&q=80" 
                alt="Group activities" 
              />
              <div className="gallery-overlay">
                <h4>Team Building</h4>
              </div>
            </div>
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

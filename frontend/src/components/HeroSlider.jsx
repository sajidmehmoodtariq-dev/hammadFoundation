import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import './HeroSlider.css';

const HeroSlider = () => {
  const [slides, setSlides] = useState([
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1920&q=80',
      title: 'Welcome to Hammad Foundation School',
      subtitle: 'Empowering Future Leaders',
      description: 'Providing world-class education completely free of charge',
      badge: '100% Free Education'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1920&q=80',
      title: 'Excellence in Learning',
      subtitle: 'Building Tomorrow\'s Leaders',
      description: 'Nurturing young minds through innovative teaching methods',
      badge: 'Quality Education'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1920&q=80',
      title: 'Breaking Barriers',
      subtitle: 'Building Dreams',
      description: 'Every child deserves access to excellent education',
      badge: 'No Fees Required'
    }
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      const response = await fetch('https://hammad-foundation-beackend.vercel.app/api/content/slider');
      const data = await response.json();
      
      if (data.success && data.slides && data.slides.length > 0) {
        const formattedSlides = data.slides.map(slide => ({
          id: slide._id,
          image: slide.image_url,
          title: slide.title,
          subtitle: slide.subtitle,
          description: slide.description,
          badge: slide.badge
        }));
        setSlides(formattedSlides);
      }
    } catch (error) {
      console.error('Failed to load slides:', error);
      // Keep default slides if API fails
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="hero-slider" style={{ height: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f3f4f6' }}>
        <p style={{ fontSize: '1.2rem', color: '#666' }}>Loading...</p>
      </div>
    );
  }

  return (
    <div className="hero-slider">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        effect="fade"
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        loop={true}
        className="mySwiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="slide-content" style={{ backgroundImage: `url(${slide.image})` }}>
              <div className="slide-overlay">
                <div className="slide-inner">
                  <span className="slide-badge">{slide.badge}</span>
                  <h1 className="slide-title">{slide.title}</h1>
                  <h2 className="slide-subtitle">{slide.subtitle}</h2>
                  <p className="slide-description">{slide.description}</p>
                  <div className="slide-actions">
                    <Link to="/donate" className="btn btn-primary">
                      Support Our Mission
                    </Link>
                    <a href="#about" className="btn btn-secondary">
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;

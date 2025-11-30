import { useState } from 'react';
import './SliderManager.css';

const SliderManager = () => {
  const [slides, setSlides] = useState([
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=80',
      badge: 'FREE EDUCATION',
      title: 'Hammad Foundation School',
      subtitle: 'Empowering Through Education',
      description: 'Providing world-class education completely free of charge'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1200&q=80',
      badge: 'EXCELLENCE',
      title: 'Academic Excellence',
      subtitle: 'Quality Education For All',
      description: 'Nurturing minds with dedicated faculty and modern facilities'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&q=80',
      badge: 'FUTURE READY',
      title: 'Building Tomorrow',
      subtitle: 'Leaders of the Future',
      description: 'Preparing students for success in a changing world'
    }
  ]);

  const [editingSlide, setEditingSlide] = useState(null);
  const [formData, setFormData] = useState({});

  const handleEdit = (slide) => {
    setEditingSlide(slide.id);
    setFormData(slide);
  };

  const handleSave = () => {
    setSlides(slides.map(s => s.id === editingSlide ? formData : s));
    setEditingSlide(null);
    alert('Slide updated successfully!');
  };

  const handleCancel = () => {
    setEditingSlide(null);
    setFormData({});
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this slide?')) {
      setSlides(slides.filter(s => s.id !== id));
    }
  };

  const handleAddNew = () => {
    const newSlide = {
      id: Date.now(),
      image: '',
      badge: 'NEW',
      title: 'New Slide',
      subtitle: 'Subtitle',
      description: 'Description'
    };
    setSlides([...slides, newSlide]);
    handleEdit(newSlide);
  };

  return (
    <div className="slider-manager">
      <div className="manager-header">
        <h2>Manage Hero Slider</h2>
        <button className="btn-add" onClick={handleAddNew}>
          <span>➕</span> Add New Slide
        </button>
      </div>

      <div className="slides-grid">
        {slides.map((slide) => (
          <div key={slide.id} className="slide-card">
            {editingSlide === slide.id ? (
              <div className="slide-form">
                <div className="form-group">
                  <label>Image URL</label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="Enter image URL"
                  />
                </div>

                <div className="form-group">
                  <label>Badge Text</label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="e.g., FREE EDUCATION"
                  />
                </div>

                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Main title"
                  />
                </div>

                <div className="form-group">
                  <label>Subtitle</label>
                  <input
                    type="text"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    placeholder="Subtitle"
                  />
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Brief description"
                    rows="3"
                  />
                </div>

                <div className="form-actions">
                  <button className="btn-save" onClick={handleSave}>Save</button>
                  <button className="btn-cancel" onClick={handleCancel}>Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <div className="slide-preview">
                  <img src={slide.image} alt={slide.title} />
                  <div className="slide-badge">{slide.badge}</div>
                </div>
                <div className="slide-info">
                  <h3>{slide.title}</h3>
                  <h4>{slide.subtitle}</h4>
                  <p>{slide.description}</p>
                </div>
                <div className="slide-actions">
                  <button className="btn-edit" onClick={() => handleEdit(slide)}>
                    ✏️ Edit
                  </button>
                  <button className="btn-delete" onClick={() => handleDelete(slide.id)}>
                    🗑️ Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SliderManager;

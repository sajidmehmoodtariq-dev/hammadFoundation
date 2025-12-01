import { useState, useEffect } from 'react';
import { contentAPI, uploadAPI } from '../../../utils/api';
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
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Load slides from API
  useEffect(() => {
    loadSlides();
  }, []);

  const loadSlides = async () => {
    try {
      setLoading(true);
      const response = await contentAPI.getSlides();
      if (response.success) {
        setSlides(response.slides.map(s => ({
          id: s._id,
          image: s.image_url,
          badge: s.badge,
          title: s.title,
          subtitle: s.subtitle,
          description: s.description
        })));
      }
    } catch (error) {
      console.error('Failed to load slides:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    try {
      setUploading(true);
      const response = await uploadAPI.uploadImage(file);
      
      if (response.success) {
        setFormData({ ...formData, image: response.imageUrl });
        alert('Image uploaded successfully!');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (slide) => {
    setEditingSlide(slide.id);
    setFormData(slide);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      
      const slideData = {
        image_url: formData.image,
        badge: formData.badge,
        title: formData.title,
        subtitle: formData.subtitle,
        description: formData.description
      };

      if (editingSlide === 'new') {
        await contentAPI.createSlide(slideData);
      } else {
        await contentAPI.updateSlide(editingSlide, slideData);
      }

      await loadSlides();
      setEditingSlide(null);
      setFormData({});
      alert('Slide saved successfully!');
    } catch (error) {
      console.error('Save error:', error);
      alert('Failed to save slide: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditingSlide(null);
    setFormData({});
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this slide?')) {
      try {
        setLoading(true);
        await contentAPI.deleteSlide(id);
        await loadSlides();
        alert('Slide deleted successfully!');
      } catch (error) {
        console.error('Delete error:', error);
        alert('Failed to delete slide: ' + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleAddNew = () => {
    setFormData({
      id: 'new',
      image: '',
      badge: 'NEW',
      title: 'New Slide',
      subtitle: 'Subtitle',
      description: 'Description'
    });
    setEditingSlide('new');
  };

  if (loading && slides.length === 0) {
    return <div className="loading">Loading slides...</div>;
  }

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
                  <label>Image</label>
                  {formData.image && (
                    <div className="image-preview">
                      <img src={formData.image} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px' }} />
                    </div>
                  )}
                  <div className="upload-container">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploading}
                      id={`upload-${slide.id}`}
                      style={{ display: 'none' }}
                    />
                    <label htmlFor={`upload-${slide.id}`} className="btn-upload">
                      {uploading ? '📤 Uploading...' : '📁 Upload New Image'}
                    </label>
                    <small style={{ display: 'block', marginTop: '8px', color: '#666' }}>
                      Max size: 5MB. Previous image will be replaced.
                    </small>
                  </div>
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
                  <button className="btn-save" onClick={handleSave} disabled={loading || uploading || !formData.image}>
                    {loading ? 'Saving...' : 'Save'}
                  </button>
                  <button className="btn-cancel" onClick={handleCancel} disabled={loading}>Cancel</button>
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

import { useState, useEffect } from 'react';
import { contentAPI, uploadAPI } from '../../../utils/api';
import './DirectorEditor.css';

const DirectorEditor = () => {
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    title: '',
    image_url: '',
    message: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadDirector();
  }, []);

  const loadDirector = async () => {
    try {
      setLoading(true);
      const response = await contentAPI.getDirector();
      if (response.success && response.director) {
        setFormData({
          id: response.director._id,
          name: response.director.name,
          title: response.director.title,
          image_url: response.director.image_url,
          message: response.director.message
        });
      }
    } catch (error) {
      console.error('Failed to load director:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    if (file.size > 3 * 1024 * 1024) {
      alert('Image size should be less than 3MB');
      return;
    }

    try {
      setUploading(true);
      const response = await uploadAPI.uploadImage(file);
      
      if (response.success) {
        setFormData({ ...formData, image_url: response.imageUrl });
        alert('Image uploaded successfully!');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const directorData = {
        name: formData.name,
        title: formData.title,
        image_url: formData.image_url,
        message: formData.message
      };

      await contentAPI.updateDirector(formData.id, directorData);
      
      setIsEditing(false);
      alert('Director information updated successfully!');
      await loadDirector();
    } catch (error) {
      console.error('Save error:', error);
      alert('Failed to save: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="director-editor">
      <div className="editor-header">
        <h2>Director's Message</h2>
        {!isEditing ? (
          <button className="btn-edit-mode" onClick={() => setIsEditing(true)}>
            ✏️ Edit
          </button>
        ) : (
          <div className="btn-group">
            <button className="btn-save" onClick={handleSave} disabled={loading || uploading}>
              {loading ? '💾 Saving...' : '💾 Save Changes'}
            </button>
            <button className="btn-cancel" onClick={() => setIsEditing(false)}>
              ❌ Cancel
            </button>
          </div>
        )}
      </div>

      <div className="editor-content">
        <div className="director-preview">
          <div className="image-section">
            <img src={formData.image_url} alt="Director" />
            {isEditing && (
              <div className="image-edit">
                <label>Director Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  id="director-upload"
                  style={{ display: 'none' }}
                />
                <label htmlFor="director-upload" className="btn-upload">
                  {uploading ? '📤 Uploading...' : '📁 Upload New Image'}
                </label>
                <small style={{ display: 'block', marginTop: '8px', color: '#666' }}>
                  Max size: 3MB
                </small>
              </div>
            )}
          </div>

          <div className="info-section">
            {isEditing ? (
              <>
                <div className="form-group">
                  <label>Director Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter director name"
                  />
                </div>

                <div className="form-group">
                  <label>Title/Position</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter title"
                  />
                </div>

                <div className="form-group">
                  <label>Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows="15"
                    placeholder="Enter director's message"
                  />
                </div>
              </>
            ) : (
              <>
                <h3>{formData.name}</h3>
                <p className="title">{formData.title}</p>
                <div className="message">
                  {formData.message.split('\n\n').map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DirectorEditor;

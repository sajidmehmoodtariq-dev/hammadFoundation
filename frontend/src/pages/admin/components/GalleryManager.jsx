import { useState, useEffect } from 'react';
import { uploadAPI } from '../../../utils/api';
import './GalleryManager.css';

const GalleryManager = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      const response = await fetch('https://hammad-foundation-beackend.vercel.app/api/content/gallery');
      const data = await response.json();
      
      if (data.success && data.gallery) {
        setGalleryItems(data.gallery);
      }
    } catch (error) {
      console.error('Failed to load gallery items:', error);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setMessage('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingItem(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = async (e, itemId = null) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setMessage('Please select an image file');
      return;
    }

    if (file.size > 3 * 1024 * 1024) {
      setMessage('Image size should be less than 3MB');
      return;
    }

    try {
      setUploading(true);
      setMessage('Uploading image...');
      const response = await uploadAPI.uploadImage(file);
      
      if (response.success) {
        if (itemId) {
          // If editing existing item
          setEditingItem(prev => ({
            ...prev,
            image_url: response.imageUrl
          }));
        } else {
          // If editing in the form
          setEditingItem(prev => ({
            ...prev,
            image_url: response.imageUrl
          }));
        }
        setMessage('Image uploaded successfully!');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setMessage('Failed to upload image: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch(`https://hammad-foundation-beackend.vercel.app/api/content/gallery/${editingItem._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editingItem)
      });

      const data = await response.json();

      if (data.success) {
        setMessage('Gallery item updated successfully!');
        setEditingItem(null);
        fetchGalleryItems();
      } else {
        setMessage('Failed to update gallery item');
      }
    } catch (error) {
      setMessage('Error updating gallery item');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditingItem(null);
    setMessage('');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this gallery item?')) return;

    try {
      const response = await fetch(`https://hammad-foundation-beackend.vercel.app/api/content/gallery/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        setMessage('Gallery item deleted successfully!');
        fetchGalleryItems();
      } else {
        setMessage('Failed to delete gallery item');
      }
    } catch (error) {
      setMessage('Error deleting gallery item');
      console.error('Error:', error);
    }
  };

  const handleAdd = () => {
    // Create a new empty item for editing
    const newItem = {
      _id: 'new',
      image_url: '',
      title: 'New Gallery Item',
      display_order: galleryItems.length + 1,
      is_active: true
    };
    setEditingItem(newItem);
    setMessage('');
  };

  const handleSaveNew = async () => {
    if (!editingItem.image_url) {
      setMessage('Please upload an image first');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('https://hammad-foundation-beackend.vercel.app/api/content/gallery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image_url: editingItem.image_url,
          title: editingItem.title,
          display_order: editingItem.display_order,
          is_active: editingItem.is_active
        })
      });

      const data = await response.json();

      if (data.success) {
        setMessage('Gallery item added successfully!');
        setEditingItem(null);
        fetchGalleryItems();
      } else {
        setMessage('Failed to add gallery item');
      }
    } catch (error) {
      setMessage('Error adding gallery item');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="gallery-manager">
      <div className="manager-header">
        <h2>Admission Gallery Manager</h2>
        <button onClick={handleAdd} className="add-btn">
          ➕ Add New Item
        </button>
      </div>
      
      {message && <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>{message}</div>}
      
      <div className="gallery-items-grid">
        {editingItem && editingItem._id === 'new' && (
          <div key="new" className="gallery-card">
            <div className="edit-form">
              <div className="form-group">
                <label>Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                />
                {uploading && <p className="uploading-text">Uploading...</p>}
                {editingItem.image_url && (
                  <div className="image-preview">
                    <img src={editingItem.image_url} alt="Preview" />
                  </div>
                )}
              </div>
              
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  value={editingItem.title}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Display Order</label>
                <input
                  type="number"
                  name="display_order"
                  value={editingItem.display_order}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    name="is_active"
                    checked={editingItem.is_active}
                    onChange={(e) => setEditingItem(prev => ({
                      ...prev,
                      is_active: e.target.checked
                    }))}
                  />
                  Active
                </label>
              </div>

              <div className="form-actions">
                <button onClick={handleSaveNew} className="save-btn" disabled={loading || uploading || !editingItem.image_url}>
                  {loading ? 'Saving...' : '✓ Save'}
                </button>
                <button onClick={handleCancel} className="cancel-btn">
                  ✕ Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        
        {galleryItems.map((item) => (
          <div key={item._id} className="gallery-card">
            {editingItem && editingItem._id === item._id ? (
              <div className="edit-form">
                <div className="form-group">
                  <label>Upload Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                  />
                  {uploading && <p className="uploading-text">Uploading...</p>}
                  {editingItem.image_url && (
                    <div className="image-preview">
                      <img src={editingItem.image_url} alt="Preview" />
                    </div>
                  )}
                </div>
                
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    name="title"
                    value={editingItem.title}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Display Order</label>
                  <input
                    type="number"
                    name="display_order"
                    value={editingItem.display_order}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>
                    <input
                      type="checkbox"
                      name="is_active"
                      checked={editingItem.is_active}
                      onChange={(e) => setEditingItem(prev => ({
                        ...prev,
                        is_active: e.target.checked
                      }))}
                    />
                    Active
                  </label>
                </div>

                <div className="form-actions">
                  <button onClick={editingItem._id === 'new' ? handleSaveNew : handleSave} className="save-btn" disabled={loading || uploading}>
                    {loading ? 'Saving...' : '✓ Save'}
                  </button>
                  <button onClick={handleCancel} className="cancel-btn">
                    ✕ Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="gallery-preview">
                  <img src={item.image_url} alt={item.title} />
                  {!item.is_active && <div className="inactive-badge">Inactive</div>}
                </div>
                <div className="gallery-info">
                  <h4>{item.title}</h4>
                  <p className="order-badge">Order: {item.display_order}</p>
                </div>
                <div className="gallery-actions">
                  <button onClick={() => handleEdit(item)} className="edit-btn">
                    ✏️ Edit
                  </button>
                  <button onClick={() => handleDelete(item._id)} className="delete-btn">
                    🗑️ Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {galleryItems.length === 0 && (
        <div className="empty-state">
          <p>No gallery items found. Click "Add New Item" to get started.</p>
        </div>
      )}
    </div>
  );
};

export default GalleryManager;

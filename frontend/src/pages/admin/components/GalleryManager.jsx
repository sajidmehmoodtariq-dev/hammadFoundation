import { useState, useEffect } from 'react';
import './GalleryManager.css';

const GalleryManager = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(false);
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

  const handleAdd = async () => {
    const newItem = {
      image_url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80',
      title: 'New Gallery Item',
      display_order: galleryItems.length + 1,
      is_active: true
    };

    try {
      const response = await fetch('https://hammad-foundation-beackend.vercel.app/api/content/gallery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newItem)
      });

      const data = await response.json();

      if (data.success) {
        setMessage('Gallery item added successfully!');
        fetchGalleryItems();
      } else {
        setMessage('Failed to add gallery item');
      }
    } catch (error) {
      setMessage('Error adding gallery item');
      console.error('Error:', error);
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
        {galleryItems.map((item) => (
          <div key={item._id} className="gallery-card">
            {editingItem && editingItem._id === item._id ? (
              <div className="edit-form">
                <div className="form-group">
                  <label>Image URL</label>
                  <input
                    type="text"
                    name="image_url"
                    value={editingItem.image_url}
                    onChange={handleChange}
                  />
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
                  <button onClick={handleSave} className="save-btn" disabled={loading}>
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

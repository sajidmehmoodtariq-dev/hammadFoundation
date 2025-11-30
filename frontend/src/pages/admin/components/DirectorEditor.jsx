import { useState } from 'react';
import './DirectorEditor.css';

const DirectorEditor = () => {
  const [formData, setFormData] = useState({
    name: 'Director Name',
    title: 'Director, Hammad Foundation School',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    message: `Dear Students, Parents, and Well-wishers,

It gives me immense pleasure to welcome you to Hammad Foundation School. Education is the most powerful tool for changing the world, and at our school, we are committed to providing that tool to every child, regardless of their financial circumstances.

Our dedicated faculty and staff work tirelessly to create a nurturing environment where students can explore their talents, develop critical thinking skills, and grow into responsible citizens. We believe in holistic education that develops not just academic excellence but also character, creativity, and compassion.

I invite you to join us in our mission to educate and empower the next generation. Together, we can make a difference.`
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    alert('Director message updated successfully!');
    // TODO: Save to backend API
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
            <button className="btn-save" onClick={handleSave}>
              💾 Save Changes
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
            <img src={formData.image} alt="Director" />
            {isEditing && (
              <div className="image-edit">
                <label>Director Image URL</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="Enter image URL"
                />
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

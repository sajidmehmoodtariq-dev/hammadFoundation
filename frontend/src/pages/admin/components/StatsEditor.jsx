import { useState } from 'react';
import './StatsEditor.css';

const StatsEditor = () => {
  const [stats, setStats] = useState([
    { id: 1, icon: '👨‍🏫', number: '35+', label: 'Qualified Staff' },
    { id: 2, icon: '📚', number: '999+', label: 'Current Enrollments' },
    { id: 3, icon: '🎓', number: '999+', label: 'Successful Graduates' },
    { id: 4, icon: '⭐', number: '100%', label: 'Free Education' }
  ]);

  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});

  const handleEdit = (stat) => {
    setEditingId(stat.id);
    setFormData(stat);
  };

  const handleSave = () => {
    setStats(stats.map(s => s.id === editingId ? formData : s));
    setEditingId(null);
    alert('Statistics updated successfully!');
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({});
  };

  return (
    <div className="stats-editor">
      <div className="editor-header">
        <h2>Edit Statistics</h2>
        <p className="help-text">Update the numbers shown in "Our School at a Glance" section</p>
      </div>

      <div className="stats-grid-editor">
        {stats.map((stat) => (
          <div key={stat.id} className="stat-edit-card">
            {editingId === stat.id ? (
              <div className="stat-form">
                <div className="form-group">
                  <label>Icon (Emoji)</label>
                  <input
                    type="text"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    placeholder="e.g., 👨‍🏫"
                  />
                </div>

                <div className="form-group">
                  <label>Number/Value</label>
                  <input
                    type="text"
                    value={formData.number}
                    onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                    placeholder="e.g., 35+"
                  />
                </div>

                <div className="form-group">
                  <label>Label</label>
                  <input
                    type="text"
                    value={formData.label}
                    onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                    placeholder="e.g., Qualified Staff"
                  />
                </div>

                <div className="form-actions">
                  <button className="btn-save" onClick={handleSave}>Save</button>
                  <button className="btn-cancel" onClick={handleCancel}>Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <div className="stat-preview">
                  <div className="stat-icon">{stat.icon}</div>
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
                <button className="btn-edit" onClick={() => handleEdit(stat)}>
                  ✏️ Edit
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsEditor;

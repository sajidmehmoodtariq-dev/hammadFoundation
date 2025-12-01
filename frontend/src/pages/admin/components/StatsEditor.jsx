import { useState, useEffect } from 'react';
import { contentAPI } from '../../../utils/api';
import './StatsEditor.css';

const StatsEditor = () => {
  const [stats, setStats] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      const response = await contentAPI.getStats();
      if (response.success && response.stats) {
        setStats(response.stats.map(s => ({
          id: s._id,
          icon: s.icon,
          number: s.number,
          label: s.label
        })));
      }
    } catch (error) {
      console.error('Failed to load stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (stat) => {
    setEditingId(stat.id);
    setFormData(stat);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const statData = {
        icon: formData.icon,
        number: formData.number,
        label: formData.label
      };

      await contentAPI.updateStat(editingId, statData);
      
      await loadStats();
      setEditingId(null);
      setFormData({});
      alert('Statistics updated successfully!');
    } catch (error) {
      console.error('Save error:', error);
      alert('Failed to save: ' + error.message);
    } finally {
      setLoading(false);
    }
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
                  <button className="btn-save" onClick={handleSave} disabled={loading}>
                    {loading ? 'Saving...' : 'Save'}
                  </button>
                  <button className="btn-cancel" onClick={handleCancel} disabled={loading}>Cancel</button>
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

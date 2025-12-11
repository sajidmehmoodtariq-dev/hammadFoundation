import { useState, useEffect } from 'react';
import { contentAPI } from '../../../utils/api';
import './BankDetailsEditor.css';

const BankDetailsEditor = () => {
  const [bankDetails, setBankDetails] = useState({
    id: null,
    account_title: '',
    account_number: '',
    bank_name: '',
    branch_code: '',
    branch_name: '',
    iban: '',
    swift_code: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(bankDetails);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadBankDetails();
  }, []);

  const loadBankDetails = async () => {
    try {
      setLoading(true);
      const response = await contentAPI.getBank();
      if (response.success && response.bank) {
        const details = {
          id: response.bank._id,
          account_title: response.bank.account_title,
          account_number: response.bank.account_number,
          bank_name: response.bank.bank_name,
          branch_code: response.bank.branch_code || '',
          branch_name: response.bank.branch_name || '',
          iban: response.bank.iban || '',
          swift_code: response.bank.swift_code || ''
        };
        setBankDetails(details);
        setFormData(details);
      }
    } catch (error) {
      console.error('Failed to load bank details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const bankData = {
        account_title: formData.account_title,
        account_number: formData.account_number,
        bank_name: formData.bank_name,
        branch_code: formData.branch_code,
        branch_name: formData.branch_name,
        iban: formData.iban,
        swift_code: formData.swift_code
      };

      await contentAPI.updateBank(formData.id, bankData);
      
      setBankDetails(formData);
      setIsEditing(false);
      alert('Bank details updated successfully!');
      await loadBankDetails();
    } catch (error) {
      console.error('Save error:', error);
      alert('Failed to save: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData(bankDetails);
    setIsEditing(false);
  };

  return (
    <div className="bank-editor">
      <div className="editor-header">
        <h2>Bank Transfer Details</h2>
        <p className="help-text">Update bank account information shown on donation page</p>
        {!isEditing ? (
          <button className="btn-edit-mode" onClick={() => setIsEditing(true)} disabled={loading}>
            ✏️ Edit Details
          </button>
        ) : (
          <div className="btn-group">
            <button className="btn-save" onClick={handleSave} disabled={loading}>
              {loading ? '💾 Saving...' : '💾 Save Changes'}
            </button>
            <button className="btn-cancel" onClick={handleCancel} disabled={loading}>
              ❌ Cancel
            </button>
          </div>
        )}
      </div>

      <div className="bank-details-container">
        {isEditing ? (
          <div className="bank-form">
            <div className="form-row">
              <div className="form-group">
                <label>Account Title</label>
                <input
                  type="text"
                  value={formData.account_title}
                  onChange={(e) => setFormData({ ...formData, account_title: e.target.value })}
                  placeholder="Account holder name"
                />
              </div>

              <div className="form-group">
                <label>Account Number</label>
                <input
                  type="text"
                  value={formData.account_number}
                  onChange={(e) => setFormData({ ...formData, account_number: e.target.value })}
                  placeholder="16-digit account number"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Bank Name</label>
                <input
                  type="text"
                  value={formData.bank_name}
                  onChange={(e) => setFormData({ ...formData, bank_name: e.target.value })}
                  placeholder="Bank name"
                />
              </div>

              <div className="form-group">
                <label>Branch Code</label>
                <input
                  type="text"
                  value={formData.branch_code}
                  onChange={(e) => setFormData({ ...formData, branch_code: e.target.value })}
                  placeholder="4-digit branch code"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Branch Name/Address</label>
              <input
                type="text"
                value={formData.branch_name}
                onChange={(e) => setFormData({ ...formData, branch_name: e.target.value })}
                placeholder="Branch location"
              />
            </div>

            <div className="form-group">
              <label>IBAN (Optional)</label>
              <input
                type="text"
                value={formData.iban}
                onChange={(e) => setFormData({ ...formData, iban: e.target.value })}
                placeholder="International Bank Account Number"
              />
            </div>

            <div className="form-group">
              <label>Swift Code (Optional)</label>
              <input
                type="text"
                value={formData.swift_code}
                onChange={(e) => setFormData({ ...formData, swift_code: e.target.value })}
                placeholder="BIC/SWIFT Code for international transfers"
              />
            </div>
          </div>
        ) : (
          <div className="bank-preview">
            <div className="bank-card">
              <div className="card-header">
                <span className="card-icon">🏦</span>
                <h3>Bank Account Details</h3>
              </div>
              
              <div className="detail-row">
                <span className="detail-label">Account Title:</span>
                <span className="detail-value">{bankDetails.account_title}</span>
              </div>

              <div className="detail-row">
                <span className="detail-label">Account Number:</span>
                <span className="detail-value">{bankDetails.account_number}</span>
              </div>

              <div className="detail-row">
                <span className="detail-label">Bank Name:</span>
                <span className="detail-value">{bankDetails.bank_name}</span>
              </div>

              {bankDetails.branch_code && (
                <div className="detail-row">
                  <span className="detail-label">Branch Code:</span>
                  <span className="detail-value">{bankDetails.branch_code}</span>
                </div>
              )}

              {bankDetails.branch_name && (
                <div className="detail-row">
                  <span className="detail-label">Branch:</span>
                  <span className="detail-value">{bankDetails.branch_name}</span>
                </div>
              )}

              {bankDetails.iban && (
                <div className="detail-row">
                  <span className="detail-label">IBAN:</span>
                  <span className="detail-value">{bankDetails.iban}</span>
                </div>
              )}

              {bankDetails.swift_code && (
                <div className="detail-row">
                  <span className="detail-label">Swift Code:</span>
                  <span className="detail-value">{bankDetails.swift_code}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BankDetailsEditor;

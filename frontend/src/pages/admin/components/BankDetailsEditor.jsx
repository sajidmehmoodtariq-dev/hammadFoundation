import { useState } from 'react';
import './BankDetailsEditor.css';

const BankDetailsEditor = () => {
  const [bankDetails, setBankDetails] = useState({
    accountTitle: 'Hammad Foundation School',
    accountNumber: '1234567890123456',
    bankName: 'Allied Bank Limited',
    branchCode: '0123',
    branchName: 'Main Branch, City Name',
    iban: 'PK12ABCD0000001234567890'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(bankDetails);

  const handleSave = () => {
    setBankDetails(formData);
    setIsEditing(false);
    alert('Bank details updated successfully!');
    // TODO: Save to backend API
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
          <button className="btn-edit-mode" onClick={() => setIsEditing(true)}>
            ✏️ Edit Details
          </button>
        ) : (
          <div className="btn-group">
            <button className="btn-save" onClick={handleSave}>
              💾 Save Changes
            </button>
            <button className="btn-cancel" onClick={handleCancel}>
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
                  value={formData.accountTitle}
                  onChange={(e) => setFormData({ ...formData, accountTitle: e.target.value })}
                  placeholder="Account holder name"
                />
              </div>

              <div className="form-group">
                <label>Account Number</label>
                <input
                  type="text"
                  value={formData.accountNumber}
                  onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                  placeholder="16-digit account number"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Bank Name</label>
                <input
                  type="text"
                  value={formData.bankName}
                  onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                  placeholder="Bank name"
                />
              </div>

              <div className="form-group">
                <label>Branch Code</label>
                <input
                  type="text"
                  value={formData.branchCode}
                  onChange={(e) => setFormData({ ...formData, branchCode: e.target.value })}
                  placeholder="4-digit branch code"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Branch Name/Address</label>
              <input
                type="text"
                value={formData.branchName}
                onChange={(e) => setFormData({ ...formData, branchName: e.target.value })}
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
                <span className="detail-value">{bankDetails.accountTitle}</span>
              </div>

              <div className="detail-row">
                <span className="detail-label">Account Number:</span>
                <span className="detail-value">{bankDetails.accountNumber}</span>
              </div>

              <div className="detail-row">
                <span className="detail-label">Bank Name:</span>
                <span className="detail-value">{bankDetails.bankName}</span>
              </div>

              <div className="detail-row">
                <span className="detail-label">Branch Code:</span>
                <span className="detail-value">{bankDetails.branchCode}</span>
              </div>

              <div className="detail-row">
                <span className="detail-label">Branch:</span>
                <span className="detail-value">{bankDetails.branchName}</span>
              </div>

              {bankDetails.iban && (
                <div className="detail-row">
                  <span className="detail-label">IBAN:</span>
                  <span className="detail-value">{bankDetails.iban}</span>
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

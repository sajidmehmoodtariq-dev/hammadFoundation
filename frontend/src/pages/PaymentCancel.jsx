import { useNavigate } from 'react-router-dom';
import './PaymentResult.css';

const PaymentCancel = () => {
  const navigate = useNavigate();

  return (
    <div className="payment-result-page">
      <div className="result-container">
        <div className="cancel-icon">
          <div className="cross">✕</div>
        </div>
        
        <h1>Payment Cancelled</h1>
        <p className="result-message">
          Your donation payment was cancelled. No charges have been made to your account.
        </p>

        <div className="result-details">
          <div className="detail-card">
            <span className="detail-icon">💡</span>
            <p>If you experienced any issues during the payment process, please try again or contact our support team.</p>
          </div>
          <div className="detail-card">
            <span className="detail-icon">📞</span>
            <p>Need help? Contact us at donations@hammadfoundation.edu.pk</p>
          </div>
        </div>

        <div className="action-buttons">
          <button onClick={() => navigate('/donate')} className="btn btn-primary">
            Try Again
          </button>
          <button onClick={() => navigate('/')} className="btn btn-secondary">
            Return to Home
          </button>
        </div>

        <div className="help-section">
          <h3>Other Ways to Donate</h3>
          <p>You can also donate via bank transfer. Visit our donation page for details.</p>
          <button onClick={() => navigate('/donate')} className="btn-link">
            View Bank Details →
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;

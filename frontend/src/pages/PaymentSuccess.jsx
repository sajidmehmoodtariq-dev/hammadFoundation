import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './PaymentResult.css';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const transactionId = searchParams.get('transaction_id');

  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);

    // Optional: Verify payment status with backend
    if (transactionId) {
      const apiUrl = 'http://localhost:3000';
      
      fetch(`${apiUrl}/api/payment/status/${transactionId}`)
        .then(res => res.json())
        .then(data => {
          console.log('Payment verified:', data);
        })
        .catch(err => {
          console.error('Verification error:', err);
        });
    }
  }, [transactionId]);

  return (
    <div className="payment-result-page">
      <div className="result-container">
        <div className="success-icon">
          <div className="checkmark">✓</div>
        </div>
        
        <h1>Payment Successful!</h1>
        <p className="result-message">
          Thank you for your generous donation to Hammad Foundation School.
          Your contribution will help us continue providing free education to deserving students.
        </p>

        {transactionId && (
          <div className="transaction-info">
            <p><strong>Transaction ID:</strong></p>
            <p className="transaction-id">{transactionId}</p>
          </div>
        )}

        <div className="result-details">
          <div className="detail-card">
            <span className="detail-icon">📧</span>
            <p>A confirmation email has been sent to your registered email address.</p>
          </div>
          <div className="detail-card">
            <span className="detail-icon">🧾</span>
            <p>Your donation receipt will be generated shortly for your records.</p>
          </div>
        </div>

        <div className="action-buttons">
          <button onClick={() => navigate('/')} className="btn btn-primary">
            Return to Home
          </button>
          <button onClick={() => navigate('/donate')} className="btn btn-secondary">
            Make Another Donation
          </button>
        </div>

        <div className="social-share">
          <p>Help us spread the word:</p>
          <div className="share-buttons">
            <button className="share-btn">📱 Share on Facebook</button>
            <button className="share-btn">🐦 Share on Twitter</button>
            <button className="share-btn">📧 Share via Email</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;

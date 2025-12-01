import { useState } from 'react';
import './DonatePage.css';

const DonatePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    amount: '',
    message: '',
    currency: 'PKR'
  });

  const currencies = {
    PKR: { symbol: 'Rs.', label: 'PKR (Pakistani Rupee)', amounts: [1000, 5000, 10000, 25000] },
    USD: { symbol: '$', label: 'USD (US Dollar)', amounts: [10, 50, 100, 250] },
    EUR: { symbol: '€', label: 'EUR (Euro)', amounts: [10, 50, 100, 200] },
    SAR: { symbol: 'SR', label: 'SAR (Saudi Riyal)', amounts: [50, 200, 400, 1000] }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCurrencyChange = (e) => {
    setFormData({
      ...formData,
      currency: e.target.value,
      amount: '' // Reset amount when currency changes
    });
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://your-backend-app.vercel.app';
      
      const response = await fetch(`${apiUrl}/api/payment/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success && data.paymentUrl) {
        // Redirect to PayPro payment page
        window.location.href = data.paymentUrl;
      } else {
        setError(data.message || 'Failed to create payment. Please try again.');
      }
    } catch (err) {
      console.error('Payment Error:', err);
      setError('Unable to connect to payment server. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="donate-page">
      {/* Free Education Banner */}
      <section className="free-education-banner">
        <div className="container">
          <h1>🎓 We Provide 100% Free Education</h1>
          <p>
            Every child at Hammad Foundation School receives quality education completely free of charge.
            Your generous donations help us continue this mission and reach more deserving students.
          </p>
        </div>
      </section>

      {/* Why Donate Section */}
      <section className="why-donate">
        <div className="container">
          <h2>Why Your Donation Matters</h2>
          <div className="impact-grid">
            <div className="impact-card">
              <div className="impact-icon">📚</div>
              <h3>Books & Supplies</h3>
              <p>Provide textbooks, notebooks, and learning materials for students</p>
            </div>
            <div className="impact-card">
              <div className="impact-icon">👨‍🏫</div>
              <h3>Quality Teachers</h3>
              <p>Support qualified educators who nurture young minds</p>
            </div>
            <div className="impact-card">
              <div className="impact-icon">🏫</div>
              <h3>Infrastructure</h3>
              <p>Maintain and improve school facilities and classrooms</p>
            </div>
            <div className="impact-card">
              <div className="impact-icon">💻</div>
              <h3>Technology</h3>
              <p>Equip students with modern computers and digital resources</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Donation Section */}
      <section className="donation-section">
        <div className="container">
          <div className="donation-content">
            {/* Bank Details */}
            <div className="bank-details-card">
              <h2>Bank Transfer Details</h2>
              <p className="bank-intro">You can also donate directly to our bank account:</p>
              
              <div className="bank-info">
                <div className="info-row">
                  <span className="label">Bank Name:</span>
                  <span className="value">[Bank Name Here]</span>
                </div>
                <div className="info-row">
                  <span className="label">Account Title:</span>
                  <span className="value">Hammad Foundation School</span>
                </div>
                <div className="info-row">
                  <span className="label">Account Number:</span>
                  <span className="value">[Account Number Here]</span>
                </div>
                <div className="info-row">
                  <span className="label">IBAN:</span>
                  <span className="value">[IBAN Number Here]</span>
                </div>
                <div className="info-row">
                  <span className="label">Branch Code:</span>
                  <span className="value">[Branch Code Here]</span>
                </div>
              </div>

              <div className="bank-note">
                <p>
                  <strong>Note:</strong> After making a bank transfer, please send us the 
                  transaction details via email at <a href="mailto:donations@hammadfoundation.edu.pk">
                  donations@hammadfoundation.edu.pk</a> so we can acknowledge your contribution.
                </p>
              </div>
            </div>

            {/* Online Donation Form */}
            <div className="donation-form-card">
              <h2>Donate Online with PayPro</h2>
              <p className="form-intro">Make a secure online donation using your credit/debit card</p>
              
              {error && (
                <div className="error-alert">
                  <span className="error-icon">⚠️</span>
                  <span>{error}</span>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="donation-form">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+92 XXX XXXXXXX"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="currency">Currency *</label>
                  <select
                    id="currency"
                    name="currency"
                    value={formData.currency}
                    onChange={handleCurrencyChange}
                    className="currency-select"
                  >
                    {Object.entries(currencies).map(([code, data]) => (
                      <option key={code} value={code}>
                        {data.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="amount">Donation Amount ({formData.currency}) *</label>
                  <div className="amount-input-wrapper">
                    <span className="currency-symbol">{currencies[formData.currency].symbol}</span>
                    <input
                      type="number"
                      id="amount"
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                      required
                      min="1"
                      placeholder="Enter amount"
                      className="amount-input"
                    />
                  </div>
                </div>

                <div className="quick-amounts">
                  {currencies[formData.currency].amounts.map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setFormData({...formData, amount: amt.toString()})}
                      className="amount-btn"
                    >
                      {currencies[formData.currency].symbol} {amt.toLocaleString()}
                    </button>
                  ))}
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message (Optional)</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Leave a message or dedication..."
                  />
                </div>

                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? (
                    <>
                      <span className="spinner"></span>
                      Processing...
                    </>
                  ) : (
                    'Proceed to Payment'
                  )}
                </button>

                <div className="paypro-info">
                  <p>
                    <strong>Secure Payment by PayPro</strong><br />
                    Your payment is processed securely through PayPro's encrypted payment gateway.
                    We accept all major credit and debit cards.
                  </p>
                  <div className="payment-methods">
                    <span>💳 Visa</span>
                    <span>💳 Mastercard</span>
                    <span>💳 JazzCash</span>
                    <span>💳 EasyPaisa</span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Tax Deductible Section */}
      <section className="tax-info">
        <div className="container">
          <div className="tax-card">
            <h3>Tax Deductible Donations</h3>
            <p>
              Hammad Foundation School is a registered non-profit organization. 
              Your donations may be tax-deductible. Please consult with your tax advisor 
              for more information. We will provide a donation receipt for your records.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="donate-contact">
        <div className="container">
          <h2>Questions About Donating?</h2>
          <p>
            If you have any questions about making a donation or would like to discuss 
            other ways to support our mission, please contact us:
          </p>
          <div className="contact-info">
            <p>📧 Email: donations@hammadfoundation.edu.pk</p>
            <p>📞 Phone: +92 XXX XXXXXXX</p>
            <p>🕒 Office Hours: Monday - Friday, 9:00 AM - 5:00 PM</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DonatePage;

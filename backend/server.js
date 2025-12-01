const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const connectDB = require('./config/database');
const { initDatabase } = require('./config/initDatabase');
const { seedDatabase } = require('./config/seedDatabase');
const Donation = require('./models/Donation');

// Import routes
const adminRoutes = require('./routes/admin');
const donationRoutes = require('./routes/donations');
const contentRoutes = require('./routes/content');

const app = express();

// CORS configuration for Vercel and cPanel
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// PayPro Configuration
const PAYPRO_CONFIG = {
  baseUrl: process.env.PAYPRO_BASE_URL || 'https://demoapi.paypro.com.pk',
  // CRITICAL FIX: For ConnectPay (cpay), MerchantId is usually the Username (e.g., HGHS)
  merchantId: process.env.PAYPRO_USERNAME, 
  password: process.env.PAYPRO_PASSWORD
};

// Helper: Format Date as yyyy-MM-dd (Standard PayPro API format)
// Note: If this fails, try dd/MM/yyyy, but yyyy-MM-dd is officially documented
function getFormattedDate(date) {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
}

// Helper: Sanitize Phone Number (Must be 03xxxxxxxxx)
function sanitizePhone(phone) {
  if (!phone) return '03000000000';
  // Remove spaces, dashes, plus signs
  let clean = phone.replace(/[\s\-\+]/g, '');
  // Convert 923... to 03...
  if (clean.startsWith('92')) {
    clean = '0' + clean.substring(2);
  }
  return clean;
}

// API Routes
app.use('/api/admin', adminRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/content', contentRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Payment creation endpoint
app.post('/api/payment/create', async (req, res) => {
  try {
    const { name, email, phone, amount, message, currency } = req.body;

    const issueDate = new Date();
    const dueDate = new Date();
    dueDate.setDate(issueDate.getDate() + 10);

    const orderNumber = `ORD-${Date.now()}`;

    // Create donation record
    const donation = await Donation.create({
      order_number: orderNumber,
      donor_name: name,
      donor_email: email,
      donor_phone: phone,
      amount: parseFloat(amount),
      currency: currency || 'PKR',
      message: message || '',
      payment_status: 'pending'
    });

    const payloadArray = [
      {
        "MerchantId": PAYPRO_CONFIG.merchantId, // Must be 'HGHS' (or your short ID), NOT the long ClientID
        "MerchantPassword": PAYPRO_CONFIG.password
      },
      {
        "OrderNumber": orderNumber,
        "OrderAmount": String(amount),
        "OrderDueDate": getFormattedDate(dueDate),
        "OrderType": "Service",
        "IssueDate": getFormattedDate(issueDate),
        "OrderExpireAfterSeconds": "0",
        "CustomerName": name,
        "CustomerMobile": sanitizePhone(phone),
        "CustomerEmail": email || "no-email@test.com",
        "CustomerAddress": "Online Donation"
      }
    ];

    const jsonOrder = JSON.stringify(payloadArray);
    
    // Log the EXACT request we are making
    const requestUrl = `${PAYPRO_CONFIG.baseUrl}/cpay/co?oJson=${encodeURIComponent(jsonOrder)}`;
    
    console.log('🔄 Sending Request to:', PAYPRO_CONFIG.baseUrl);
    console.log('📦 Merchant ID Used:', PAYPRO_CONFIG.merchantId);
    console.log('📱 Phone Sent:', sanitizePhone(phone));

    // Send POST request
    // Note: We send an empty object {} as body because the data is in the URL query string.
    const response = await axios.post(requestUrl, {}, {
        headers: {
            'Content-Type': 'application/json' // Helps server understand the empty body
        }
    });

    const data = response.data;

    // Handle array response
    if (Array.isArray(data) && data.length > 0) {
      if (data[0].Status === "00") {
        // Update donation with transaction ID
        await Donation.findByIdAndUpdate(donation._id, {
          transaction_id: data[1].ConnectPayId
        });

        return res.json({
          success: true,
          paymentUrl: data[1].Click2Pay || data[1].PaymentUrl,
          transactionId: data[1].ConnectPayId,
          orderNumber: data[1].OrderNumber
        });
      } else {
        throw new Error(data[1]?.Description || data[0]?.Description || "Payment Rejected");
      }
    }

    // Fallback if response isn't an array
    throw new Error('Unexpected response format from PayPro');

  } catch (error) {
    console.error('❌ PayPro Error:', error.message);
    // If it's a 500 from axios, log the response data
    if (error.response) {
      console.error('🔍 Server Response:', error.response.data);
    }
    return res.status(500).json({
      success: false,
      message: 'Payment creation failed',
      error: error.message
    });
  }
});

// Payment status endpoint
app.get('/api/payment/status/:transactionId', async (req, res) => {
  try {
    const donation = await Donation.findOne({ 
      transaction_id: req.params.transactionId 
    });
    
    if (!donation) {
      return res.status(404).json({ 
        success: false, 
        message: 'Transaction not found' 
      });
    }
    
    res.json({ 
      success: true, 
      donation 
    });
  } catch (error) {
    console.error('Status check error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to check payment status' 
    });
  }
});

const PORT = process.env.PORT || 3000;

// Initialize database and start server
async function startServer() {
  try {
    await connectDB();
    await initDatabase();
    await seedDatabase();
    
    app.listen(PORT, () => {
      console.log(`\n🚀 Server running on port ${PORT}`);
      console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
      console.log(`💳 Environment: ${process.env.NODE_ENV || 'development'}\n`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

// Export for Vercel
module.exports = app;
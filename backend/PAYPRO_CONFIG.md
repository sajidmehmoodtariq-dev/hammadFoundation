# PayPro Configuration

## API Credentials

**Base URL:** `https://demoapi.PayPro.com.pk`

**Authentication:**
- Username: `HGHS`
- Password: `Demo@hg24`
- Client ID: `oefs8kVsS9b4QYo`
- Client Secret: `2ZpquzHvBtMvhao`

## Environment Variables

Add these to your `.env` file:

```env
PAYPRO_BASE_URL=https://demoapi.PayPro.com.pk
PAYPRO_USERNAME=HGHS
PAYPRO_PASSWORD=Demo@hg24
PAYPRO_CLIENT_ID=oefs8kVsS9b4QYo
PAYPRO_CLIENT_SECRET=2ZpquzHvBtMvhao
```

## API Endpoints

### Authentication
- **Get Access Token:** `POST /cpay/auth/`

### Payment Processing
- **Create Payment:** `POST /cpay/payment/`
- **Payment Status:** `GET /cpay/payment/{transaction_id}`
- **Payment Callback:** `POST /cpay/callback/`

## Implementation Status

✅ Credentials configured
⏳ Backend API integration pending
⏳ Payment flow implementation pending
⏳ Webhook handling pending

**Note:** This is a demo/sandbox environment. Use these credentials for testing only.

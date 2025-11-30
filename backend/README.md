# Hammad Foundation School - Backend

This folder will contain the Node.js/Express backend for the Hammad Foundation School website.

## Planned Features

### API Endpoints

1. **Donation Management**
   - POST `/api/donations` - Process donation submissions
   - GET `/api/donations` - Retrieve donation records (admin only)
   - PayPro integration for payment processing

2. **Contact Forms**
   - POST `/api/contact` - Handle contact form submissions
   - Email notifications to school staff

3. **Admin Panel**
   - POST `/api/auth/login` - Admin authentication
   - POST `/api/content/update` - Update website content
   - POST `/api/images/upload` - Upload hero slider images
   - GET `/api/images` - Retrieve uploaded images

### Technology Stack (Recommended)

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (with Mongoose) or PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer
- **Payment**: PayPro SDK/API
- **Email**: Nodemailer

### Environment Variables

Create a `.env` file with:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PAYPRO_MERCHANT_ID=your_paypro_merchant_id
PAYPRO_API_KEY=your_paypro_api_key
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_email_password
```

### Getting Started

1. Initialize the project:
```bash
cd backend
npm init -y
```

2. Install dependencies:
```bash
npm install express mongoose dotenv cors bcryptjs jsonwebtoken multer nodemailer
npm install --save-dev nodemon
```

3. Create basic server structure:
```
backend/
├── config/
│   ├── db.js              # Database connection
│   └── paypro.js          # PayPro configuration
├── controllers/
│   ├── donationController.js
│   ├── authController.js
│   └── contentController.js
├── middleware/
│   ├── auth.js            # JWT authentication
│   └── upload.js          # File upload middleware
├── models/
│   ├── Donation.js
│   ├── User.js
│   └── Content.js
├── routes/
│   ├── donations.js
│   ├── auth.js
│   └── content.js
├── .env
├── .gitignore
├── server.js              # Main server file
└── package.json
```

## To Be Implemented

This backend will be developed once:
1. PayPro merchant account credentials are received
2. Database choice is finalized
3. Hosting environment is selected
4. Admin panel requirements are defined

## Contact

For backend development questions, contact the development team.

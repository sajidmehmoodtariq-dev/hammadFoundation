# Hammad Foundation School Website

A complete website solution for Hammad Foundation School, featuring a modern React frontend with donation capabilities and a planned Node.js backend for content management.

## 🌟 Project Overview

Hammad Foundation School provides **100% free education** to students. This website showcases the school's mission, programs, and facilities while enabling online donations through PayPro integration.

## 📁 Project Structure

```
hammadFoundation/
├── frontend/          # React + Vite frontend application
│   ├── src/
│   │   ├── components/    # Reusable components (Navbar, Footer, HeroSlider)
│   │   ├── pages/         # Page components (Home, Donate)
│   │   └── assets/        # Images and static files
│   └── README.md
├── backend/           # Node.js backend (to be implemented)
│   └── README.md
└── README.md          # This file
```

## ✨ Features

### Current Features (Frontend)

- **🎨 Responsive Design**: Mobile-first approach, works on all devices
- **🖼️ Hero Image Slider**: Auto-rotating background images with customizable text
- **📚 School Information**: 
  - About Us with Mission & Vision tabs
  - Director's message with photo
  - Academic programs (Nursery, Primary, Middle, High School)
  - Student facilities showcase
- **💰 Donation Page**:
  - Prominent "100% Free Education" messaging
  - Bank transfer details display
  - Online donation form (PayPro ready)
  - Impact sections showing how donations help
- **🧭 Navigation**: Clean navbar with donate button
- **📧 Footer**: Contact information and quick links

### Planned Features (Backend)

- PayPro payment gateway integration
- Admin panel for content management
- Image upload system for staff
- Donation tracking and reporting
- Email notifications
- Database storage for donations

## 🚀 Quick Start

### Frontend Development

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Open browser at `http://localhost:5173`

### Customization

See `frontend/README.md` for detailed customization instructions including:
- Replacing hero slider images
- Updating school information
- Changing bank details
- Integrating PayPro
- Customizing colors and styling

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Swiper** - Image slider component
- **CSS3** - Styling with custom responsive design

### Backend (Planned)
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB/PostgreSQL** - Database
- **JWT** - Authentication
- **PayPro SDK** - Payment processing

## 📝 Customization Checklist

Before deployment, update the following:

- [ ] Replace hero slider images in `frontend/src/components/HeroSlider.jsx`
- [ ] Update school name and contact info in Navbar and Footer
- [ ] Add director's photo and message in `frontend/src/pages/HomePage.jsx`
- [ ] Update bank details in `frontend/src/pages/DonatePage.jsx`
- [ ] Add PayPro merchant credentials
- [ ] Replace all placeholder contact information
- [ ] Add real school images to `frontend/src/assets/images/`
- [ ] Update email addresses throughout the site
- [ ] Configure domain and hosting

## 🌐 Deployment

### Frontend Deployment

**Build for production:**
```bash
cd frontend
npm run build
```

**Deploy to Vercel (Recommended):**
```bash
npm install -g vercel
vercel
```

**Deploy to Netlify:**
```bash
npm install -g netlify-cli
netlify deploy
```

### Backend Deployment

Backend setup instructions will be added once:
1. PayPro credentials are obtained
2. Database is configured
3. Admin panel requirements are finalized

## 📦 Dependencies

### Frontend
- react
- react-dom
- react-router-dom
- swiper

### Development
- vite
- @vitejs/plugin-react
- eslint

## 🔐 Environment Setup

For production deployment, configure:

### Frontend
- Domain/subdomain for website
- Hosting service (Vercel/Netlify recommended)

### Backend (When Implemented)
- `.env` file with:
  - Database connection string
  - PayPro API credentials
  - JWT secret
  - Email service credentials
  - Server port

## 📖 Documentation

- [Frontend README](./frontend/README.md) - Detailed frontend documentation
- [Backend README](./backend/README.md) - Backend implementation guide

## 🤝 Contributing

This is a private project for Hammad Foundation School. For development questions or support, contact the development team.

## 📧 Contact

**Hammad Foundation School**
- Website: [To be deployed]
- Email: info@hammadfoundation.edu.pk
- Phone: +92 XXX XXXXXXX

## 📄 License

This project is proprietary and confidential for Hammad Foundation School.

---

**Development Status:** Frontend Complete ✅ | Backend Pending ⏳

**Last Updated:** November 30, 2025
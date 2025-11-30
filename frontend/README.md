# Hammad Foundation School Website - Frontend

A modern, responsive React website for Hammad Foundation School featuring an image slider, donation page with PayPro integration placeholder, and comprehensive school information.

## 🎯 Features

- **Hero Image Slider**: Auto-rotating background images with smooth transitions
- **Home Page Sections**:
  - School introduction with mission/vision tabs
  - Director's message with photo
  - Academic programs (Nursery & Kindergarten, Primary, Middle, High School)
  - Student facilities showcase
- **Donation Page**:
  - 100% Free Education banner
  - Bank transfer details
  - Online donation form (PayPro integration ready)
  - Impact section showing how donations help
- **Fully Responsive**: Mobile-first design that works on all devices
- **Modern UI**: Clean, professional design with smooth animations

## 📁 Project Structure

``` bash
frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Navigation bar with logo and links
│   │   ├── Navbar.css
│   │   ├── Footer.jsx          # Footer with contact info and links
│   │   ├── Footer.css
│   │   ├── HeroSlider.jsx      # Auto-rotating image slider
│   │   └── HeroSlider.css
│   ├── pages/
│   │   ├── HomePage.jsx        # Main landing page
│   │   ├── HomePage.css
│   │   ├── DonatePage.jsx      # Donation page with form
│   │   └── DonatePage.css
│   ├── assets/
│   │   └── images/             # Place your school images here
│   ├── App.jsx                 # Main app with routing
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and visit: `http://localhost:5173`

## 🎨 Customization Guide

### 1. Replace Hero Slider Images

Edit `src/components/HeroSlider.jsx`:

```javascript
const slides = [
  {
    id: 1,
    image: '/src/assets/images/school-1.jpg', // Replace with your images
    title: 'Your Custom Title',
    description: 'Your Custom Description'
  },
  // Add more slides...
];
```

Place your images in `src/assets/images/` folder.

### 2. Update School Information

**School Name & Contact**: Edit the following files:

- `src/components/Navbar.jsx` (line 10)
- `src/components/Footer.jsx` (lines 8-15)
- `src/pages/HomePage.jsx` (line 14)

**Director's Message**:

- Replace director image in `src/pages/HomePage.jsx` (line 64)
- Update director's name and message (lines 69-91)

### 3. Update Bank Details

Edit `src/pages/DonatePage.jsx` (lines 80-103):

```javascript
<div className="info-row">
  <span className="label">Bank Name:</span>
  <span className="value">Your Bank Name</span>
</div>
// Update other fields...
```

### 4. Integrate PayPro

When you receive PayPro credentials:

1. Install PayPro SDK (check PayPro documentation for exact package)
2. Update `src/pages/DonatePage.jsx` handleSubmit function
3. Add PayPro initialization with your merchant credentials
4. Implement payment redirect flow

### 5. Change Color Scheme

Main colors are defined in component CSS files:

- Primary Blue: `#1e3a8a`
- Accent Gold: `#fbbf24`
- Success Green: `#10b981`

Find and replace these color codes across CSS files to match your brand.

### 6. Add New Pages

1. Create new page component in `src/pages/`
2. Add route in `src/App.jsx`
3. Add navigation link in `src/components/Navbar.jsx`

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 968px
- Desktop: > 968px

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🌐 Deployment

### Build for Production

```bash
npm run build
```

This creates a `dist/` folder with optimized production files.

### Deployment Options

**Vercel** (Recommended):

```bash
npm install -g vercel
vercel
```

**Netlify**:

```bash
npm install -g netlify-cli
netlify deploy
```

## 📝 TODO - Backend Integration

When you're ready to add backend:

1. Create API endpoints for donation processing
2. Set up database for donation records
3. Implement admin panel for content management
4. Add image upload functionality for staff

## 📄 License

This project is proprietary and confidential for Hammad Foundation School.

---

**Note**: Remember to replace all placeholder content with actual school information before deploying.

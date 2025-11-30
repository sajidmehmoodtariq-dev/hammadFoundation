# Admin Panel - Hammad Foundation School

## Overview

The admin panel allows authorized staff to manage website content without touching code. Accessible at `/admin`.

## Features

### 1. **Hero Slider Management**

- Add/Edit/Delete slider images
- Configure for each slide:
  - Image URL
  - Badge text (e.g., "FREE EDUCATION")
  - Main title
  - Subtitle
  - Description text
  - CTA buttons

### 2. **Director's Message Editor**

- Update director's photo
- Edit director name and title
- Modify welcome message
- Real-time preview

### 3. **Statistics Editor**

- Edit all 4 stat cards:
  - Qualified Staff count
  - Current Enrollments
  - Graduates count
  - Free Education percentage
- Update icons and labels

### 4. **Bank Details Manager**

- Update donation page bank information:
  - Account title
  - Account number
  - Bank name and branch
  - Branch code
  - IBAN (optional)

## Access Credentials

**Default Login:**

- Username: `admin`
- Password: `admin123`

⚠️ **Important:** Change these credentials before production deployment!

## How to Use

### Accessing Admin Panel

1. Navigate to `http://localhost:5173/admin` or `http://localhost:5173/admin/login`
2. Enter credentials
3. Click "Login"

### Managing Content

#### Slider Management

1. Click "Hero Slider" in sidebar
2. To **edit** a slide:
   - Click "Edit" button on the slide card
   - Update fields as needed
   - Click "Save" to apply changes
3. To **delete** a slide:
   - Click "Delete" button
   - Confirm deletion
4. To **add** a new slide:
   - Click "Add New Slide" button
   - Fill in all fields
   - Click "Save"

#### Director Message

1. Click "Director Message" in sidebar
2. Click "Edit" button
3. Update any of the following:
   - Director's photo URL
   - Name
   - Title/Position
   - Welcome message
4. Click "Save Changes"

#### Statistics

1. Click "Statistics" in sidebar
2. Click "Edit" on any stat card
3. Modify:
   - Icon (emoji)
   - Number/value
   - Label text
4. Click "Save"

#### Bank Details

1. Click "Bank Details" in sidebar
2. Click "Edit Details"
3. Update required fields:
   - Account title
   - Account number
   - Bank name
   - Branch information
   - IBAN (optional)
4. Click "Save Changes"

### Logging Out

- Click the "Logout" button at the bottom of the sidebar
- You'll be redirected to the login page

## File Structure

```
frontend/src/
├── pages/
│   └── admin/
│       ├── AdminLogin.jsx          # Login page
│       ├── AdminLogin.css
│       ├── AdminDashboard.jsx      # Main dashboard layout
│       ├── AdminDashboard.css
│       └── components/
│           ├── SliderManager.jsx   # Slider editor
│           ├── SliderManager.css
│           ├── DirectorEditor.jsx  # Director message editor
│           ├── DirectorEditor.css
│           ├── StatsEditor.jsx     # Statistics editor
│           ├── StatsEditor.css
│           ├── BankDetailsEditor.jsx  # Bank details editor
│           └── BankDetailsEditor.css
├── components/
│   └── ProtectedRoute.jsx          # Authentication guard
└── App.jsx                          # Routes configuration
```

## Security Features

### Current Implementation (Development)

- Simple localStorage-based authentication
- Protected routes using `ProtectedRoute` component
- Session persists until logout

### Production Recommendations

1. **Backend Authentication:**
   - Implement JWT-based authentication
   - Use secure HTTP-only cookies
   - Add refresh token mechanism

2. **API Security:**
   - Add CSRF protection
   - Implement rate limiting
   - Use HTTPS only

3. **Password Security:**
   - Hash passwords with bcrypt
   - Implement password strength requirements
   - Add 2FA (Two-Factor Authentication)

4. **Access Control:**
   - Add role-based permissions
   - Implement audit logging
   - Add session timeout

## Backend Integration (TODO)

The admin panel is currently using mock data. To connect to a real backend:

### 1. Create Backend API

Create an Express server with endpoints:

```javascript
// Authentication
POST /api/auth/login
POST /api/auth/logout
GET /api/auth/verify

// Slider Management
GET /api/slider
POST /api/slider
PUT /api/slider/:id
DELETE /api/slider/:id

// Director
GET /api/director
PUT /api/director

// Statistics
GET /api/stats
PUT /api/stats

// Bank Details
GET /api/bank-details
PUT /api/bank-details

// File Upload
POST /api/upload
```

### 2. Update Frontend Components

Replace localStorage and mock data with API calls:

```javascript
// Example: SliderManager.jsx
const handleSave = async () => {
  try {
    const response = await fetch('/api/slider', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
      },
      body: JSON.stringify(formData)
    });
    
    if (response.ok) {
      // Update state
      alert('Slide updated successfully!');
    }
  } catch (error) {
    console.error('Error saving slide:', error);
  }
};
```

### 3. Data Persistence Options

**Option A: JSON Files** (Simple, good for small sites)

```javascript
const fs = require('fs').promises;
const dataPath = './data/content.json';

// Read
const data = await fs.readFile(dataPath, 'utf-8');
const content = JSON.parse(data);

// Write
await fs.writeFile(dataPath, JSON.stringify(content, null, 2));
```

**Option B: Database** (Recommended for production)

- MongoDB (Document-based, flexible)
- PostgreSQL (Relational, robust)
- SQLite (Lightweight, file-based)

## Responsive Design

The admin panel is fully responsive:

- **Desktop:** Full sidebar with labels
- **Tablet:** Icon-only sidebar
- **Mobile:** Horizontal navigation bar

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Troubleshooting

### Can't Login

- Verify credentials: `admin` / `admin123`
- Check browser console for errors
- Clear localStorage and try again

### Changes Not Saving

- Check browser console for errors
- Verify form fields are filled correctly
- Backend API may not be connected yet

### Images Not Loading

- Verify image URLs are accessible
- Check for CORS issues
- Use HTTPS URLs when possible

## Future Enhancements

1. **Image Upload:**
   - Direct file upload instead of URLs
   - Image optimization and compression
   - Cloud storage integration (AWS S3, Cloudinary)

2. **Rich Text Editor:**
   - WYSIWYG editor for director message
   - Formatting options (bold, italic, lists)
   - Preview mode

3. **Bulk Operations:**
   - Import/export content as JSON
   - Bulk image upload for slider
   - Content templates

4. **Analytics:**
   - View page statistics
   - Track donation conversions
   - User engagement metrics

5. **Content Scheduling:**
   - Schedule slider changes
   - Temporary announcements
   - Event management

6. **Multi-language Support:**
   - Urdu/English content management
   - Language switcher
   - RTL support

## Support

For technical assistance, contact the development team or refer to the main project README.

---

**Last Updated:** November 2025  
**Version:** 1.0.0

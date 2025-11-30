const db = require('../config/database');
const bcrypt = require('bcrypt');

async function seedDatabase() {
  try {
    // Check if admin user exists
    const [existingAdmin] = await db.query('SELECT id FROM admin_users WHERE username = ?', ['admin']);
    
    if (existingAdmin.length === 0) {
      // Create default admin user
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await db.query(
        'INSERT INTO admin_users (username, password, email) VALUES (?, ?, ?)',
        ['admin', hashedPassword, 'admin@hammadfoundationschool.org']
      );
      console.log('✅ Default admin user created');
    }

    // Check if slider images exist
    const [existingSlides] = await db.query('SELECT id FROM slider_images');
    
    if (existingSlides.length === 0) {
      // Insert default slider images
      const slides = [
        {
          image_url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=80',
          badge: 'FREE EDUCATION',
          title: 'Hammad Foundation School',
          subtitle: 'Empowering Through Education',
          description: 'Providing world-class education completely free of charge',
          display_order: 1
        },
        {
          image_url: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1200&q=80',
          badge: 'EXCELLENCE',
          title: 'Academic Excellence',
          subtitle: 'Quality Education For All',
          description: 'Nurturing minds with dedicated faculty and modern facilities',
          display_order: 2
        },
        {
          image_url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&q=80',
          badge: 'FUTURE READY',
          title: 'Building Tomorrow',
          subtitle: 'Leaders of the Future',
          description: 'Preparing students for success in a changing world',
          display_order: 3
        }
      ];

      for (const slide of slides) {
        await db.query(
          'INSERT INTO slider_images (image_url, badge, title, subtitle, description, display_order) VALUES (?, ?, ?, ?, ?, ?)',
          [slide.image_url, slide.badge, slide.title, slide.subtitle, slide.description, slide.display_order]
        );
      }
      console.log('✅ Default slider images created');
    }

    // Check if director info exists
    const [existingDirector] = await db.query('SELECT id FROM director_info');
    
    if (existingDirector.length === 0) {
      await db.query(
        'INSERT INTO director_info (name, title, image_url, message) VALUES (?, ?, ?, ?)',
        [
          'Director Name',
          'Director, Hammad Foundation School',
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
          `Dear Students, Parents, and Well-wishers,

It gives me immense pleasure to welcome you to Hammad Foundation School. Education is the most powerful tool for changing the world, and at our school, we are committed to providing that tool to every child, regardless of their financial circumstances.

Our dedicated faculty and staff work tirelessly to create a nurturing environment where students can explore their talents, develop critical thinking skills, and grow into responsible citizens. We believe in holistic education that develops not just academic excellence but also character, creativity, and compassion.

I invite you to join us in our mission to educate and empower the next generation. Together, we can make a difference.`
        ]
      );
      console.log('✅ Default director info created');
    }

    // Check if statistics exist
    const [existingStats] = await db.query('SELECT id FROM statistics');
    
    if (existingStats.length === 0) {
      const stats = [
        { stat_key: 'staff', icon: '👨‍🏫', number: '35+', label: 'Qualified Staff', display_order: 1 },
        { stat_key: 'enrollments', icon: '📚', number: '999+', label: 'Current Enrollments', display_order: 2 },
        { stat_key: 'graduates', icon: '🎓', number: '999+', label: 'Successful Graduates', display_order: 3 },
        { stat_key: 'free_education', icon: '⭐', number: '100%', label: 'Free Education', display_order: 4 }
      ];

      for (const stat of stats) {
        await db.query(
          'INSERT INTO statistics (stat_key, icon, number, label, display_order) VALUES (?, ?, ?, ?, ?)',
          [stat.stat_key, stat.icon, stat.number, stat.label, stat.display_order]
        );
      }
      console.log('✅ Default statistics created');
    }

    // Check if bank details exist
    const [existingBank] = await db.query('SELECT id FROM bank_details');
    
    if (existingBank.length === 0) {
      await db.query(
        'INSERT INTO bank_details (account_title, account_number, bank_name, branch_code, branch_name, iban) VALUES (?, ?, ?, ?, ?, ?)',
        [
          'Hammad Foundation School',
          '1234567890123456',
          'Allied Bank Limited',
          '0123',
          'Main Branch, City Name',
          'PK12ABCD0000001234567890'
        ]
      );
      console.log('✅ Default bank details created');
    }

    console.log('✅ Database seeding completed');
  } catch (error) {
    console.error('❌ Database seeding error:', error.message);
    throw error;
  }
}

module.exports = { seedDatabase };

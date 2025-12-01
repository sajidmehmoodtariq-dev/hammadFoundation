const AdminUser = require('../models/AdminUser');
const SliderImage = require('../models/SliderImage');
const DirectorInfo = require('../models/DirectorInfo');
const Statistic = require('../models/Statistic');
const BankDetail = require('../models/BankDetail');
const bcrypt = require('bcrypt');

async function seedDatabase() {
  try {
    // Check if admin user exists
    const existingAdmin = await AdminUser.findOne({ username: 'admin' });
    
    if (!existingAdmin) {
      // Create default admin user
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await AdminUser.create({
        username: 'admin',
        password: hashedPassword,
        email: 'admin@hammadfoundationschool.org'
      });
      console.log('✅ Default admin user created');
    }

    // Check if slider images exist
    const existingSlides = await SliderImage.countDocuments();
    
    if (existingSlides === 0) {
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

      await SliderImage.insertMany(slides);
      console.log('✅ Default slider images created');
    }

    // Check if director info exists
    const existingDirector = await DirectorInfo.countDocuments();
    
    if (existingDirector === 0) {
      await DirectorInfo.create({
        name: 'Director Name',
        title: 'Director, Hammad Foundation School',
        image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
        message: `Dear Students, Parents, and Well-wishers,

It gives me immense pleasure to welcome you to Hammad Foundation School. Education is the most powerful tool for changing the world, and at our school, we are committed to providing that tool to every child, regardless of their financial circumstances.

Our dedicated faculty and staff work tirelessly to create a nurturing environment where students can explore their talents, develop critical thinking skills, and grow into responsible citizens. We believe in holistic education that develops not just academic excellence but also character, creativity, and compassion.

I invite you to join us in our mission to educate and empower the next generation. Together, we can make a difference.`
      });
      console.log('✅ Default director info created');
    }

    // Check if statistics exist
    const existingStats = await Statistic.countDocuments();
    
    if (existingStats === 0) {
      const stats = [
        { stat_key: 'staff', icon: '👨‍🏫', number: '35+', label: 'Qualified Staff', display_order: 1 },
        { stat_key: 'enrollments', icon: '📚', number: '999+', label: 'Current Enrollments', display_order: 2 },
        { stat_key: 'graduates', icon: '🎓', number: '999+', label: 'Successful Graduates', display_order: 3 },
        { stat_key: 'free_education', icon: '⭐', number: '100%', label: 'Free Education', display_order: 4 }
      ];

      await Statistic.insertMany(stats);
      console.log('✅ Default statistics created');
    }

    // Check if bank details exist
    const existingBank = await BankDetail.countDocuments();
    
    if (existingBank === 0) {
      await BankDetail.create({
        account_title: 'Hammad Foundation School',
        account_number: '1234567890123456',
        bank_name: 'Allied Bank Limited',
        branch_code: '0123',
        branch_name: 'Main Branch, City Name',
        iban: 'PK12ABCD0000001234567890'
      });
      console.log('✅ Default bank details created');
    }

    console.log('✅ Database seeding completed');
  } catch (error) {
    console.error('❌ Database seeding error:', error.message);
    throw error;
  }
}

module.exports = { seedDatabase };

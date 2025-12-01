const AdminUser = require('../models/AdminUser');
const SliderImage = require('../models/SliderImage');
const DirectorInfo = require('../models/DirectorInfo');
const Statistic = require('../models/Statistic');
const BankDetail = require('../models/BankDetail');
const Donation = require('../models/Donation');

async function initDatabase() {
  try {
    // MongoDB automatically creates collections when documents are inserted
    // We just need to ensure indexes are created
    
    // Create unique indexes
    await AdminUser.createIndexes();
    await SliderImage.createIndexes();
    await DirectorInfo.createIndexes();
    await Statistic.createIndexes();
    await BankDetail.createIndexes();
    await Donation.createIndexes();

    console.log('✅ Database collections and indexes created successfully');
  } catch (error) {
    console.error('❌ Database initialization error:', error.message);
    throw error;
  }
}

module.exports = { initDatabase };

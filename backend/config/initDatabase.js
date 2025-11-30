const db = require('../config/database');

async function initDatabase() {
  try {
    // Create admin users table
    await db.query(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Create slider images table
    await db.query(`
      CREATE TABLE IF NOT EXISTS slider_images (
        id INT PRIMARY KEY AUTO_INCREMENT,
        image_url TEXT NOT NULL,
        badge VARCHAR(50),
        title VARCHAR(200) NOT NULL,
        subtitle VARCHAR(200),
        description TEXT,
        display_order INT DEFAULT 0,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Create director info table
    await db.query(`
      CREATE TABLE IF NOT EXISTS director_info (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        title VARCHAR(150) NOT NULL,
        image_url TEXT,
        message TEXT NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Create statistics table
    await db.query(`
      CREATE TABLE IF NOT EXISTS statistics (
        id INT PRIMARY KEY AUTO_INCREMENT,
        stat_key VARCHAR(50) UNIQUE NOT NULL,
        icon VARCHAR(10),
        number VARCHAR(20) NOT NULL,
        label VARCHAR(100) NOT NULL,
        display_order INT DEFAULT 0,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Create bank details table
    await db.query(`
      CREATE TABLE IF NOT EXISTS bank_details (
        id INT PRIMARY KEY AUTO_INCREMENT,
        account_title VARCHAR(150) NOT NULL,
        account_number VARCHAR(50) NOT NULL,
        bank_name VARCHAR(100) NOT NULL,
        branch_code VARCHAR(20),
        branch_name VARCHAR(150),
        iban VARCHAR(50),
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Create donations table
    await db.query(`
      CREATE TABLE IF NOT EXISTS donations (
        id INT PRIMARY KEY AUTO_INCREMENT,
        transaction_id VARCHAR(100) UNIQUE,
        donor_name VARCHAR(150) NOT NULL,
        donor_email VARCHAR(100) NOT NULL,
        donor_phone VARCHAR(20),
        amount DECIMAL(10, 2) NOT NULL,
        currency VARCHAR(10) NOT NULL,
        message TEXT,
        payment_status VARCHAR(20) DEFAULT 'pending',
        payment_method VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    console.log('✅ Database tables created successfully');
  } catch (error) {
    console.error('❌ Database initialization error:', error.message);
    throw error;
  }
}

module.exports = { initDatabase };

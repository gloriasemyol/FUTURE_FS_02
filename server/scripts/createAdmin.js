const dns = require('dns');
// Override Node's default DNS to use Google's DNS servers
dns.setServers(['8.8.8.8', '8.8.4.4']);

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB...');

    const username = 'admin'; // you can change this
    const plainPassword = 'admin123'; // 👉 CHANGE THIS to your own password

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log('⚠️ Admin already exists. No new admin created.');
      process.exit();
    }

    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const newAdmin = new User({
      username,
      password: hashedPassword,
    });

    await newAdmin.save();
    console.log('✅ Admin created successfully!');
    console.log(`Username: ${username}`);
    console.log(`Password: ${plainPassword} (remember this - it's now encrypted in the DB)`);
    process.exit();
  } catch (err) {
    console.error('❌ Error creating admin:', err);
    process.exit(1);
  }
};

createAdmin();
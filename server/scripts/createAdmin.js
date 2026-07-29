require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB...');

    const username = 'admin'; // change if you want
    const plainPassword = 'YOUR_PASSWORD_HERE'; // 👉 CHANGE THIS

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log('⚠️ Admin already exists. No new admin created.');
      process.exit();
    }

    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const newAdmin = new User({ username, password: hashedPassword });
    await newAdmin.save();

    console.log('✅ Admin created successfully!');
    console.log(`Username: ${username}`);
    process.exit();
  } catch (err) {
    console.error('❌ Error creating admin:', err);
    process.exit(1);
  }
};

createAdmin();
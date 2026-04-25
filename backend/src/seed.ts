import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/User';
import Business from './models/Business';

const seedAdmin = async () => {
  try {
    const adminEmail = 'admin@talknow.com';
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('Admin@123', 10);
      const admin = new User({
        name: 'Super Admin',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin'
      });
      await admin.save();
      console.log('Default admin created: admin@talknow.com / Admin@123');
    }
  } catch (err) {
    console.error('Error seeding admin:', err);
  }
};

export default seedAdmin;

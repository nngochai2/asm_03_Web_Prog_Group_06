const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the User schema -> connect with MongoDb collection 
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: String,
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  userRole: {
    type: String,
    enum: ['Customer', 'Vendor', 'Shipper'],
    required: true,
  },
});

// Hash the user's password before saving to the database
userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }

    // Hash the password with bcrypt 
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;

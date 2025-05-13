// backend/config.js
const mongoose = require('mongoose');
const envConfig = require('./env.config');

const connectDB = async () => {
  try {
    await mongoose.connect(envConfig.mongodbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

// Export configuration with fallbacks
module.exports = {
  port: envConfig.port || 3001,
  mongodbUri: envConfig.mongodbUri || 'mongodb://localhost:27017/meetai_db',
  jwtSecret: envConfig.jwtSecret || 'default_jwt_secret_key',
  smtp: {
    host: envConfig.smtp.host || 'smtp.gmail.com',
    port: envConfig.smtp.port || 587,
    secure: envConfig.smtp.secure || false,
    auth: {
      user: envConfig.smtp.auth.user,
      pass: envConfig.smtp.auth.pass
    }
  },
  clientUrl: envConfig.clientUrl || 'http://localhost:5173',
  connectDB
};

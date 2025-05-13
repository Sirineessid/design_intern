// Environment configuration
module.exports = {
  port: 3002,
  mongodbUri: 'mongodb://localhost:27017/meetai_db',
  jwtSecret: 'meetai_secret_key_123',
  smtp: {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'your_email@gmail.com',
      pass: 'your_app_specific_password'
    }
  },
  clientUrl: 'http://localhost:5173'
}; 
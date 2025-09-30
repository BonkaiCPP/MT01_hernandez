const mongoose = require('mongoose');

async function connectToDatabase(connectionString) {
  if (!connectionString) {
    throw new Error('MONGODB_URI is not set');
  }
  await mongoose.connect(connectionString);
  return mongoose.connection;
}

module.exports = { connectToDatabase };
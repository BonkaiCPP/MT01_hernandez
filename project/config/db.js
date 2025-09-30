const uri = "mongodb+srv://brhernandez_db_user:<Gwaposiroan112904.>@cluster0.nikpwj7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const mongoose = require('mongoose');

async function connectToDatabase(connectionString) {
  if (!connectionString) {
    throw new Error('MONGODB_URI is not set');
  }
  await mongoose.connect(connectionString);
  return mongoose.connection;
}

module.exports = { connectToDatabase };



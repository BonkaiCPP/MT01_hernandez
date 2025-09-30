const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { connectToDatabase } = require('./config/db');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || '';

app.use(cors());
app.use(express.json());

// Routes
const studentRoutes = require('./routes/studentRoutes');

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/students', studentRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

async function start() {
  try {
    if (!MONGODB_URI) {
      console.warn('MONGODB_URI is not set. Server will run but DB operations will fail.');
    } else {
      await connectToDatabase(MONGODB_URI);
      console.log('Connected to MongoDB');
    }
    app.listen(PORT, () => {
      console.log(`API server listening on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

start();



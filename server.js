require('dotenv').config();
const express = require('express');
const cors = require('cors');
const twilio = require('twilio');
const { createClient } = require('@supabase/supabase-js');
const { MongoClient } = require('mongodb');

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// Initialize clients
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

const mongoClient = new MongoClient(process.env.MONGODB_URI);
let db;

// Connect to MongoDB
mongoClient.connect().then(() => {
  db = mongoClient.db('autocall');
  console.log('Connected to MongoDB');
});

// Twilio voice webhook
app.post('/call-handler', (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse();
  twiml.say('Hello from your Autocall replica!');
  res.type('text/xml');
  res.send(twiml.toString());
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;

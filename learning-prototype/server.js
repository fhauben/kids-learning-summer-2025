// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const OpenAI = require('openai');

const app = express();
const port = 5001;

// Serve static files from public directory with logging
app.use(express.static('public', {
  onNoMatch: (req, res) => {
    console.log(`Static file not found: ${req.path}`);
    res.status(404).send('File not found');
  }
}));

// Add logging middleware for static files
app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  console.log('Request headers:', req.headers);
  console.log('Request body:', req.body);
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.status(200).end();
  } else {
    next();
  }
});

// Add error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

// Default route

// Verify API key is loaded
if (!process.env.OPENAI_API_KEY) {
  console.error('Error: OPENAI_API_KEY is not set in .env file');
  process.exit(1);
}

console.log('OpenAI API key loaded successfully');

// Initialize OpenAI with API key from .env
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Configure middleware and static files
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json({ limit: '50mb' }));

// Serve static files from public directory with logging
app.use(express.static('public', {
  onNoMatch: (req, res) => {
    console.log(`Static file not found: ${req.path}`);
    res.status(404).send('File not found');
  }
}));

// Add logging middleware
app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  console.log('Request headers:', req.headers);
  console.log('Request body:', req.body);
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.status(200).end();
  } else {
    next();
  }
});

// Add error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

// Default route
app.get('/', (req, res) => {
  res.json({ message: 'Server is running' });
});

// POST endpoint for ChatGPT messages
app.post('/api/chat', async (req, res) => {
  try {
    // Log the incoming request
    console.log('Incoming request:', req.method, req.url);
    console.log('Request headers:', req.headers);
    console.log('Request body:', JSON.stringify(req.body, null, 2));
    
    // Validate request
    if (!req.body || !req.body.messages) {
      console.error('Error: Invalid request format');
      return res.status(400).json({ 
        error: 'Invalid request format', 
        details: 'Request body must contain messages array' 
      });
    }

    const { messages } = req.body;
    
    // Validate messages
    if (!messages || !Array.isArray(messages)) {
      console.error('Error: Invalid messages format');
      return res.status(400).json({ 
        error: 'Invalid messages format', 
        details: 'Messages must be an array' 
      });
    }

    console.log('Sending request to OpenAI with messages:', messages);
    
    // Make OpenAI request
    const chatResponse = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
      temperature: 0.7
    });
    
    // Log the raw response
    console.log('Raw OpenAI response:', JSON.stringify(chatResponse, null, 2));
    
    // Process the response
    const reply = chatResponse.choices[0].message.content;
    
    // Log the final reply
    console.log('Sending reply:', reply);
    
    // Ensure proper JSON response
    res.status(200).json({ 
      reply: reply,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error processing request:', error);
    
    // Log the error details
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    
    // Send error response with proper headers
    res.status(500).json({ 
      error: 'Failed to process request', 
      details: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Start the server
const server = app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  console.log('Static files will be served from:', path.resolve(__dirname, 'public'));
});

// Handle server errors
server.on('error', (error) => {
  console.error('Server error:', error);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

// Export server and openai for testing
module.exports = { app, server, openai };

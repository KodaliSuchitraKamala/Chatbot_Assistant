const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ollama configuration
const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
const DEFAULT_MODEL = process.env.DEFAULT_MODEL || 'codellama';

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Chatbot Backend Server is running!', status: 'active' });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    ollama_url: OLLAMA_BASE_URL,
    default_model: DEFAULT_MODEL
  });
});

// Check if Ollama is available
app.get('/api/ollama/status', async (req, res) => {
  try {
    const response = await axios.get(`${OLLAMA_BASE_URL}/api/tags`, { timeout: 3000 });
    res.json({
      status: 'connected',
      models: response.data.models,
      available: true,
      message: 'Ollama is running and accessible'
    });
  } catch (error) {
    res.json({
      status: 'disconnected',
      error: error.message,
      available: false,
      message: 'Ollama is not running or not accessible. Using fallback responses.',
      fallback_mode: true
    });
  }
});

// List available models
app.get('/api/models', async (req, res) => {
  try {
    const response = await axios.get(`${OLLAMA_BASE_URL}/api/tags`);
    res.json({
      models: response.data.models,
      count: response.data.models.length
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch models', details: error.message });
  }
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    console.log('🔍 Backend received request:', req.body);
    const { message, model = DEFAULT_MODEL, conversation_history = [] } = req.body;

    if (!message || message.trim() === '') {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Prepare the conversation context
    const messages = [
      {
        role: 'system',
        content: 'You are a helpful AI assistant. Provide clear, concise, and accurate responses.'
      },
      ...conversation_history,
      {
        role: 'user',
        content: message
      }
    ];

    let botResponse;

    try {
      // Try to call Ollama API
      const ollamaResponse = await axios.post(`${OLLAMA_BASE_URL}/api/generate`, {
        model: model,
        prompt: messages.map(msg => `${msg.role}: ${msg.content}`).join('\n'),
        stream: false,
        options: {
          temperature: 0.7,
          top_p: 0.9,
          max_tokens: 1000
        }
      });

      botResponse = ollamaResponse.data.response;
      console.log(`✅ Ollama Response: ${botResponse}`);

    } catch (ollamaError) {
      console.error('❌ Ollama Error:', ollamaError.message);
      
      // Fallback response when Ollama is not available
      botResponse = generateFallbackResponse(message);
      console.log(`🔄 Fallback Response: ${botResponse}`);
    }

    // Save conversation to history (optional - you can implement database storage here)
    console.log(`User: ${message}`);
    console.log(`Bot: ${botResponse}`);

    // Format response with proper paragraphs
    const formattedResponse = formatResponse(botResponse);
    
    const responseData = {
      response: formattedResponse,
      model: model,
      timestamp: new Date().toISOString(),
      conversation_history: [
        ...conversation_history,
        { role: 'user', content: message },
        { role: 'assistant', content: formattedResponse }
      ]
    };
    
    console.log('📨 Backend sending response:', responseData);
    res.json(responseData);

  } catch (error) {
    console.error('Chat API Error:', error);
    res.status(500).json({ 
      error: 'Failed to process chat request', 
      details: error.message 
    });
  }
});

// Response formatter for proper paragraphs
function formatResponse(text) {
  if (!text) return '';
  
  // Split into paragraphs and clean up
  const paragraphs = text
    .split(/\n\n+/)  // Split on double newlines
    .map(p => p.trim())  // Trim whitespace
    .filter(p => p.length > 0);  // Remove empty paragraphs
  
  // Join with proper spacing
  return paragraphs.join('\n\n');
}

// Fallback response generator
function generateFallbackResponse(message) {
  const lowerMessage = message.toLowerCase();
  
  // Simple keyword-based responses
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    return "Hello! I'm your AI assistant. How can I help you today?";
  }
  
  if (lowerMessage.includes('quantum')) {
    return "Quantum computing uses quantum mechanics to process information. Unlike classical computers that use bits (0 or 1), quantum computers use qubits that can exist in multiple states simultaneously, allowing them to solve certain complex problems much faster.";
  }
  
  if (lowerMessage.includes('help')) {
    return "I can help you with various topics including programming, explanations, creative writing, and problem-solving. What would you like to know?";
  }
  
  if (lowerMessage.includes('code') || lowerMessage.includes('programming')) {
    return "I can help with programming in various languages like Python, JavaScript, Java, C++, and more. Feel free to ask specific coding questions!";
  }
  
  if (lowerMessage.includes('explain')) {
    return "I'd be happy to explain concepts for you! Please specify what topic you'd like me to explain, and I'll break it down in simple terms.";
  }
  
  // Default response
  return "I'm here to help! While I'm currently operating in a limited mode, I can still assist with basic questions and explanations. For more advanced AI responses, please ensure Ollama is properly set up with a model installed.";
}

// Stream chat endpoint (for real-time responses)
app.post('/api/chat/stream', async (req, res) => {
  try {
    const { message, model = DEFAULT_MODEL } = req.body;

    if (!message || message.trim() === '') {
      return res.status(400).json({ error: 'Message is required' });
    }

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', '*');

    const ollamaResponse = await axios.post(`${OLLAMA_BASE_URL}/api/generate`, {
      model: model,
      prompt: message,
      stream: true,
      options: {
        temperature: 0.7,
        top_p: 0.9,
        max_tokens: 1000
      }
    }, {
      responseType: 'stream'
    });

    ollamaResponse.data.on('data', (chunk) => {
      const lines = chunk.toString().split('\n');
      lines.forEach(line => {
        if (line.trim()) {
          try {
            const parsed = JSON.parse(line);
            if (parsed.response) {
              res.write(`data: ${JSON.stringify({ response: parsed.response })}\n\n`);
            }
            if (parsed.done) {
              res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
              res.end();
            }
          } catch (e) {
            // Ignore parsing errors for streaming
          }
        }
      });
    });

    ollamaResponse.data.on('error', (error) => {
      console.error('Stream Error:', error);
      res.write(`data: ${JSON.stringify({ error: 'Stream error' })}\n\n`);
      res.end();
    });

  } catch (error) {
    console.error('Stream Chat API Error:', error);
    res.status(500).json({ error: 'Failed to start stream', details: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Chatbot Backend Server running on port ${PORT}`);
  console.log(`🤖 Ollama URL: ${OLLAMA_BASE_URL}`);
  console.log(`📝 Default Model: ${DEFAULT_MODEL}`);
  console.log(`🌐 Server: http://localhost:${PORT}`);
});

module.exports = app;

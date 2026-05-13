# Chatbot LLM - Full Stack Application

A modern, responsive chatbot application with React frontend and Node.js backend, integrated with Ollama for LLM capabilities.

## Features

- 🤖 Modern chat interface with message bubbles
- � User authentication and session management
- 💬 Real-time typing indicators and loading states
- 🎨 Clean Material-UI design with responsive layout
- 📱 Fully responsive design for all devices
- 🔍 Conversation search functionality
- 📂 Conversation history organized by date (Today, Previous 7 Days, Earlier)
- ✏️ Rename and delete conversations
- 📤 Share conversations via email, copy link, or QR code
- ⚡ Fast and lightweight with local LLM integration
- 🔧 Backend server with Ollama integration

## Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager
- Ollama (installed and running on your system)
  - Download from: https://ollama.ai/download
  - Ensure Ollama server is running on `http://localhost:11434`

## Project Structure

```
Chatbot LLM/
├── backend/
│   ├── server.js           # Express server with Ollama integration
│   ├── package.json        # Backend dependencies
│   ├── package-lock.json   # Backend dependencies
│   └── .env                # Environment variables
├── public/
│   └── index.html          # HTML template
├── src/
│   ├── App.js              # Main application component
│   ├── LoginPage.js        # Login page component
│   └── index.js            # React entry point
├── package.json            # Frontend dependencies and scripts
├── package-lock.json       # Frontend dependencies and scripts
├── start-simple.bat           
├── start.bat
└── README.md               # This file
```

## Installation

1. Clone or download this project
2. Navigate to the project directory:
   ```bash
   cd "Chatbot LLM"
   ```

3. Install frontend dependencies:
   ```bash
   npm install
   ```

4. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

## LLM Integration Note

**Important:** This project was initially designed to work with LMStudio, but due to connection issues with LMStudio, we have switched to using **Ollama** as the LLM provider. Ollama provides a more stable and reliable connection for local LLM inference.

If you prefer to use LMStudio instead, you would need to modify the backend API endpoint in `backend/server.js` to connect to LMStudio's API instead of Ollama's.

## Working Process

### Step 1: Start Ollama Server

Ensure Ollama is installed and running on your system:
```bash
# Start Ollama (if not already running)
ollama serve
```

Pull a model if you haven't already:
```bash
# Example: Pull Llama 3 model
ollama pull llama3
```

### Step 2: Start the Backend Server

Navigate to the backend directory and start the server:
```bash
cd backend
npm start
```

The backend server will run on `http://localhost:5000`

### Step 3: Start the Frontend Application

In a new terminal, navigate to the project root and start the React app:
```bash
npm start
```

The frontend will open in your default browser at `http://localhost:3000`

### Step 4: Use the Application

1. **Sign In**: Click on the avatar icon in the top-right corner and enter your email and name
2. **Start Chatting**: Type your message in the input field and press Enter or click the Send button
3. **Manage Conversations**: 
   - Create new chats using the "New Chat" button
   - Access conversation history from the sidebar
   - Search conversations using the search icon
   - Rename or delete conversations using the menu (three dots)
   - Share conversations via email, copy link, or QR code

## Backend Configuration

The backend server (`backend/server.js`) connects to Ollama using the following configuration:

- **Ollama Endpoint**: `http://localhost:11434/api/chat`
- **Backend Port**: `5000`
- **Model**: Configured in the backend (default: llama3)

To change the model, edit the `model` parameter in `backend/server.js`.

## Building for Production

### Frontend Build
```bash
npm run build
```

The build files will be created in the `build` directory.

### Backend Deployment

For production deployment, you may want to:
1. Use a process manager like PM2 to keep the backend running
2. Set up environment variables for security
3. Configure CORS for your production domain
4. Use a reverse proxy like Nginx

## Technologies Used

### Frontend
- **React 18** - UI framework
- **Material-UI (MUI)** - Component library
- **React Router DOM** - Routing
- **Axios** - HTTP client
- **QRCode** - QR code generation
- **Emotion** - CSS-in-JS styling
- **Create React App** - Build tool

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **Axios** - HTTP client for Ollama API
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management
- **body-parser** - Request parsing

## Troubleshooting

### Backend Connection Issues
- Ensure Ollama is running: Check if `http://localhost:11434` is accessible
- Verify the backend server is running on port 5000
- Check browser console for CORS errors

### Ollama Model Issues
- Ensure you have pulled a model: `ollama pull <model-name>`
- Check Ollama logs: `ollama logs`

### Frontend Issues
- Clear browser cache and localStorage
- Check that all dependencies are installed
- Verify React development server is running on port 3000

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

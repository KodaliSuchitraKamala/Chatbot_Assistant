# Chatbot AI Assistant

A full-stack AI Chatbot Assistant built with React, Node.js, Express, and Google's Generative AI.

## Features

- **Interactive Chat Interface**: A modern React-based UI for seamless user interactions.
- **AI Integration**: Powered by Google Generative AI for intelligent and context-aware responses.
- **Express Backend**: A robust Node.js/Express server to handle API requests and manage AI model interactions securely.

## Prerequisites

- Node.js (v14 or higher)
- npm
- Google Gemini API Key

## Getting Started

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone <repository-url>
   cd Chatbot
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Setup**:
   Create a `.env` file in the root directory and add your Google Gemini API key:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

4. **Run the Application**:
   Start both the frontend React app and backend Express server concurrently:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   Navigate to `http://localhost:3000` to interact with the Chatbot Assistant.

## Available Scripts

- `npm run dev`: Runs both the React app and Express server concurrently.
- `npm start`: Runs only the React app in development mode.
- `npm run server`: Runs only the Express server using nodemon for hot-reloading.
- `npm run build`: Builds the React app for production to the `build` folder.

---

Built with React, Express, and Google Generative AI.

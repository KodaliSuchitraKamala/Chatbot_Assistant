# Chatbot Assistant Project

## Repository Information
- **GitHub**: https://github.com/KodaliSuchitraKamala/Chatbot_Assistant
- **Status**: Clean repository state matching remote exactly

## Technology Stack
- **Frontend**: React with TypeScript
- **Backend**: Node.js, Express, TypeScript
- **AI Integration**: Google Gemini API
- **Database**: In-memory session storage

## Key Features
- AI-powered chat responses using Gemini Flash model
- Intent recognition and entity extraction
- Service-specific knowledge base (Branding, Team Management)
- Chat history persistence
- Context-aware dialogue management

## Token Configuration
- **Model**: gemini-flash-latest
- **Context Window**: 1,000,000 tokens
- **Output Limit**: 64,000 tokens
- **Usage**: Per user session with history accumulation

## Project Structure
```
Chatbot_Assistant/
├── public/           # Static assets
├── src/             # React frontend source
├── server/          # Node.js backend
│   ├── data/        # Database and persistence
│   ├── dialogue/    # Conversation management
│   ├── integrations/ # API clients
│   └── nlp/         # AI and NLP services
├── package.json     # Dependencies and scripts
└── README.md        # Original documentation
```

## Environment Setup
- Copy `.env.example` to `.env`
- Add your `GEMINI_API_KEY`
- Run `npm run dev` for development

---
*Repository synchronized with GitHub - no local-only files present*

# Chatbot Project Documentation

This document provides a comprehensive overview of the technical work completed for the **Lokachakra Chatbot** project, from inception to its current state.

## 1. Project Overview
The Lokachakra Chatbot is a web-based artificial intelligence assistant built with a **React (TypeScript)** frontend and a **Node.js (Express/TypeScript)** backend. It integrates the **Google Gemini API** to provide intelligent responses, context-aware dialogue, and service-specific information.

## 2. Technical Milestones

### Phase 1: Infrastructure & Version Control
- **Git Initialization**: Set up version control for the project.
- **Remote Synchronization**: Configured and synchronized the local repository with the remote Git server.
- **Environment Management**: Implemented `.env` for managing sensitive API keys and configuration (recently improved to prevent secret exposure).

### Phase 2: Backend Development & API Integration
- **Server Architecture**: Developed a robust Express.js server in TypeScript.
- **Gemini AI Integration**:
    - Integrated `google-generative-ai` SDK.
    - Resolved critical **404 (Not Found)** and **429 (Too Many Requests)** errors caused by model deprecations and quota limits.
    - Implemented a "Mock Mode" fallback for local development without keys.
- **Intent Recognition & NLP**:
    - Created a dialogue manager to process user messages.
    - Implemented intent recognition (e.g., `BOOK_DESIGNER`, `ASK_COST`) to pull relevant data from a local knowledge base.
    - Added entity extraction for service-specific queries (Branding, Team Management, etc.).

### Phase 3: Persistence & State Management
- **Chat History**:
    - Developed a persistence layer to save and load chat history by `userId`.
    - Resolved 404 errors related to history fetching by ensuring correct backend route registration.
- **Session Context**: Implemented state management to track user context (last intent, extracted entities) across a conversation.

### Phase 4: Frontend Development
- **React UI**: Built a modern, responsive chat interface using React and TypeScript.
- **State Integration**: Connected the frontend to the backend `/api/chat` and `/api/history` endpoints.
- **UI/UX Fixes**: Resolved interface rendering errors and improved user experience through loading states and error handling.

## 3. Security & Best Practices
- **Secret Protection**: Configured `.gitignore` and removed `.env` from Git tracking to ensure `GEMINI_API_KEY` is never exposed in the repository.
- **Template Configuration**: Provided `.env.example` to allow developers to set up their environment securely.

## 4. Current Configuration
- **Frontend Port**: Default Vite port.
- **Backend Port**: `5002` (configurable via `.env`).
- **Primary Model**: `gemini-flash-latest`.

---
*Documentation last updated: April 8, 2026*

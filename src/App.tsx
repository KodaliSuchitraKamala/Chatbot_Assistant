import React, { useState, useEffect } from 'react';
import './styles/global.css';
import Header from './components/Header';
import MessageList from './components/MessageList';
import Sidebar from './components/Sidebar/Sidebar';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import { ChatMessage, ChatSession, User } from './types';
import PromptGrid from './components/PromptGrid';
import ChatInput from './components/ChatInput';

const INITIAL_MESSAGES: ChatMessage[] = [
    {
        id: '1',
        text: 'Hello, how can I help you today?',
        sender: 'bot',
        timestamp: new Date().toISOString(),
    },
];

const App: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [currentView, setCurrentView] = useState<'register' | 'login' | 'chat'>('register');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
    const [history, setHistory] = useState<ChatSession[]>([]);
    const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);

    const handleRegister = (userData: User) => {
        setUser(userData);
        setCurrentView('login');
    };

    const handleLogin = (userData: User) => {
        setUser(userData);
        setCurrentView('chat');
    };

    const handleSignOut = () => {
        setUser(null);
        setMessages(INITIAL_MESSAGES);
        setHistory([]);
        setCurrentSessionId(null);
        setCurrentView('login');
    };

    // Health check on mount
    useEffect(() => {
        fetch('http://localhost:5002/api/health')
            .then(res => res.json())
            .then(data => console.log('Backend health status:', data.status))
            .catch(err => console.error('Backend unreachable:', err));
    }, []);

    // Load history when user logs in
    useEffect(() => {
        const fetchHistory = async () => {
            if (!user || currentView !== 'chat') return;
            try {
                const userId = encodeURIComponent(user.email);
                const response = await fetch(`http://localhost:5002/api/history/${userId}`);
                if (response.ok) {
                    const data = await response.json();
                    setHistory(data.history || []);
                }
            } catch (error) {
                console.error("Error fetching history:", error);
            }
        };

        fetchHistory();
    }, [currentView, user]);

    // Auto-save history when it changes
    useEffect(() => {
        if (history.length > 0 && user) {
            const userId = encodeURIComponent(user.email);
            fetch(`http://localhost:5002/api/history/${userId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ history }),
            }).catch(err => console.error("Error auto-saving history:", err));
        }
    }, [history, user]);

    const handleSendMessage = async (text: string) => {
        const messageId = Date.now().toString();
        const newMessage: ChatMessage = {
            id: messageId,
            text,
            sender: 'user',
            timestamp: new Date().toISOString(),
            status: 'sent'
        };

        const updatedMessagesAfterUser = [...messages, newMessage];
        setMessages(updatedMessagesAfterUser);
        setIsTyping(true);

        try {
            const response = await fetch('http://localhost:5002/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user?.email || 'user-123', text }),
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.statusText}`);
            }

            const data = await response.json();

            const botResponse: ChatMessage = {
                id: (Date.now() + 1).toString(),
                text: data.response || "I received an empty response from my brain.",
                sender: 'bot',
                timestamp: new Date().toISOString(),
            };

            const finalMessages = [...updatedMessagesAfterUser, botResponse];
            setMessages(finalMessages);

            // Sync with history
            let sessionId = currentSessionId;
            if (!sessionId) {
                sessionId = Date.now().toString();
                setCurrentSessionId(sessionId);
            }

            const lastUserMessage = finalMessages.slice().reverse().find(m => m.sender === 'user');
            const previewText = lastUserMessage ? lastUserMessage.text : finalMessages[0].text;
            const updatedPreview = previewText.length > 40 ? previewText.substring(0, 37) + "..." : previewText;

            setHistory(prev => {
                const existingIndex = prev.findIndex(s => s.id === sessionId);
                if (existingIndex !== -1) {
                    const newHistory = [...prev];
                    newHistory[existingIndex] = {
                        ...newHistory[existingIndex],
                        messages: finalMessages,
                        preview: updatedPreview,
                        timestamp: new Date().toISOString()
                    };
                    return newHistory;
                } else {
                    return [{
                        id: sessionId!,
                        messages: finalMessages,
                        preview: updatedPreview,
                        timestamp: new Date().toISOString()
                    }, ...prev];
                }
            });
        } catch (error) {
            console.error("Error connecting to backend:", error);
            const errorResponse: ChatMessage = {
                id: (Date.now() + 1).toString(),
                text: "Sorry, I'm having trouble connecting to my brain right now. Please make sure the server is running.",
                sender: 'bot',
                timestamp: new Date().toISOString(),
            };
            setMessages((prev) => [...prev, errorResponse]);
        } finally {
            setIsTyping(false);
        }
    };

    const handlePromptClick = (prompt: string) => {
        handleSendMessage(prompt);
    };

    const handleNewChat = () => {
        setMessages(INITIAL_MESSAGES);
        setCurrentSessionId(null);
        setIsSidebarOpen(false);
    };

    const handleSelectSession = (session: ChatSession) => {
        setMessages(session.messages);
        setCurrentSessionId(session.id);
        setIsSidebarOpen(false);
    };

    if (currentView === 'register') {
        return <Register onRegister={handleRegister} onSwitchToLogin={() => setCurrentView('login')} />;
    }

    if (currentView === 'login') {
        return <Login onLogin={handleLogin} onSwitchToRegister={() => setCurrentView('register')} />;
    }

    return (
        <div className="chatbot-container">
            <Header user={user} onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} onSignOut={handleSignOut} />
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                onNewChat={handleNewChat}
                history={history}
                onSelectSession={handleSelectSession}
                currentSessionId={currentSessionId}
            />
            <main className="main-content">
                <div className="chat-section">
                    <MessageList messages={messages} isTyping={isTyping} />
                    <PromptGrid onPromptClick={handlePromptClick} />
                    <ChatInput onSendMessage={handleSendMessage} />
                </div>
            </main>
        </div>
    );
};

export default App;

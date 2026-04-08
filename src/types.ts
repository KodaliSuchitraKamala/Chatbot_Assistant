export interface ChatMessage {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: string;
    status?: 'sent' | 'delivered' | 'seen';
}

export interface ChatSession {
    id: string;
    messages: ChatMessage[];
    timestamp: string;
    preview: string;
}

export interface User {
    name: string;
    email: string;
}

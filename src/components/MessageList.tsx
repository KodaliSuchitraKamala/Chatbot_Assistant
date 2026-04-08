import React, { useRef, useEffect } from 'react';
import Message from './Message';
import TypingIndicator from './TypingIndicator';
import './MessageList.css';
import { ChatMessage } from '../types';

interface MessageListProps {
    messages: ChatMessage[];
    isTyping?: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isTyping }) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    return (
        <div className="message-list">
            <div className="date-separator">
                <span className="date-text">Today</span>
            </div>
            {messages.map((msg) => (
                <Message key={msg.id} {...msg} />
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
        </div>
    );
};

export default MessageList;

import React, { useState, useRef, useEffect } from 'react';
import './ChatInput.css';

interface ChatInputProps {
    onSendMessage: (text: string) => void;
    isTyping?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
    const [text, setText] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const maxLength = 1000;

    const handleSend = () => {
        if (text.trim()) {
            onSendMessage(text.trim());
            setText('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
        }
    }, [text]);

    return (
        <div className="chat-input-wrapper">
            <div className="chat-input-container">
                <textarea
                    ref={textareaRef}
                    className="chat-input"
                    placeholder="Type a message..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    rows={1}
                    maxLength={maxLength}
                />
                <button
                    className="send-btn"
                    onClick={handleSend}
                    disabled={!text.trim()}
                    aria-label="Send"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>
            <div className="input-footer">
                <span className={`char-count ${text.length > maxLength * 0.9 ? 'warning' : ''}`}>
                    {text.length}/{maxLength}
                </span>
            </div>
        </div>
    );
};

export default ChatInput;

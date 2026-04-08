import React from 'react';
import './HistoryView.css';
import { ChatMessage, ChatSession } from '../types';
import { groupSessionsByDate, formatSessionTimestamp } from '../utils/dateUtils';

interface HistoryViewProps {
    messages: ChatMessage[];
    history: ChatSession[];
    onSelectSession: () => void;
    currentSessionId: string | null;
}

const HistoryView: React.FC<HistoryViewProps> = ({ messages, history, onSelectSession, currentSessionId }) => {
    const historicalSessions = history.filter(s => s.id !== currentSessionId);
    return (
        <div className="history-view">
            <h2 className="history-title">Chat History</h2>
            <div className="history-list">
                <div className="history-item current" onClick={onSelectSession}>
                    <div className="history-item-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                    </div>
                    <div className="history-item-details">
                        <p className="history-item-preview">
                            {messages.length > 0 ? messages[messages.length - 1].text : "Start a new conversation"}
                        </p>
                        <span className="history-item-time">Active Now</span>
                    </div>
                </div>

                {historicalSessions.length > 0 ? (
                    groupSessionsByDate(historicalSessions).map((group) => (
                        <div key={group.category} className="history-group">
                            <h3 className="history-group-title">{group.category}</h3>
                            {group.sessions.map((session) => (
                                <div key={session.id} className="history-item disabled" title="Past session logic not yet implemented for clicking">
                                    <div className="history-item-icon secondary">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div className="history-item-details">
                                        <p className="history-item-preview">{session.preview}</p>
                                        <span className="history-item-time">{formatSessionTimestamp(session.timestamp)}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))
                ) : (
                    <div className="history-item disabled">
                        <div className="history-item-icon secondary">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="history-item-details">
                            <p className="history-item-preview">No past sessions yet</p>
                            <span className="history-item-time">Start a chat to see history</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HistoryView;

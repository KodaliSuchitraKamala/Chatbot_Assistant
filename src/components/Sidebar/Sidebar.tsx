import React from 'react';
import './Sidebar.css';
import { ChatSession } from '../../types';
import { groupSessionsByDate } from '../../utils/dateUtils';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    onNewChat: () => void;
    history: ChatSession[];
    onSelectSession: (session: ChatSession) => void;
    currentSessionId: string | null;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onNewChat, history, onSelectSession, currentSessionId }) => {
    return (
        <>
            <div className={`sidebar-overlay ${isOpen ? 'active' : ''}`} onClick={onClose} />
            <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <button className="sidebar-new-chat" onClick={onNewChat}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 5V19M5 12H19" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>New chat</span>
                    </button>
                </div>

                <div className="sidebar-content">
                    <div className="history-section">
                        {history.length > 0 ? (
                            groupSessionsByDate(history).map((group) => (
                                <div key={group.category} className="history-group">
                                    <h3 className="section-title">{group.category}</h3>
                                    <div className="history-list">
                                        {group.sessions.map((session) => (
                                            <button
                                                key={session.id}
                                                className={`history-item ${session.id === currentSessionId ? 'active' : ''}`}
                                                onClick={() => onSelectSession(session)}
                                            >
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                                </svg>
                                                <span className="history-text">{session.preview}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="history-group">
                                <h3 className="section-title">Recent</h3>
                                <p className="no-history">Your recent chats will appear here</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="sidebar-footer">
                    {/* Add footer items like Settings, Help, etc. if needed */}
                </div>
            </aside>
        </>
    );
};

export default Sidebar;

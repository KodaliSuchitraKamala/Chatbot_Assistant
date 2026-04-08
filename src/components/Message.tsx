import ReactMarkdown from 'react-markdown';
import './Message.css';
import { ChatMessage as MessageProps } from '../types';
import { formatSessionTimestamp } from '../utils/dateUtils';

const Message: React.FC<MessageProps> = ({ text, sender, timestamp, status }) => {
    return (
        <div className={`message-container ${sender}`}>
            <div className="message-bubble">
                <div className="markdown-content">
                    <ReactMarkdown>{text}</ReactMarkdown>
                </div>
                <div className="message-meta">
                    <span className="timestamp">{formatSessionTimestamp(timestamp)}</span>
                    {sender === 'user' && status && (
                        <span className={`status-icon ${status}`}>
                            {status === 'sent' && '✓'}
                            {(status === 'delivered' || status === 'seen') && '✓✓'}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Message;

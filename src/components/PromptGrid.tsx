import React from 'react';
import './PromptGrid.css';

interface PromptGridProps {
    onPromptClick: (prompt: string) => void;
}

const PromptGrid: React.FC<PromptGridProps> = ({ onPromptClick }) => {
    const prompts = [
        { text: "Help me write a professional email", icon: "✉️" },
        { text: "Plan a 3-day trip to Tokyo", icon: "✈️" },
        { text: "Explain quantum computing simply", icon: "🧠" },
        { text: "Suggest some healthy dinner ideas", icon: "🥗" }
    ];

    return (
        <div className="prompt-grid">
            {prompts.map((prompt, index) => (
                <button
                    key={index}
                    className="prompt-card"
                    onClick={() => onPromptClick(prompt.text)}
                >
                    <span className="prompt-text">{prompt.text}</span>
                    <span className="prompt-icon">{prompt.icon}</span>
                </button>
            ))}
        </div>
    );
};

export default PromptGrid;

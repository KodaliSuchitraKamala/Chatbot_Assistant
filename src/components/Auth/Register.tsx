import React, { useState } from 'react';
import './Auth.css';

interface RegisterProps {
    onRegister: (userData: { name: string; email: string }) => void;
    onSwitchToLogin: () => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister, onSwitchToLogin }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name && email && password) {
            onRegister({ name, email });
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1 className="auth-logo">Chatbot AI</h1>
                <h2 className="auth-title">Create your account</h2>
                <p className="auth-subtitle">Welcome! Please fill in the details to get started.</p>
                
                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input 
                            type="text" 
                            id="name" 
                            placeholder="Enter your name" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input 
                            type="email" 
                            id="email" 
                            placeholder="name@example.com" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            placeholder="Create a password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                    </div>
                    <button type="submit" className="auth-submit-btn">Register</button>
                </form>
                
                <p className="auth-footer">
                    Already have an account? <button onClick={onSwitchToLogin} className="auth-link-btn">Log in</button>
                </p>
            </div>
        </div>
    );
};

export default Register;

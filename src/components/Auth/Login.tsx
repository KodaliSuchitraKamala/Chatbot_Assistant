import React, { useState } from 'react';
import './Auth.css';

interface LoginProps {
    onLogin: (userData: { name: string; email: string }) => void;
    onSwitchToRegister: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onSwitchToRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock login
        if (email && password) {
            onLogin({ name: email.split('@')[0], email });
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1 className="auth-logo">Chatbot AI</h1>
                <h2 className="auth-title">Login to your account</h2>
                <p className="auth-subtitle">Enter your details to continue your session.</p>
                
                <form className="auth-form" onSubmit={handleSubmit}>
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
                            placeholder="Enter your password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                    </div>
                    <button type="submit" className="auth-submit-btn">Login</button>
                </form>
                
                <p className="auth-footer">
                    Don't have an account? <button onClick={onSwitchToRegister} className="auth-link-btn">Register</button>
                </p>
            </div>
        </div>
    );
};

export default Login;

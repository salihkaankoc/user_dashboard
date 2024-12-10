import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Login.css';

function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();


 
    if (credentials.email === 'admin@example.com' && credentials.password === 'pass123123') {
      login({ email: credentials.email, role: 'Admin' });
      navigate('/dashboard');
    } else if (credentials.email === 'editor@example.com' && credentials.password === 'pass123123') {
      login({ email: credentials.email, role: 'Editor' });
      navigate('/dashboard');
    } else if (credentials.email === 'viewer@example.com' && credentials.password === 'pass123123') {
      login({ email: credentials.email, role: 'Viewer' });
      navigate('/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <i className="fas fa-user-circle"></i>
          <h1>Welcome Back</h1>
          <p>Please sign in to continue</p>
        </div>

        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <div className="input-group">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                placeholder="Email"
                value={credentials.email}
                onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <div className="input-group">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                value={credentials.password}
                onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-login">
            Sign In
          </button>
        </form>

        <div className="login-footer">
          <p>Test Credentials:</p>
          <div className="credentials-list">
            <div className="credential-item">
              <span className="role">Admin:</span>
              <span className="email">admin@example.com</span>
            </div>
            <div className="credential-item">
              <span className="role">Editor:</span>
              <span className="email">editor@example.com</span>
            </div>
            <div className="credential-item">
              <span className="role">Viewer:</span>
              <span className="email">viewer@example.com</span>
            </div>
            <div className="credential-item">
              <span className="role">Password:</span>
              <span className="password">pass123123</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login; 
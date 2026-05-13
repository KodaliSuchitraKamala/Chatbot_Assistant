import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Tabs,
  Tab,
  Alert,
  CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';

const LoginContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#f8f9fa',
  backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
}));

const LoginPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 400,
  width: '100%',
  borderRadius: 16,
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(1.5),
  fontWeight: 600,
  textTransform: 'none',
}));

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`auth-tabpanel-${index}`}
      aria-labelledby={`auth-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
};

function LoginPage() {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setError('');
    // Don't clear success message immediately to allow user to see registration success
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate API call - accept any email with valid password or demo credentials
    setTimeout(() => {
      if ((formData.email === 'user@example.com' && formData.password === 'password') ||
          (formData.email === 'kodalisuchitrakamala@gmail.com' && formData.password === 'suchitra') ||
          (formData.email && formData.password && formData.password.length >= 6)) {
        // Save user data to localStorage
        const userData = {
          email: formData.email,
          name: formData.email.split('@')[0], // Use email prefix as name
          signInTime: new Date().toISOString()
        };
        localStorage.setItem('currentUser', JSON.stringify(userData));
        
        setSuccess('Login successful! Redirecting...');
        setTimeout(() => {
          navigate('/chat');
        }, 1000);
      } else {
        setError('Invalid email or password. Password must be at least 6 characters.');
      }
      setLoading(false);
    }, 1500);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setSuccess('Registration successful! Please login with your credentials.');
      setTabValue(0); // Switch to login tab
      setFormData(prev => ({
        ...prev,
        password: '',
        confirmPassword: ''
      }));
      setLoading(false);
    }, 1500);
  };

  return (
    <LoginContainer>
      <Container maxWidth="sm">
        <LoginPaper elevation={3}>
          <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 600, color: '#1976d2' }}>
            Chatbot AI
          </Typography>
          
          <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 3 }}>
            {tabValue === 0 ? 'Login to your account' : 'Create your account'}
          </Typography>

          <Tabs value={tabValue} onChange={handleTabChange} centered sx={{ mb: 2 }}>
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

          <TabPanel value={tabValue} index={0}>
            <form onSubmit={handleLogin}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                margin="normal"
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                margin="normal"
                variant="outlined"
              />
              <StyledButton
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : null}
              >
                {loading ? 'Signing in...' : 'Login'}
              </StyledButton>
            </form>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <form onSubmit={handleRegister}>
              <TextField
                fullWidth
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                margin="normal"
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                margin="normal"
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                margin="normal"
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                margin="normal"
                variant="outlined"
              />
              <StyledButton
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : null}
              >
                {loading ? 'Creating account...' : 'Register'}
              </StyledButton>
            </form>
          </TabPanel>

          <Typography variant="body2" align="center" sx={{ mt: 3, color: '#666' }}>
            Demo credentials: user@example.com / password
          </Typography>
        </LoginPaper>
      </Container>
    </LoginContainer>
  );
}

export default LoginPage;

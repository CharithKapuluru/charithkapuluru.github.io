import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Button, TextField, Container, Box, Typography, Divider,
  IconButton, InputAdornment
} from '@mui/material';
import { auth } from '../firebase';
import { 
  GoogleAuthProvider, 
  GithubAuthProvider, 
  TwitterAuthProvider,
  signInWithPopup 
} from 'firebase/auth';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      alert('Logged in successfully!');
      navigate('/dashboard');
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      // Save user data to MongoDB
      await axios.post('http://localhost:5002/api/users', {
        email: result.user.email,
        firebaseUID: result.user.uid
      });
      alert('Logged in with Google successfully!');
      navigate('/dashboard');
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const handleGithubLogin = async () => {
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
      alert('Logged in with GitHub successfully!');
      navigate('/dashboard');
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const handleTwitterLogin = async () => {
    try {
      const provider = new TwitterAuthProvider();
      await signInWithPopup(auth, provider);
      alert('Logged in with Twitter successfully!');
      navigate('/dashboard');
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box 
        sx={{ 
          mt: 8,
          p: 4,
          borderRadius: 2,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          backgroundColor: 'white'
        }}
      >
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
          Welcome Back
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
          <Button 
            type="submit" 
            variant="contained" 
            fullWidth 
            sx={{ 
              mt: 3, 
              mb: 2,
              py: 1.5,
              backgroundColor: '#1976d2',
              '&:hover': {
                backgroundColor: '#115293'
              }
            }}
          >
            Login with Email
          </Button>

          <div className="signup-link">
            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
          </div>

          <Divider sx={{ my: 3 }}>OR CONTINUE WITH</Divider>
          
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <Button 
              onClick={handleGoogleLogin}
              variant="outlined"
              fullWidth
              startIcon={<GoogleIcon />}
              sx={{ 
                py: 1.5,
                borderColor: '#DB4437',
                color: '#DB4437',
                '&:hover': {
                  borderColor: '#DB4437',
                  backgroundColor: 'rgba(219, 68, 55, 0.04)'
                }
              }}
            >
              Google
            </Button>
            
            <Button 
              onClick={handleGithubLogin}
              variant="outlined"
              fullWidth
              startIcon={<GitHubIcon />}
              sx={{ 
                py: 1.5,
                borderColor: '#333',
                color: '#333',
                '&:hover': {
                  borderColor: '#333',
                  backgroundColor: 'rgba(51, 51, 51, 0.04)'
                }
              }}
            >
              GitHub
            </Button>
            
            <Button 
              onClick={handleTwitterLogin}
              variant="outlined"
              fullWidth
              startIcon={<TwitterIcon />}
              sx={{ 
                py: 1.5,
                borderColor: '#1DA1F2',
                color: '#1DA1F2',
                '&:hover': {
                  borderColor: '#1DA1F2',
                  backgroundColor: 'rgba(29, 161, 242, 0.04)'
                }
              }}
            >
              Twitter
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
} 
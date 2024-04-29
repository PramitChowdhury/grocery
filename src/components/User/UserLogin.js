import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './UserLogin.css';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    const userData = {
      userEmail: email,
      customerPassword: password
    };

    axios.post('http://localhost:8085/user/customer/sign', userData)
      .then(response => {
        // Handle successful login
        console.log(response.data);
        toast.success('Login successful!');
        // Redirect or perform other actions after successful login
      })
      .catch(error => {
        // Handle login error
        console.error('Login error:', error);
        toast.error('Login failed. Please check your credentials and try again.');
      });
  };

  return (
    <div>
      <Navbar />
      <ToastContainer />
      <div className="container-1">
        <div className="form-container">
          <h2 className="heading">User Login Page</h2>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '100%' },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                required
                id="user-email"
                label="Email"
                type="email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                required
                id="user-password"
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="signup-text">Don't have an account? <Link to="/user-signup"> Sign Up</Link></div>
              <a href="/user-login/customer">
                <button type="button" onClick={handleSignIn}><Link to="/user-login/customer">Sign In</Link></button></a>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
}

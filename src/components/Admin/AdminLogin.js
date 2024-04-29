import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './AdminLogin.css';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    if (!username || !password) {
      toast.error('Please enter both username and password.');
      return;
    }

    const adminData = {
      userEmail: username,
      customerPassword: password
    };

    axios.post('http://localhost:8085/user/admin/sign', adminData)
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
      <div className="container-2">
        <div className="form-container">
          <h2 className="heading">Admin Login Page</h2>
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
                id="admin-username"
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                required
                id="admin-password"
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="signup-text">Don't have an account? <Link to="/admin-signup"> Sign Up</Link></div>
              <a href="/admin-product">
                <button type="button" onClick={handleSignIn}><Link to="/admin-signup/admin-product">Sign In</Link></button></a>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
}

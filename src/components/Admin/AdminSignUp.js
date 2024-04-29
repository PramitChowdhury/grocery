import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './AdminSignUp.css';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminSignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      toast.error('Passwords do not match. Please try again.');
      return;
    }

    const adminData = {
      userFullName: `${firstName} ${lastName}`,
      userEmail: email,
      userMobileNumber: '0',
      customerPassword: password
    };

    axios.post('http://localhost:8085/user/admin/create', adminData)
      .then(response => {
        // Handle successful signup
        console.log(response.data);
        toast.success('Signup successful!');
      })
      .catch(error => {
        // Handle signup error
        console.error('Signup error:', error);
        toast.error('Signup failed. Please try again.');
      });
  };

  return (
    <div>
      <Navbar />
      <ToastContainer />
      <div className="container-4">
        <div className="form-container">
          <h2 className="heading">Admin Sign Up</h2>
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
                id="admin-firstname"
                label="First Name"
                variant="outlined"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <TextField
                required
                id="admin-lastname"
                label="Last Name"
                variant="outlined"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <TextField
                required
                id="admin-email"
                label="Email"
                type="email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              <TextField
                required
                id="admin-confirm-password"
                label="Confirm Password"
                type="password"
                variant="outlined"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div className="login-text">Already have an account? <Link to="/admin-login"> Sign In</Link></div>
              <a href="/admin-signup/admin-product">
                <button type="button" onClick={handleSignUp}><Link to="/admin-signup/admin-product">Sign Up</Link></button>
              </a>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './UserSignUp.css';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UserSignUp() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    const userData = {
      userFullName: fullName,
      userEmail: email,
      userMobileNumber: mobile,
      customerPassword: password
    };

    axios.post('http://localhost:8085/user/customer/create', userData)
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
      <div className="container-3">
        <div className="form-container">
          <h2 className="heading">User Sign Up</h2>
          <Box
            component="form"
            onSubmit={handleSignUp}
            sx={{
              '& .MuiTextField-root': { m: 1, width: '100%' },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                required
                id="user-fullname"
                label="Full Name"
                variant="outlined"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
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
                id="user-mobile"
                label="Mobile Number"
                variant="outlined"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
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
              <div className="login-text">Already have an account? <Link to="/user-login"> Sign In</Link></div>
              <a href="/user-signup/customer">
                <button type="submit"><Link to="/user-signup/customer">Sign Up</Link></button></a>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
}

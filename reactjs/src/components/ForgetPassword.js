import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import './ForgetPassword.css'; // Import the CSS file
import bgimage from '../assets/Backimage1.jpg'; // Import the background image

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const navigate = useNavigate(); // Initialize useNavigate hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      setSuccessMessage('');
      return;
    }

    const resetData = {
      email: email,
      newPassword: password,
    };

    try {
      const response = await fetch('http://localhost:8081/api/user/passwordReset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resetData),
      });

      if (response.ok) {
        setErrorMessage('');
        setSuccessMessage('Password updated successfully.');

        // Navigate to login page after 5 seconds
        setTimeout(() => {
          navigate('/login');
        }, 5000); // 5000 milliseconds = 5 seconds
      } else {
        const result = await response.json();
        setErrorMessage(result.message || 'Something went wrong.');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('Failed to update password. Please try again.');
      setSuccessMessage('');
    }
  };

  const background = {
    backgroundImage: `url(${bgimage})`,
    backgroundSize: 'contain',
    backgroundPosition: 'right center',
    backgroundRepeat: 'no-repeat',
    boxSizing: 'border-box',
    backgroundColor: "#e5b78a",
    height: "100vh",
    position: "relative",
  };

  return (
    <div style={background}>
      <div className="forget-password-container">
        <h2>Forget Password</h2>

        {errorMessage && <div className="alert">{errorMessage}</div>}
        {successMessage && (
          <div className="alert" style={{ color: 'green' }}>
            {successMessage}
            <br />
            You will be redirected to the login page in 5 seconds...
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>New Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;

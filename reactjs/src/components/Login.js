// src/Login.js
import React, { useState } from 'react';
import Nav from './Nav'
import { useNavigate,Link } from 'react-router-dom';
import './Login.css';
import bgimage from '../assets/Backimage1.jpg'


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const background = {
    backgroundImage: `url(${bgimage})`,
    backgroundSize: 'contain',
    backgroundPosition: 'right center',
    backgroundRepeat: 'no-repeat',
    boxSizing: 'border-box',
    backgroundColor: "#e5b78a",
    height: "100vh",
    position: "relative"
  }


    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch('http://localhost:8081/api/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
    
      if (response.ok ) {  //&& result === 'true'
        console.log('Login successful');
        const user = await response.json();
        localStorage.setItem('user',JSON.stringify(user));
        console.log(JSON.parse(localStorage.getItem('user')));

        setErrorMessage(''); // Clear error message
        navigate('/Dashboard-page'); // Navigate to welcome page
      } else {
        setErrorMessage('Invalid credentials'); // Show error if login fails
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('An error occurred. Please try again.');
    }
  };
  
  return (
    <div style = {background}>
      <Nav />
      <div className="login-container">
      <h2 style={{textAlign: 'center'}}>Login</h2>
      {errorMessage && <div
          className="error-message"
          style={{
            color: "red",
            textAlign: "center",
            marginBottom: "15px",
            fontSize: "22px" // Optional: Adds spacing between error and form
          }}
        >{errorMessage}</div>} {/* Display error */}
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
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
        </div>
        
        <br></br>
        <p style={{ textAlign: 'center' }}>
          <Link to="/forget-password">Forget password?</Link>
        </p>
        <button type="submit">Login</button>
      </form>
      
      <p className="signup-prompt" style={{textAlign: 'center', marginTop:'16px'}}>
        Don't have an account? <Link to="/register">Sign up</Link>
      </p>
    </div>
    </div>
  );
};

export default Login;

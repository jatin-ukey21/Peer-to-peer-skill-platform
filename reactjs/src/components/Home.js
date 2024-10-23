// src/Home.js
import React from 'react';
import Nav from './Nav'
import { Link } from 'react-router-dom';
import './Home.css';
import bgimage from '../assets/Backimage1.jpg'

const Home = () => {
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
  return (
    <div style = {background}>
      <Nav />
      <div className="home">
      <br></br>
      <br></br>
      <br></br>
      <h1><b>Welcome to Peer-to-Peer</b></h1>
      <h1><b>Skill Exchange</b></h1> 
      <h1><b>Platform</b></h1>
      <br></br>
      <h3><b>Your skills are valuable! Connect and</b></h3>
      <h3><b> exchange skills with others.</b></h3>
      <Link to="/login" className="get-started-button"><b>Get Started</b></Link>
    </div>
  </div>
  );
};

export default Home;

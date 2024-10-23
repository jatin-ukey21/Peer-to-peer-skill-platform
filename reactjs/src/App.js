// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import UserProfile from './components/UserProfile';
import AvailableSlots from './components/AvailableSlots';
import ReceivedSessionRequests from './components/ReceivedSessionRequests';
import SkillSearchDiscovery from './components/SkillSearchDiscovery';
import ReviewsRatings from './components/ReviewsRatings';
import JoinSessionButton from './components/JoinSessionButton';
import RoomPage from './Pages/Room';
import ForgetPassword from './components/ForgetPassword';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/register" element={<Register />} />
          
          {/* User Profile and Subsections */}
          <Route path="/dashboard-page" element={<Dashboard />} />
          <Route path="/user-profile" element={<UserProfile />}/>
          <Route path="/available-slots" element={<AvailableSlots />} />
          <Route path="/recieved-sessions" element={<ReceivedSessionRequests />} />
          <Route path="/ratings-reviews" element={<ReviewsRatings />} />
          <Route path="/skill-match-suggestions" element={<SkillSearchDiscovery />} />
          <Route path="/join-session" element={<JoinSessionButton/>}/>
          <Route path = '/room/:roomId' element = {<RoomPage />} /> 
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;

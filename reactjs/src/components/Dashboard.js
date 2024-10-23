import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserProfile from './UserProfile';
import AvailableSlots from './AvailableSlots';
import ReceivedSessionRequests from './ReceivedSessionRequests';
import ReviewsRatings from './ReviewsRatings';
import SkillSearchDiscovery from './SkillSearchDiscovery';
import SkillDetail from './SkillPage';
import JoinSessionButton from './JoinSessionButton';
import './Dashboard.css';

const Dashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState('UserProfile');
  const [selectedSkill, setSelectedSkill] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const renderComponent = () => {
    if (selectedSkill) {
      return <SkillDetail skill={selectedSkill} goBack={() => setSelectedSkill(null)} />;
    }

    switch (selectedComponent) {
      case 'UserProfile':
        return <UserProfile onLogout={handleLogout} />;
      case 'AvailableSlots':
        return <AvailableSlots />;
      case 'ReceivedSessionRequests':
        return <ReceivedSessionRequests />;
      case 'ReviewsRatings':
        return <ReviewsRatings />;
      case 'SkillSearchDiscovery':
        return <SkillSearchDiscovery onSkillClick={setSelectedSkill} />;
      case 'JoinSessionButton':
        return <JoinSessionButton />;
      default:
        return <UserProfile onLogout={handleLogout} />;
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-navbar">
        <ul>
          <li className={selectedComponent === 'UserProfile' ? 'active' : ''} onClick={() => {
            setSelectedComponent('UserProfile');
            setSelectedSkill(null);
          }}>
            User Profile
          </li>
          <li className={selectedComponent === 'AvailableSlots' ? 'active' : ''} onClick={() => {
            setSelectedComponent('AvailableSlots');
            setSelectedSkill(null);
          }}>
            Available Slots
          </li>
          <li className={selectedComponent === 'ReceivedSessionRequests' ? 'active' : ''} onClick={() => {
            setSelectedComponent('ReceivedSessionRequests');
            setSelectedSkill(null);
          }}>
            Received Session Requests
          </li>
          <li className={selectedComponent === 'ReviewsRatings' ? 'active' : ''} onClick={() => {
            setSelectedComponent('ReviewsRatings');
            setSelectedSkill(null);
          }}>
            Reviews & Ratings
          </li>
          <li className={selectedComponent === 'SkillSearchDiscovery' ? 'active' : ''} onClick={() => {
            setSelectedComponent('SkillSearchDiscovery');
            setSelectedSkill(null);
          }}>
            Skill Search & Discovery
          </li>
          <li className={selectedComponent === 'JoinSessionButton' ? 'active' : ''} onClick={() => {
            setSelectedComponent('JoinSessionButton');
            setSelectedSkill(null);
          }}>
            Join Session Button
          </li>
        </ul>
        <div className="logout-container">
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <div className="dashboard-content">
        {renderComponent()}
      </div>
    </div>
  );
};

export default Dashboard;

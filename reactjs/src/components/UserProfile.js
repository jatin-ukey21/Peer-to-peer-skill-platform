import React, { useEffect, useState } from 'react';
import './UserProfile.css'; // Import the CSS file


const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch the user object from localStorage
    const storedUser = localStorage.getItem('user');
    
    // Check if user data exists
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      console.error('No user data found in localStorage');
    }
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img
          className="profile-image"
          src={`data:image/png;base64,${user.profilePicture}`} 
          alt="Profile"
        />
        <h2 className="profile-name">{user.name}</h2>
        <p className="profile-bio">{user.bio}</p>
        <p><strong>Experience Level:</strong> {user.experienceLevel}</p>
        <p><strong>College Name:</strong> {user.collegeName}</p>

        <div className="profile-section">
          <h3>Skills Offered</h3>
          <ul>
            {user.skillsOffered?.map(skill => (
              <li key={skill.name} className="skill-item">{skill.name}</li>
            )) || <p>No skills offered</p>}
          </ul>
        </div>

        <div className="profile-section">
          <h3>Skills to Learn</h3>
          <ul>
            {user.skillsToLearn?.map(skill => (
              <li key={skill.name} className="skill-item">{skill.name}</li>
            )) || <p>No skills to learn</p>}
          </ul>
        </div>
      </div>

      {/* Join Session button */}
      {/* <button className="join-session-button" onClick={onJoinSession}>Join Session</button> */}
    </div>
  );
};

export default UserProfile;

import React, { useState, useEffect } from 'react';
import './SearchSkillDiscovery.css';

const skillImages = {
  'Java': '/assets/java_image.png',
  'Python': '/assets/python_image.jpg',
  'Android Development': '/assets/andorid_image.jpeg',
  'React JS': '/assets/reactjs_image.jpeg',
  'Html Css Javascript': '/assets/html_image.png',
  'CPP': '/assets/CPP_Language_img.png',
  'Graphic Design': '/assets/graphic_design_image.jpg',
};

const SearchSkillDiscovery = ({ onSkillClick }) => {
  const [skillsToLearn, setSkillsToLearn] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); 
  const [dropdownVisible, setDropdownVisible] = useState(false); // To toggle dropdown visibility

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setSkillsToLearn(userData.skillsToLearn || []);
    } else {
      console.error('No user data found in localStorage');
    }
  }, []);

  // Remove filtering from skill display, keep all skills visible
  const filteredSkills = skillsToLearn.filter(skill =>
    skill.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const allSkills = Object.keys(skillImages); // All available skills

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setDropdownVisible(value.length > 0); // Show dropdown if there is a search term
  };

  const handleSkillSelect = (skill) => {
    setSearchTerm(skill.name); // Set search term to selected skill name
    setDropdownVisible(false); // Hide dropdown
    onSkillClick({ name: skill, category: '', description: '' }); // Trigger click event
  };

  return (
    <div className="course-container">
      <input
        type="text"
        placeholder="Search for skills..."
        className="search-bar"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {dropdownVisible && (
        <div className="dropdown-list">
          {allSkills.filter(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())).map((skill, index) => (
            <div
              key={index}
              className="dropdown-item"
              onClick={() => handleSkillSelect(skill)} // Use skill name directly
            >
              {skill}
            </div>
          ))}
        </div>
      )}
      <div className="skills-grid">
        {skillsToLearn.length > 0 ? (
          skillsToLearn.map((skill, index) => (
            <div
              key={index}
              className="course-box"
              onClick={() => onSkillClick(skill)}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={skillImages[skill.name] || '/assets/default_image.jpg'}
                alt={skill.name}
                className="course-image"
              />
              <div className="course-name">{skill.name}</div>
              <div className="course-category">{skill.category}</div>
              <p className="course-description">{skill.description}</p>
            </div>
          ))
        ) : (
          <p>No skills to learn found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchSkillDiscovery;
/*buri buri buri*/
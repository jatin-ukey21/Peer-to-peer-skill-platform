import React, { useState, useEffect } from 'react';
import SessionBooking from './SessionBooking'; // New booking component
import './SkillPage.css'; // Import the updated CSS file

const SkillPage = ({ skill, goBack }) => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null); // Track the selected teacher for booking

  // Fetch user from localStorage
  const user = JSON.parse(localStorage.getItem('user')); // Retrieve the user object
  const userId = user ? user.id : null; // Get the current logged-in user's ID

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        // Include userId in the request to avoid showing current user's data
        const response = await fetch(`http://localhost:8081/api/match/findTeachers?skillToLearn=${skill.name}&userId=${userId}`);
        if (response.ok) {
          const data = await response.json();
          setTeachers(data);
        } else {
          throw new Error('Error fetching teachers');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTeachers();
  }, [skill.name, userId]);

  if (loading) {
    return <p>Loading teachers...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // If a teacher is selected, render the session booking component
  if (selectedTeacher) {
    const learnerId = userId; // The learner ID is the current logged-in user

    return (
      <SessionBooking
        sessionDetails={{
          teacherId: selectedTeacher.id,
          teacherName: selectedTeacher.name,
          skillName: skill.name,
          learnerId: learnerId, // Pass learner ID here
          availableTimeSlots: selectedTeacher.availableTimeSlots || [],
        }}
        goBack={() => setSelectedTeacher(null)} // Go back to teacher list
      />
    );
  }

  return (
    <div className="skill-page-container">
      {/* Back button */}
      <button className="back-button" onClick={goBack}>
        Back to Skill Discovery
      </button>

      {/* Skill title */}
      <h2 className="skill-title">{skill.name}</h2>

      {/* Teachers header */}
      <h3 className="teachers-header">Teachers for {skill.name}:</h3>

      {/* Teachers list */}
      {teachers.length > 0 ? (
        <div className="teachers-list">
          {teachers.map((teacher) => (
            <div key={teacher.id} className="teacher-card">
              <p className="teacher-name">{teacher.name}</p>
              <p><strong>Experience Level:</strong> {teacher.experienceLevel}</p>
              {/* Book session button */}
              <button 
                className="book-session-button" 
                onClick={() => setSelectedTeacher(teacher)}
              >
                Book Session
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No teachers found for this skill.</p>
      )}
    </div>
  );
};

export default SkillPage;

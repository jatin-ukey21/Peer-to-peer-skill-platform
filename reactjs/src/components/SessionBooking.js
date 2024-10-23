import React, { useState } from 'react';

const SessionBooking = ({ sessionDetails, goBack }) => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [proposeddate, setProposedDate] = useState('');

  const handleTimeSlotChange = (e) => setSelectedTimeSlot(e.target.value);
  const handleDateChange = (e) => setProposedDate(e.target.value);

  console.log(proposeddate);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sessionRequest = {
      teacherId: sessionDetails.teacherId, // Updated to use teacherId
      learnerId: sessionDetails.learnerId, // Include learner ID
      skillName: sessionDetails.skillName,
      proposedDate: proposeddate,
      timing: selectedTimeSlot,
      active: true,
    };

    try {
      const response = await fetch('http://localhost:8081/api/session/bookSession', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sessionRequest),
      });

      if (response.ok) {
        alert('Session booked successfully!');
      } else {
        alert('Failed to book session. Please try again.');
      }
    } catch (error) {
      console.error('Error booking session:', error);
    }
  };

  return (
    <div>
      <button onClick={goBack}>Back to Teacher List</button>
      <h1>Booking Session with {sessionDetails.teacherName}</h1>
      <p><strong>Teacher ID:</strong> {sessionDetails.teacherId}</p>
      <p><strong>Learner ID:</strong> {sessionDetails.learnerId}</p> {/* Display learner ID */}
      <p><strong>Skill Name:</strong> {sessionDetails.skillName}</p>
      <form onSubmit={handleSubmit}>
        <label>Select Time Slot:</label>
        <select value={selectedTimeSlot} onChange={handleTimeSlotChange} required>
          <option value="">Select a time slot</option>
          {sessionDetails.availableTimeSlots.map((slot, index) => (
            <option key={index} value={slot}>{slot}</option>
          ))}
        </select>

        <label>Select Date:</label>
        <input type="date" value={proposeddate} onChange={handleDateChange} required />

        <button type="submit">Book Session</button>
      </form>
    </div>
  );
};

export default SessionBooking;

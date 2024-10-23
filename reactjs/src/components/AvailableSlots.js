import React, { useState,useEffect } from 'react';
import Select from 'react-select';
import './AvailableSlots.css';

const AvailableSlots = ({ currentSlots, onSaveSlots }) => {
  const [selectedSlots, setSelectedSlots] = useState(currentSlots || []);
  const [userId, setUserId] = useState(null);

  const options = [
    { value: '5:00 - 6:00 pm', label: '5:00 - 6:00 pm' },
    { value: '8:30 - 9:30 am', label: '8:30 - 9:30 am' },
    { value: '1:30 - 2:30 pm', label: '1:30 - 2:30 pm' },
    { value: '3:00 - 4:00 pm', label: '3:00 - 4:00 pm' },
    { value: '7:00 - 8:00 pm', label: '7:00 - 8:00 pm' },
  ];

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.id) {
      setUserId(user.id);
    } else {
      console.error('User not found in localStorage');
    }
  }, []);

  const handleSlotChange = (selectedOptions) => {
    setSelectedSlots(selectedOptions || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedSlotValues = selectedSlots.map(slot => slot.value); // Convert selected options to values

    const payload = {
      id: userId,
      availableTimeSlots: selectedSlotValues
    };

    try {
      const response = await fetch('http://localhost:8081/api/user/slots/updateAvailableSlots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        alert('Available slots updated successfully!');
      } else {
        alert('Failed to update slots. Please try again.');
      }
    } catch (error) {
      console.error('Error updating available slots:', error);
    }
  };


  return (
    <div className="available-slots-container">
      <h2>Select Available Slots</h2>
      <form onSubmit={handleSubmit}>
        <Select
          isMulti
          value={selectedSlots}
          onChange={handleSlotChange}
          options={options}
          className="slot-select"
        />
        <button type="submit" className="save-slots-button">Save Slots</button>
      </form>
    </div>
  );
};

export default AvailableSlots;

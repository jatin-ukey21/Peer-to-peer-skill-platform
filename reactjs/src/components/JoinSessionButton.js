import React, { useState, useCallback } from 'react';
import './JoinSessionButton.css'; // Assuming you're using CSS for styling

const JoinSessionButton = () => {
    const [roomId, setRoomId] = useState(''); // room ID state


    // Function to validate the room ID
    const validateRoomId = async (id) => {
        try {
            const response = await fetch(`http://localhost:8081/api/session/validateRoomId?roomId=${id}`);
            if (response.ok) {
                const isValid = await response.json();
                return isValid;
            } else {
                console.error('Error validating room ID:', response.statusText);
                return false;
            }
        } catch (error) {
            console.error('Error during room ID validation:', error);
            return false;
        }
    };

    // Handle room join using useCallback to avoid unnecessary re-renders
    const handleRoomJoin = useCallback(async () => {
        if (roomId) {
            const isValid = await validateRoomId(roomId);
            if (isValid) {
                alert("Room Id is valid");
                window.open(`/room/${roomId}`, '_blank'); // Join the room if valid
            } else {
                alert('Invalid Room ID. Please enter a valid Room ID.'); // Show alert for invalid room ID
            }
        } else {
            alert('Please enter a Room ID'); // Validation
        }
    }, [roomId]);

    return (
        <div className="join-session-container">
            <h2>Join a Session</h2>
            <label htmlFor="room-id" style={{margin:"10px"}}>Room ID:</label>
            <input
                type="text"
                id="room-id"
                value={roomId}
                onChange={e => setRoomId(e.target.value)} // Set room ID on input change
                placeholder="Enter Room ID"
            />
            <button onClick={handleRoomJoin} style={{ width: '200px', backgroundColor: 'red', padding:'8px 3px', borderRadius:'8px', color:'white', fontSize:'14px'}}>
                Join
            </button>
        </div>
    );
};

export default JoinSessionButton;

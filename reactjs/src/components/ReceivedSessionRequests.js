import React, { useEffect, useState } from 'react';
import './ReceivedSessionRequests.css'; // Assume a CSS file for styling

const ReceivedSessionRequests = () => {
    const [sessionRequests, setSessionRequests] = useState([]);
    const [disabledButtons, setDisabledButtons] = useState({}); // Track disabled buttons

    // Fetching data from the backend
    const fetchSessionRequests = async () => {
        const userId = JSON.parse(localStorage.getItem('user')).id;
        console.log('Fetching for userId:', userId);  // Log the userId
        try {
            const response = await fetch(`http://localhost:8081/api/session/pendingRequests?teacherId=${userId}`);
            console.log('Response:', response);  // Log the response object
            if (response.ok) {
                const data = await response.json();
                console.log('Session data:', data);  // Log the data
                setSessionRequests(data);
            } else {
                console.error('Failed to fetch session requests:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching session requests:', error);
        }
    };
    

    useEffect(() => {
        fetchSessionRequests();
    }, []);

    // Generate a room ID (you can modify this logic as per your requirements)
    const generateRoomId = () => {
        return `room-${Date.now()}`; // Example: simple room ID generation
    };

    // Handle confirm or reject action
    const handleAction = async (sessionId, isConfirmed) => {
        try {
            let roomId = null;

            if (isConfirmed) {
                roomId = generateRoomId();
            }

            const response = await fetch(`http://localhost:8081/api/session/confirmSession?sessionId=${sessionId}&isConfirmed=${isConfirmed}${roomId ? `&roomId=${roomId}` : ''}`, {
                method: 'PUT'
            });

            if (response.ok) {
                if (isConfirmed) {
                    alert("Session confirmed successfully!");
                } else {
                    alert("Session rejected successfully!");
                }
    
                // Disable the corresponding buttons after action
                setDisabledButtons((prev) => ({
                    ...prev,
                    [sessionId]: true,
                }));
            } else {
                console.error('Error updating session:', await response.text());
            }
        } catch (error) {
            console.error('Error during session update:', error);
        }
    };

    return (
        <div className="session-requests-container">
            <h1>Received Session Requests</h1>
            <table className="session-requests-table">
                <thead>
                    <tr>
                        <th>Learner Name</th>
                        <th>Skill Name</th>
                        <th>Timing</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sessionRequests.map((request) => (
                        <tr key={request.id}>
                            <td>{request.learnerName}</td>
                            <td>{request.skillName}</td>
                            <td>{request.timing}</td>
                            <td>{request.proposedDate}</td>
                            <td>
                                <button
                                    className="confirm-btn"
                                    onClick={() => handleAction(request.id, true)}
                                    disabled={disabledButtons[request.id]}
                                >
                                    Confirm
                                </button>
                                <button
                                    className="reject-btn"
                                    onClick={() => handleAction(request.id, false)}
                                    disabled={disabledButtons[request.id]}
                                >
                                    Reject
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReceivedSessionRequests;

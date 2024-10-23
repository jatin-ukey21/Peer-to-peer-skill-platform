import React, { useEffect, useRef,useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import FeedbackForm from '../../components/FeedbackForm';
import "./RoomPage.css"; // Import the CSS file


const RoomPage = () => {
    const { roomId } = useParams();
    const meetingRef = useRef(null);
    const hasJoinedRoom = useRef(false); // Track if joinRoom was already called
    const currentRoleRef = useRef(""); // Store role in a ref to avoid stale state issues
    const navigate = useNavigate();

    const [showFeedbackForm, setShowFeedbackForm] = useState(false);
    const [sessionData, setSessionData] = useState(null);


    useEffect(() => {
        let isMounted = true; // Track component mount status

        const fetchSessionDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8081/api/session/${roomId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch session details");
                }

                const currentSession = await response.json();
                localStorage.setItem('currentSession', JSON.stringify(currentSession));

                const user = JSON.parse(localStorage.getItem('user'));
                const loggedInUserId = user?.id;

                if (isMounted) {
                    if (currentSession.learnerId === loggedInUserId) {
                        console.log("User is learner.");
                        currentRoleRef.current = "learner"; // Store role in ref
                    } else {
                        console.log("User is teacher.");
                        currentRoleRef.current = "teacher"; // Store role in ref
                    }
                    setSessionData(currentSession);
                }
            } catch (error) {
                console.error("Error fetching session details:", error);
            }
        };

        fetchSessionDetails();

        const stopMediaTracks = () => {
            console.log("Stopping media tracks...");
        
            // Iterate through all media devices and stop them
            const streams = navigator.mediaDevices.getUserMedia({ audio: true, video: true });
            streams
                .then((mediaStream) => {
                    mediaStream.getTracks().forEach((track) => {
                        console.log(`Stopping track: ${track.kind}`);
                        track.stop(); // Stop each track (audio/video)
                    });
                })
                .catch((error) => console.error("Error stopping media tracks:", error));
        };
        

        const myMeeting = async () => {
            if (hasJoinedRoom.current) return;
            hasJoinedRoom.current = true;

            const appID = 709915362;
            const serverSecret = "32dae17be6c253bddbf4946d72ad9830";
            const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
                appID,
                serverSecret,
                roomId,
                Date.now().toString(),
                "Tanishq Sawarkar"
            );

            const zc = ZegoUIKitPrebuilt.create(kitToken);
            if (zc) {
                zc.joinRoom({
                    container: meetingRef.current,
                    sharedLinks: [
                        {
                            name: 'Copy Link',
                            url: `http://localhost:3000/room/${roomId}`,
                        },
                    ],
                    scenario: {
                        mode: ZegoUIKitPrebuilt.OneONoneCall,
                    },
                    showScreenSharingButton: true,
                    onLeaveRoom: async () => {
                        console.log("Leaving the room...");
                        console.log("Current Session Role:", currentRoleRef.current); // Use ref value
                        
                        
                        stopMediaTracks();

                        if (currentRoleRef.current === "learner") {
                            console.log("Opening feedback form for learner...");
                            await new Promise((resolve) => setTimeout(resolve, 100)); // Ensure state consistency
                            setShowFeedbackForm(true);
                        } else {
                            console.log("Redirecting teacher to home page...");
                            navigate('/');
                        }
                    },
                });

            } else {
                console.error("ZegoCloud object is undefined.");
            }
        };

        myMeeting();

        return () => {
            isMounted = false; // Cleanup when component unmounts
        };
    }, [roomId, navigate]);

    return (
        <div>
            {!showFeedbackForm ? (
                <div ref={meetingRef} className={"room-container"}/>
            ) : (
                <FeedbackForm roomId={roomId} onComplete={() => navigate('/')} />
            )}
        </div>
    );

    // return (
    //     <div className={`room-container ${isJoined ? 'joined' : ''}`}>
    //         {!showFeedbackForm ? (
    //             <div className="meeting-container" ref={meetingRef} />
    //         ) : (
    //             <FeedbackForm roomId={roomId} onComplete={() => navigate('/')} />
    //         )}
    //     </div>
    // );
    
};

export default RoomPage;

/* old code */

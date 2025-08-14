# ⭐Peer-to-Peer Skill Exchange Platform  

A web-based platform designed to facilitate skill-sharing and collaboration among users. This platform allows individuals to list skills they want to teach or learn, connect with suitable peers, schedule learning sessions, and conduct video conferencing for real-time interaction.  

## Features  

- **User Profiles**: Create and update user profiles with details such as skills to teach, skills to learn, experience level, and more.  
- **Skill Listing**: Users can list skills they wish to teach and learn, forming the basis for skill matching.  
- **Skill Matching Algorithm**: Connect learners with teachers based on complementary skill sets.  
- **Session Management**: Schedule learning sessions with ease and receive notifications and reminders.  
- **Video Conferencing Integration**: Conduct real-time learning sessions using the Zegocloud API.  


## Technologies Used  

- **Frontend**: React.js  
- **Backend**: Spring Boot  
- **Database**: MongoDB  
- **Video Conferencing**: Zegocloud API  


## Installation and Setup  

1. Clone the repository:  
   ```bash  
   git clone https://github.com/jatin-ukey21/Peer-to-peer-skill-platform.git  
   cd skill-exchange-platform  
   ```  

2. Set up the backend (Spring Boot):  
   - Navigate to the `backend` folder.  
   - Configure MongoDB connection in `application.properties`.  
   - Run the Spring Boot application.  

3. Set up the frontend (React.js):  
   - Navigate to the `frontend` folder.  
   - Install dependencies:  
     ```bash  
     npm install  
     ```  
   - Start the React application:  
     ```bash  
     npm start  
     ```  

4. Ensure the Zegocloud API is configured for video conferencing.  

## Usage  

1. **Sign Up**: Create a new user profile and list your skills.  
2. **Skill Matching**: Browse recommended teachers or learners based on your skill preferences.  
3. **Schedule Sessions**: Book sessions with your matched peers at convenient times.  
4. **Real-Time Learning**: Join scheduled video conferencing sessions for skill exchange.  

## Deliverables  

- **Input**: User profiles, skill listings, and session requests.  
- **Output**: Matched users, scheduled sessions, and real-time communication tools.  


## Future Enhancements  

- Implement advanced filtering for skill recommendations.  
- Introduce a rating and feedback system for users.  
- Expand video conferencing features to support group sessions.  

## License  

This project is licensed under the [MIT License](LICENSE).  




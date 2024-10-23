import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Select from 'react-select';
import './Register.css';

// Skill options for the dropdown
const skillsOptions = [
  { id: '1', value: 'Java', label: 'Java', category: 'Programming' },
  { id: '2', value: 'Python', label: 'Python', category: 'Programming' },
  { id: '3', value: 'Android Development', label: 'Android Development', category: 'Mobile' },
  { id: '4', value: 'React JS', label: 'React JS', category: 'Web' },
  { id: '5', value: 'HTML CSS JavaScript', label: 'HTML CSS JavaScript', category: 'Web' },
  { id: '6', value: 'C++', label: 'C++', category: 'Programming' },
  { id: '7', value: 'Graphic Design', label: 'Graphic Design', category: 'Design' },
];

const timeSlotOptions = [
  { value: '8:00 - 9:00 am', label: '8:00 - 9:00 am' },
  { value: '8:30 - 9:30 am', label: '8:30 - 9:30 am' },
  { value: '5:00 - 6:00 pm', label: '5:00 - 6:00 pm' },
  { value: '8:30 - 9:30 pm', label: '8:30 - 9:30 pm' },
  { value: '1:30 - 2:30 pm', label: '1:30 - 2:30 pm' },
  { value: '2:00 - 3:00 pm', label: '2:00 - 3:00 pm' },
  { value: '6:30 - 7:30 pm', label: '6:30 - 7:30 pm' },
  { value: '8:45 - 9:45 pm', label: '8:45 - 9:45 pm' }
  // Add more time slots as needed
];


const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [skillsOffered, setSkillsToOffered] = useState([]);
  const [skillsToLearn, setSkillsToLearn] = useState([]);
  const [experienceLevel, setExperienceLevel] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState(null); // Change to null
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Create a FormData object
    const formData = new FormData();

    // Properly structure the skills for backend consumption
    const userProfile = {
      name,
      email,
      password,
      role,
      skillsOffered: skillsOffered.map((skill) => ({
        id: skill.id,
        name: skill.value,
        category: skill.category,
      })),
      skillsToLearn: skillsToLearn.map((skill) => ({
        id: skill.id,
        name: skill.value,
        category: skill.category,
      })),
       // Add this
      experienceLevel,
      collegeName,
      bio,
    };

    // Append the user profile JSON
    formData.append('user', new Blob([JSON.stringify(userProfile)], { type: 'application/json' }));

    // Append profile picture if available
    if (profilePicture) {
      formData.append('profilePicture', profilePicture);
    }

    try {
      const response = await fetch('http://localhost:8081/api/user/registerUser', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('User registered:', data);
        navigate('/login');
      } else {
        const errorData = await response.json();
        console.error('Error registering user:', errorData);
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="" disabled>Select your role</option>
            <option value="LEARNER">Learner</option>
            <option value="TEACHER">Instructor</option>
          </select>
        </div>

        <div>
          <label>Skills to Offer:</label>
          <Select
            isMulti
            options={skillsOptions}
            value={skillsOffered}
            onChange={(selectedOptions) => setSkillsToOffered(selectedOptions)}
            required
          />
        </div>

        <div>
          <label>Skills to Learn:</label>
          <Select
            isMulti
            options={skillsOptions}
            value={skillsToLearn}
            onChange={(selectedOptions) => setSkillsToLearn(selectedOptions)}
            required
          />
        </div>

        <div>
 
</div>
<br />


        <div>
          <label>Experience Level:</label>
          <select
            value={experienceLevel}
            onChange={(e) => setExperienceLevel(e.target.value)}
            required
          >
            <option value="" disabled>Select experience level</option>
            <option value="BEGINNER">BEGINNER</option>
            <option value="INTERMEDIATE">INTERMEDIATE</option>
            <option value="ADVANCED">ADVANCED</option>
          </select>
        </div>

        <div>
          <label>College Name:</label>
          <input
            type="text"
            value={collegeName}
            onChange={(e) => setCollegeName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Short Bio:</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Profile Picture:</label>
          <input
            type="file"
            onChange={(e) => setProfilePicture(e.target.files[0])}
            accept="image/*" // Limit file types to images only
          />
        </div>

        <button type="submit">Register</button>
      </form>

      <div className="login-redirect">
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;


//export default Register;


/*import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Select from 'react-select';  // Import the Select component
import './Register.css';

const skillsOptions = [
  { value: 'Java', label: 'Java' },
  { value: 'Python', label: 'Python' },
  { value: 'Android Development', label: 'Android Development' },
  { value: 'React JS', label: 'React JS' },
  { value: 'HTML CSS JavaScript', label: 'HTML CSS JavaScript' },
  { value: 'C++', label: 'C++' },
  { value: 'Graphic Design', label: 'Graphic Design' }
];

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [skillsToOffered, setSkills] = useState([]);
  const [skillsToLearn, setSkillsToLearn] = useState([]);
  const [experienceLevel, setExperienceLevel] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  const navigate = useNavigate();
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
  
    // Create a FormData object to include both user data and the file
    const formData = new FormData();
    const userProfile = {
      name,
      email,
      password,
      role,
      skillsToOffered: skillsToOffered.map(skill => skill.value),
      skillsToLearn: skillsToLearn.map(skill => skill.value),
      experienceLevel,
      collegeName,
      bio
    };
  
    // Append the JSON userProfile to the form data
    formData.append("user", new Blob([JSON.stringify(userProfile)], { type: "application/json" }));
  
    // Append the profile picture file
    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }
  
    try {
      const response = await fetch('http://localhost:8081/api/user/registerUser', {
        method: 'POST',
        body: formData, // Send the FormData object
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('User registered:', data);
        navigate('/login');  // Redirect to login page after registration
      } else {
        const errorData = await response.json();
        console.error('Error registering user:', errorData);
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('An error occurred. Please try again.');
    }
  };
  

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <br />

        <div>
          <label>Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="" disabled>Select your role</option>
            <option value="LEARNER">Learner</option>
            <option value="TEACHER">Instructor</option>
          </select>
        </div>
        <br />

        
        <div>
          <label>Primary Skills (Can Teach):</label>
          <Select
            isMulti
            options={skillsOptions}
            value={skillsToOffered}
            onChange={(selectedOptions) => setSkills(selectedOptions)}
            required
          />
        </div>
        <br />

       
        <div>
          <label>Skills You Want to Learn:</label>
          <Select
            isMulti
            options={skillsOptions}
            value={skillsToLearn}
            onChange={(selectedOptions) => setSkillsToLearn(selectedOptions)}
            required
          />
        </div>
        <br />

        <div>
          <label>Experience Level:</label>
          <select value={experienceLevel} onChange={(e) => setExperienceLevel(e.target.value)} required>
            <option value="" disabled>Select experience level</option>
            <option value="BEGINNER">BEGINNER</option>
            <option value="INTERMEDIATE">INTERMEDIATE</option>
            <option value="ADVANCED">ADVANCED</option>
          </select>
        </div>
        <br />

        <div>
          <label>College Name:</label>
          <input
            type="text"
            value={collegeName}
            onChange={(e) => setCollegeName(e.target.value)}
            required
          />
        </div>
        <br />

        <div>
          <label>Short Bio:</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Briefly describe your skills and interests"
            required
          />
        </div>
        <br />

        <div>
          <label>Profile Picture (Optional):</label>
          <input
            type="file"
            onChange={(e) => setProfilePicture(e.target.files[0])}
          />
        </div>
        <br />

        <button type="submit">Register</button>
      </form>

      
      <div className="login-redirect">
        <p>Already have an account? <Link to="/login" className="login-link">Login</Link></p>
      </div>
    </div>
  );
};

export default Register;  */

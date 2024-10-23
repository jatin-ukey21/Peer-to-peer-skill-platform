import React, { useEffect, useState } from 'react';

const ReviewsRatings = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the reviews data from the backend API
  const fetchReviews = async () => {
    try {
      // Get the teacherId from local storage
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const teacherId = storedUser?.id;

      if (!teacherId) {
        throw new Error('Teacher ID not found in local storage');
      }

      const response = await fetch(`http://localhost:8081/api/tutor/sessions/${teacherId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }

      const data = await response.json();
      setReviews(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  // Use useEffect to fetch data on component mount
  useEffect(() => {
    fetchReviews();
  }, []);

  if (loading) {
    return <div>Loading reviews...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Tutor Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews found for this tutor.</p>
      ) : (
        <ul>
          {reviews.map((review, index) => (
            <li key={index} style={styles.reviewItem}>
              <p><strong>Skill Name:</strong> {review.skillName}</p>
              <p><strong>Learner Name:</strong> {review.learnerName}</p>
              <p><strong>Feedback:</strong> {review.feedback}</p>
              <p><strong>Rating:</strong> {review.rating}/5</p>
              <p><strong>Date Conducted:</strong> {review.conductedDate}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// CSS styles in JS
const styles = {
  reviewItem: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '10px',
    marginBottom: '10px',
    backgroundColor: '#f9f9f9',
  },
};

export default ReviewsRatings;

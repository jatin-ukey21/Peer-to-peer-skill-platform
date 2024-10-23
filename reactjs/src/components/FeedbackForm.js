import React, { useState } from "react";
import "./FeedbackForm.css"; // Import the new CSS

const FeedbackForm = ({ roomId, onComplete }) => {
    const [feedback, setFeedback] = useState("");
    const [rating, setRating] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const storedSession = JSON.parse(localStorage.getItem("currentSession"));
        if (!storedSession) {
            alert("No session data found.");
            return;
        }

        console.log(storedSession);

        try {
            const response = await fetch("http://localhost:8081/api/sessionComplete/submitFeedback", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    sessionId: storedSession.sessionId,
                    tutorId: storedSession.teacherId,
                    feedback,
                    rating: parseFloat(rating),
                }),
            });

            if (response.ok) {
                alert("Thank you for your feedback!");
                onComplete();
            } else {
                alert("Failed to submit feedback. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting feedback:", error);
            alert("Failed to submit feedback. Please try again.");
        }
    };

    return (
        <div className="feedback-form-container">
            <h2>Thank You for Attending!</h2>
            <p>We hope you had a great session. Please leave your feedback below:</p>

            <form onSubmit={handleSubmit}>
                <label className="feedback-label">
                    Feedback:
                    <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        className="feedback-input"
                        placeholder="Enter your feedback here..."
                        required
                    />
                </label>

                <label className="rating-label">
                    Rating (out of 5):
                    <input
                        type="number"
                        min="0"
                        max="5"
                        step="0.1"  // Allow increments of 0.1 for floating-point input
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        className="rating-input"
                        required
                    />
                </label>

                <button type="submit" className="submit-button">
                    Submit Feedback
                </button>
            </form>
        </div>
    );
};

export default FeedbackForm;

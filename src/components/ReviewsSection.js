// ReviewsSection.js
import React from 'react';
import './ReviewsSection.css';

// Import review images
import reviewImage1 from '../assets/images/review1.png';
import reviewImage2 from '../assets/images/review2.png';
import reviewImage3 from '../assets/images/review3.png';

const ReviewsSection = () => {
  return (
    <div className="reviews-section">
      <h2>Avis client</h2>
      <div className="reviews-container">
        <img src={reviewImage1} alt="Review 1" className="review-image" />
        <img src={reviewImage2} alt="Review 2" className="review-image" />
        <img src={reviewImage3} alt="Review 3" className="review-image" />
      </div>
    </div>
  );
};

export default ReviewsSection;

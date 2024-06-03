/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';

interface ReviewComponentProps {
    name: string;
  }
  
  const ReviewComponent: React.FC<ReviewComponentProps> = ({ name }) => {
    const [rating, setRating] = useState(0);
    const [message, setMessage] = useState('');
  

  const handleRating = (rate: React.SetStateAction<number>) => {
    setRating(rate);
  };

  const handleSubmit = () => {
    console.log(`Rating: ${rating}, Message: ${message}`);
  };

  return (
    <div className="relative max-w-sm p-4 mx-auto bg-white rounded-lg shadow-md">
      <div className="absolute top-0 right-2">
        <button className="text-black bg-white text-4xl" onClick={() => { console.log('Close'); }}>
          &times;
        </button>
      </div>
      <div className="text-center mt-2">
        <h2 className="text-xl font-semibold text-black">Leave a Review</h2>
        <p className="text-xs">for {name}</p>
      </div>
      <div className="flex justify-center mt-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-10 h-8 cursor-pointer ${rating >= star ? 'text-yellow-300' : 'text-gray-500'}`}
            fill={rating >= star ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => handleRating(star)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
            />
          </svg>
        ))}
      </div>
      <p className="mt-2 text-center text-xs text-gray-400">tap a star to rate</p>
      <label className="mt-6 block text-sm font-medium text-gray-700">Message (optional)</label>
      <textarea
          className="w-full mt-1 p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-0"
          rows={8}
          placeholder="Describe your experience working with this creator..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      <button
        className={`w-full mt-4 p-2 text-xs font-semibold rounded-md text-white ${rating > 0 ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300 cursor-not-allowed'}`}
        onClick={handleSubmit}
        disabled={rating === 0}
      >
        Submit review
      </button>
    </div>
  );
};

export default ReviewComponent;

// src/ImageSelection.js
import React, { useState } from 'react';

const tops = [
  'top1.jpg', 'top2.jpg', 'top3.jpg'
];

const bottoms = [
  'bottom1.jpg', 'bottom2.jpg', 'bottom3.jpg'
];

const ImageSelection = ({ userId }) => {
  const [selectedTop, setSelectedTop] = useState('');
  const [selectedBottom, setSelectedBottom] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      userId,
      selectedTop,
      selectedBottom,
    };

    try {
      const response = await fetch('http://localhost:3000/submit-selection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log('Selection submitted:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Select Your Outfit</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <h3>Tops</h3>
          {tops.map((top) => (
            <label key={top}>
              <input
                type="radio"
                name="top"
                value={top}
                checked={selectedTop === top}
                onChange={() => setSelectedTop(top)}
                required
              />
              <img src={`/images/tops/${top}`} alt={top} width="100" />
            </label>
          ))}
        </div>
        <div>
          <h3>Bottoms</h3>
          {bottoms.map((bottom) => (
            <label key={bottom}>
              <input
                type="radio"
                name="bottom"
                value={bottom}
                checked={selectedBottom === bottom}
                onChange={() => setSelectedBottom(bottom)}
                required
              />
              <img src={`/images/bottoms/${bottom}`} alt={bottom} width="100" />
            </label>
          ))}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ImageSelection;
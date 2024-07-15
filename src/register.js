// src/Register.js
import React, { useState } from 'react';
import ImageSelection from './ImageSelection';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedChallenges, setSelectedChallenges] = useState([]);
  const [showImageSelection, setShowImageSelection] = useState(false);
  const [userId, setUserId] = useState(null);

  const handleCheckboxChange = (challengeId) => {
    setSelectedChallenges((prev) =>
      prev.includes(challengeId)
        ? prev.filter((id) => id !== challengeId)
        : [...prev, challengeId]
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      name,
      email,
      challenges: selectedChallenges,
    };

    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setUserId(data.userId);
      setShowImageSelection(true);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      {!showImageSelection ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={selectedChallenges.includes(1)}
                onChange={() => handleCheckboxChange(1)}
              />
              Summer Outfit
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={selectedChallenges.includes(2)}
                onChange={() => handleCheckboxChange(2)}
              />
              Winter Outfit
            </label>
          </div>
          <button type="submit">Submit</button>
        </form>
      ) : (
        <ImageSelection userId={userId} />
      )}
    </div>
  );
};

export default Register;
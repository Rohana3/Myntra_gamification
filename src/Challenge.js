//src/challenge.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Challenge = () => {
    const navigate = useNavigate();

    const handleChallengeClick = (type) => {
        navigate(`/submit/${type}`);
    };

    return (
        <div>
            <h1>Choose Your Challenge</h1>
            <button onClick={() => handleChallengeClick('summer')}>Summer Outfit</button>
            <button onClick={() => handleChallengeClick('winter')}>Winter Outfit</button>
        </div>
    );
};

export default Challenge;


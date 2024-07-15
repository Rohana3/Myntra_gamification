// ChallengeDetail.js
//src/challengedetails.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ChallengeDetail = () => {
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);
    const [userName, setUserName] = useState('');
    const [userPhoneNumber, setUserPhoneNumber] = useState('');
    const [imageType, setImageType] = useState('summer');  // Default to 'summer'

    const handleNameChange = (e) => {
        setUserName(e.target.value);
    };

    const handlePhoneNumberChange = (e) => {
        setUserPhoneNumber(e.target.value);
    };

    const handleImageChange = (e) => {
        setSelectedImage(e.target.files[0]);
    };

    const handleTypeChange = (e) => {
        setImageType(e.target.value);
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('name', userName);
        formData.append('phone', userPhoneNumber);
        formData.append('categoryImage', selectedImage);
        formData.append('type', imageType);  // Add the selected type

        try {
            await axios.post('http://localhost:3001/api/user-input', formData);
            alert('Data saved successfully!');
            navigate('/gallery');
        } catch (error) {
            console.error('Error saving data', error);
            alert('Failed to save data');
        }
    };

    return (
        <div>
            <h4>User Information</h4>
            <label>
                Name:
                <input type="text" value={userName} onChange={handleNameChange} />
            </label>
            <br />
            <label>
                Phone Number:
                <input type="text" value={userPhoneNumber} onChange={handlePhoneNumberChange} />
            </label>
            <br />
            <label>
                Image:
                <input type="file" onChange={handleImageChange} />
            </label>
            <br />
            <label>
                Type:
                <br />
                <input
                    type="radio"
                    value="summer"
                    checked={imageType === 'summer'}
                    onChange={handleTypeChange}
                /> Summer
                <br />
                <input
                    type="radio"
                    value="winter"
                    checked={imageType === 'winter'}
                    onChange={handleTypeChange}
                /> Winter
            </label>
            <div>
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
};

export default ChallengeDetail;
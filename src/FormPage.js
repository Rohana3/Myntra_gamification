//src/formpage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FormPage = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [type, setType] = useState('summer');
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('phone', phone);
        formData.append('type', type);
        formData.append('categoryImage', file);

        try {
            await axios.post('http://localhost:3001/api/user-input', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // Update discounts
            await axios.post('http://localhost:3001/api/update-discounts');

            navigate('/gallery');
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };

    return (
        <div>
            <h1><B><center>MYNTRA CHALLENGE</center></B></h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label>Phone Number:</label>
                    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>
                <div>
                    <label>Type:</label>
                    <select value={type} onChange={(e) => setType(e.target.value)} required>
                        <option value="summer">Summer</option>
                        <option value="winter">Winter</option>
                    </select>
                </div>
                <div>
                    <label>Image:</label>
                    <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default FormPage;

//src/SubmitForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SubmitForm = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [type, setType] = useState('summer');
    const [categoryImage, setCategoryImage] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('phone', phone);
        formData.append('type', type);
        formData.append('categoryImage', categoryImage);

        try {
            const response = await fetch('http://localhost:3001/api/user-input', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const result = await response.json();
                alert('Data submitted successfully');
                navigate('/gallery'); // Navigate to the ImageGallery page
            } else {
                alert('Failed to submit data');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error submitting data');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" required />
            <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="summer">Summer</option>
                <option value="winter">Winter</option>
            </select>
            <input type="file" onChange={(e) => setCategoryImage(e.target.files[0])} required />
            <button type="submit">Submit</button>
        </form>
    );
};

export default SubmitForm;

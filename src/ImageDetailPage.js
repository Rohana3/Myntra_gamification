// src/ImageDetailPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ImageDetailPage = () => {
    const { id} = useParams();
    const [image, setImage] = useState(null);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/get-image/${id}`);
                setImage(response.data);
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        };

        fetchImage();
    }, [id]);

    const handleLike = async () => {
        try {
            await axios.post(`http://localhost:3001/api/like-image/${id}`);
            // Optional: Update likes locally without fetching the image again
            setImage(prevImage => ({ ...prevImage, likes: (prevImage.likes || 0) + 1 }));
        } catch (error) {
            console.error('Error liking image:', error);
        }
    };

    if (!image) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Image Detail</h1>
            <div>
                <img src={`http://localhost:3001/${image.filePath}`} alt="Outfit" style={{ maxWidth: '100%', height: 'auto' }} />
            </div>
            <div>
                <h3>{image.name}</h3>
                <button onClick={handleLike}>Like</button>
            </div>
        </div>
    );
};

export default ImageDetailPage;

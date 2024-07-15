// src/PopUp.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PopUp = () => {
    const [images, setImages] = useState([]);
    const [likes, setLikes] = useState({});

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/get-images');
                setImages(response.data);
                const initialLikes = response.data.reduce((acc, image) => {
                    acc[image.id] = image.likes || 0;
                    return acc;
                }, {});
                setLikes(initialLikes);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, []);

    const handleLike = async (id) => {
        try {
            await axios.post(`http://localhost:3001/api/like-image/${id}`);
            setLikes((prevLikes) => ({
                ...prevLikes,
                [id]: prevLikes[id] + 1
            }));
        } catch (error) {
            console.error('Error liking image:', error);
        }
    };

    return (
        <div>
            <h1>Image Gallery</h1>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {images.map((image) => (
                    <div key={image.id} style={{ marginBottom: '20px', textAlign: 'center' }}>
                        <img src={`http://localhost:3001/uploads/${image.filePath}`} alt={image.name} style={{ width: '300px' }} />
                        <div>{image.name}</div>
                        <div>{likes[image.id]} Likes</div>
                        <button onClick={() => handleLike(image.id)}>Like</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PopUp;
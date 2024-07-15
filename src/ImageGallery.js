//src/imagegallery.js
//src/imagegallery.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles.css';

const ImageGallery = () => {
    const navigate = useNavigate();
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/get-images');
                setImages(response.data);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, []);

    const handleLike = async (id) => {
        try {
            await axios.post(`http://localhost:3001/api/like-image/${id}`);
            setImages((prevImages) =>
                prevImages.map((image) =>
                    image.id === id ? { ...image, likes: image.likes + 1 } : image
                )
            );
        } catch (error) {
            console.error('Error liking image:', error);
        }
    };

    const handleViewTopThree = () => {
        navigate('/topthree');
    };

    return (
        <div className="image-gallery">
            <h2>Image Gallery</h2>
            <div className="images-container">
                {images
                    .sort((a, b) => b.likes - a.likes) // Sort by likes in descending order
                    .map((image) => (
                        <div key={image.id} className="image-item">
                            <img src={`http://localhost:3001/${image.filePath}`} alt={image.name} />
                            <p>{image.name}</p>
                            <p>Likes: {image.likes}</p>
                            <button onClick={() => handleLike(image.id)}>Like</button>
                        </div>
                    ))}
            </div>
            <button onClick={handleViewTopThree}>View Top 3</button>
        </div>
    );
};

export default ImageGallery;
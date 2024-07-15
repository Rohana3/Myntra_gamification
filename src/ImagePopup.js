//src/ImagePopup.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImagePopup = ({ onClose }) => {
    const [images, setImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

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
            const updatedImages = images.map((image) => 
                image.id === id ? { ...image, likes: (image.likes || 0) + 1 } : image
            );
            setImages(updatedImages);
        } catch (error) {
            console.error('Error liking image:', error);
        }
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div className="popup">
            <div className="popup-inner">
                <button className="close-btn" onClick={onClose}>X</button>
                {images.length > 0 && (
                    <>
                        <img src={`http://localhost:3001/${images[currentIndex].filePath}`} alt="Outfit" />
                        <h3>{images[currentIndex].name}</h3>
                        <p>Likes: {images[currentIndex].likes || 0}</p>
                        <button onClick={() => handleLike(images[currentIndex].id)}>Like</button>
                        <button onClick={handlePrev}>Previous</button>
                        <button onClick={handleNext}>Next</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default ImagePopup;
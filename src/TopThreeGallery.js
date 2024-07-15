//src/topthreegallery.js
//src/topthreegallery.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

const TopThreeGallery = () => {
    const [topImagesChallenge1, setTopImagesChallenge1] = useState([]);
    const [topImagesChallenge2, setTopImagesChallenge2] = useState([]);

    useEffect(() => {
        const fetchTopImages = async () => {
            try {
                const response1 = await axios.get('http://localhost:3001/api/get-top-images?challenge=challenge1');
                const response2 = await axios.get('http://localhost:3001/api/get-top-images?challenge=challenge2');
                
                setTopImagesChallenge1(response1.data);
                setTopImagesChallenge2(response2.data);
            } catch (error) {
                console.error('Error fetching top images:', error);
            }
        };

        fetchTopImages();
    }, []);

    return (
        <div className="top-three-gallery">
            <h2>Top 3 Images - Challenge 1 (Summer Outfit)</h2>
            <div className="images-container">
                {topImagesChallenge1.map((image) => (
                    <div key={image.id} className="image-item">
                        <img src={`http://localhost:3001/${image.filePath}`} alt={image.name} />
                        <p>{image.name}</p>
                        <p>Likes: {image.likes}</p>
                        <p>Discount: {image.discount}%</p>
                    </div>
                ))}
            </div>

            <h2>Top 3 Images - Challenge 2 (Winter Outfit)</h2>
            <div className="images-container">
                {topImagesChallenge2.map((image) => (
                    <div key={image.id} className="image-item">
                        <img src={`http://localhost:3001/${image.filePath}`} alt={image.name} />
                        <p>{image.name}</p>
                        <p>Likes: {image.likes}</p>
                        <p>Discount: {image.discount}%</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopThreeGallery;
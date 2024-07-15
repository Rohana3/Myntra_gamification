// TopSummerImages.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TopSummerImages = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchTopSummerImages = async () => {
            const response = await axios.get('http://localhost:3001/api/get-top-summer-images');
            setImages(response.data);
        };

        fetchTopSummerImages();
    }, []);

    return (
        <div>
            <h2>Top 3 Summer Images</h2>
            {images.map((image, index) => (
                <div key={index} style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <img src={`http://localhost:3001/${image.filePath}`} alt={`Summer Image ${index + 1}`} style={{ width: '50%' }} />
                    <p>Name: {image.name}</p>
                    <p>Phone: {image.phone}</p>
                    <p>Likes: {image.likes}</p>
                    <p>Discount: {image.discount}%</p>
                </div>
            ))}
        </div>
    );
};

export default TopSummerImages;

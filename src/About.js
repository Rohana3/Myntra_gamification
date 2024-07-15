// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChallengeDetail from './ChallengeDetail';
import ImageGallery from './ImageGallery';
import TopThreeGallery from './TopThreeGallery';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ChallengeDetail />} />
                <Route path="/gallery" element={<ImageGallery />} />
                <Route path="/topthree" element={<TopThreeGallery />} />
            </Routes>
        </Router>
    );
};

export default App;
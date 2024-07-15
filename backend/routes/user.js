//backend/user.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const connection = require('../database'); // Ensure this path is correct

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.post('/user-input', upload.fields([{ name: 'category1Image' }, { name: 'category2Image' }]), (req, res) => {
    const { name, phone } = req.body;
    const category1Image = req.files['category1Image'][0].path;
    const category2Image = req.files['category2Image'][0].path;

    console.log('Name:', name);
    console.log('Phone:', phone);
    console.log('Category 1 Image:', category1Image);
    console.log('Category 2 Image:', category2Image);

    const query = 'INSERT INTO customers (name, phone, category1Image, category2Image) VALUES (?, ?, ?, ?)';
    connection.query(query, [name, phone, category1Image, category2Image], (err, results) => {
        if (err) {
            console.error('Error inserting data into MySQL:', err);
            res.status(500).json({ error: 'Failed to insert data into MySQL' });
        } else {
            res.status(200).json({ message: 'Data submitted successfully', results });
        }
    });
});

module.exports = router;
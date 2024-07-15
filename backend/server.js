//backend/server.js
const express = require('express');
const app = express();
const multer = require('multer');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mern',
    database: 'challenge_db'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to the MySQL database.');
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

app.post('/api/user-input', upload.single('categoryImage'), (req, res) => {
    const { name, phone, type } = req.body;
    const filePath = req.file.path;

    const column = type === 'summer' ? 'challenge1' : 'challenge2';

    const query = `INSERT INTO customers (name, phone, ${column}) VALUES (?, ?, ?)`;
    connection.query(query, [name, phone, filePath], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).send('Failed to save data');
        } else {
            res.status(200).send('Data saved successfully');
        }
    });
});

app.get('/api/get-images', (req, res) => {
    const query = 'SELECT id, name, phone, challenge1 AS filePath, likes FROM customers WHERE challenge1 IS NOT NULL UNION ALL SELECT id, name, phone, challenge2 AS filePath, likes FROM customers WHERE challenge2 IS NOT NULL ORDER BY likes DESC';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching images:', err);
            res.status(500).send('Failed to fetch images');
        } else {
            res.json(results);
        }
    });
});

app.post('/api/like-image/:id', (req, res) => {
    const { id } = req.params;

    const query = 'UPDATE customers SET likes = likes + 1 WHERE id = ?';
    connection.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error updating likes:', err);
            res.status(500).send('Failed to like image');
        } else {
            res.status(200).send('Image liked successfully');
        }
    });
});

app.get('/api/get-top-images', (req, res) => {
    const query = 'SELECT id, name, phone, likes, filePath, discount FROM (SELECT id, name, phone, challenge1 AS filePath, likes, discount FROM customers WHERE challenge1 IS NOT NULL UNION ALL SELECT id, name, phone, challenge2 AS filePath, likes, discount FROM customers WHERE challenge2 IS NOT NULL) AS combined ORDER BY likes DESC LIMIT 3';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching top images:', err);
            res.status(500).send('Failed to fetch top images');
        } else {
            res.json(results);
        }
    });
});

app.post('/api/update-discounts', (req, res) => {
    const discounts = [45, 25, 15];

    const query = 'SELECT * FROM (SELECT id, likes FROM customers ORDER BY likes DESC LIMIT 3) AS topThree';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching top images:', err);
            res.status(500).send('Failed to fetch top images');
        } else {
            results.forEach((result, index) => {
                const updateQuery = 'UPDATE customers SET discount = ? WHERE id = ?';
                connection.query(updateQuery, [`${discounts[index]}%`, result.id], (err, updateResult) => {
                    if (err) {
                        console.error('Error updating discount:', err);
                    }
                });
            });
            res.status(200).send('Discounts updated successfully');
        }
    });
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});


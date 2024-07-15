const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');

const app = express();
app.use(bodyParser.json());

// MySQL connection settings
const username = 'root'; // Replace with your actual MySQL username
const password = 'mern'; // Replace with your actual MySQL password
const host = 'localhost';
const database = 'challenge_db'; // Replace with your actual database name

// Create a MySQL connection pool
const connection = mysql.createPool({
  host,
  user: username,
  password,
  database
});

// Validate input data
const validateInput = (req) => {
  const { name, phone, topImage, bottomImage } = req.body;

  if (!name || !phone || !topImage || !bottomImage) {
    throw new Error('All fields are required');
  }

  // Add additional validation for data types and formats
  if (typeof name !== 'string' || typeof phone !== 'string' || typeof topImage !== 'string' || typeof bottomImage !== 'string') {
    throw new Error('Invalid data type');
  }

  // Validate phone number format
  if (!/^\d{10}$/.test(phone)) {
    throw new Error('Invalid phone number format');
  }

  return { name, phone, topImage, bottomImage };
};

// Create an Express route for the /api/save endpoint
app.post('/api/save', async (req, res) => {
  try {
    const { name, phone, topImage, bottomImage } = validateInput(req);

    // Insert the user's selection into the database
    await connection.execute(
      "INSERT INTO customers (name, phone, top_image, bottom_image) VALUES (?, ?, ?, ?)",
      [name, phone, topImage, bottomImage]
    );
    res.send('Data saved successfully!');
  } catch (err) {
    console.error('Error saving data', err);
    res.status(500).send(`Failed to save data: ${err.message}`);
  }
});

// Start the Express server on port 3001
const port = 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


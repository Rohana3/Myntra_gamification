const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

const directoryPath = path.join(__dirname, 'public/images');
const connectionConfig = {
  host: 'localhost',
  user: 'root',
  password: 'mern',
  database: 'challenge_db',
};

const insertImages = async () => {
  const connection = await mysql.createConnection(connectionConfig);
  const files = fs.readdirSync(directoryPath);

  const queries = files.map((file) => {
    const [type, season, filename] = file.split('_');
    return connection.execute(
      'INSERT INTO outfits (type, season, filename) VALUES (?, ?, ?)',
      [type, season, file]
    );
  });

  await Promise.all(queries);
  await connection.end();
};

insertImages()
  .then(() => console.log('Images inserted successfully'))
  .catch((error) => console.error('Error inserting images', error));
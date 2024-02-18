const express = require('express');
const bodyParser = require('body-parser');
const lazyCrypt = require('./LazyCrypt');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Endpoint to generate a hash
app.post('/generateHash', async (req, res) => {
  try {
    const text = req.body.text; // Assuming the request body contains a 'text' field
    const hash = await lazyCrypt.generateHash(text);
    res.json({ hash });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to read a hash
app.post('/readHash', async (req, res) => {
  try {
    const hash = req.body.hash; // Assuming the request body contains a 'hash' field
    const decryptedText = await lazyCrypt.readHash(hash);
    res.json({ decryptedText });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

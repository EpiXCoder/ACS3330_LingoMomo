const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001; // This port must be different from the React app's port

app.use(cors());
app.use(express.json());

const lessonsData = require('./data.json'); 
app.get('/api/lessons', (req, res) => {
    res.json(lessonsData);
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

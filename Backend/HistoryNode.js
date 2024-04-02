// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Placeholder for history log entries
let history = [];

// Endpoint to log actions
app.post('/log', (req, res) => {
    const logEntry = req.body;
    history.push(logEntry);
    res.json({ message: 'Action logged successfully' });
});

// Endpoint to retrieve history log entries
app.get('/history', (req, res) => {
    res.json({ history });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

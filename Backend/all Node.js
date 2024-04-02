const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = 'your-secret-key'; // Change this to a secure secret key

app.use(bodyParser.json());

// Placeholder for student data (In a real application, you'd use a database)
let students = [];
let history = [];

// Middleware for authentication
function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ error: 'Forbidden' });
        req.user = decoded;
        next();
    });
}

// Middleware to log actions
function logAction(req, res, next) {
    const { action, administrator, details } = req.body;
    const timestamp = new Date();
    const logEntry = { action, administrator, timestamp, details };
    history.push(logEntry);
    console.log('Action logged:', logEntry);
    next();
}

// Login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // In a real application, you would validate the username and password
    if (username === 'admin' && password === 'admin123') {
        const token = jwt.sign({ username }, JWT_SECRET);
        res.json({ token });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

// CRUD operations for student records
app.post('/students', authenticateToken, logAction, (req, res) => {
    const newStudent = req.body;
    students.push(newStudent);
    res.json({ message: 'Student added successfully', student: newStudent });
});

app.get('/students', authenticateToken, (req, res) => {
    res.json({ students });
});

app.get('/students/:indexNumber', authenticateToken, (req, res) => {
    const indexNumber = req.params.indexNumber;
    const student = students.find(student => student.indexNumber === indexNumber);
    if (!student) {
        res.status(404).json({ error: 'Student not found' });
    } else {
        res.json({ student });
    }
});

app.put('/students/:indexNumber', authenticateToken, logAction, (req, res) => {
    const indexNumber = req.params.indexNumber;
    const updatedInfo = req.body;
    const index = students.findIndex(student => student.indexNumber === indexNumber);
    if (index === -1) {
        res.status(404).json({ error: 'Student not found' });
    } else {
        students[index] = { ...students[index], ...updatedInfo };
        res.json({ message: 'Student updated successfully', student: students[index] });
    }
});

app.delete('/students/:indexNumber', authenticateToken, logAction, (req, res) => {
    const indexNumber = req.params.indexNumber;
    students = students.filter(student => student.indexNumber !== indexNumber);
    res.json({ message: 'Student deleted successfully' });
});

// Endpoint to retrieve history log entries
app.get('/history', authenticateToken, (req, res) => {
    res.json({ history });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

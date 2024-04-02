// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Placeholder for student records (In a real application, you'd use a database)
let students = [];

// Endpoint to create a new student record
app.post('/students', (req, res) => {
    const newStudent = req.body;
    students.push(newStudent);
    res.json({ message: 'Student created successfully', student: newStudent });
});

// Endpoint to retrieve all student records
app.get('/students', (req, res) => {
    res.json({ students });
});

// Endpoint to retrieve a single student record by index number
app.get('/students/:indexNumber', (req, res) => {
    const indexNumber = req.params.indexNumber;
    const student = students.find(student => student.indexNumber === indexNumber);
    if (!student) {
        res.status(404).json({ error: 'Student not found' });
    } else {
        res.json({ student });
    }
});

// Endpoint to update a student record by index number
app.put('/students/:indexNumber', (req, res) => {
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

// Endpoint to delete a student record by index number
app.delete('/students/:indexNumber', (req, res) => {
    const indexNumber = req.params.indexNumber;
    students = students.filter(student => student.indexNumber !== indexNumber);
    res.json({ message: 'Student deleted successfully' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


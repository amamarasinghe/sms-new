const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Placeholder for student data (In a real application, you'd use a database)
let students = [];

// Endpoint to add a new student
app.post('/add-student', (req, res) => {
    const newStudent = req.body;
    students.push(newStudent);
    res.json({ message: 'Student added successfully' });
});

// Endpoint to retrieve all students
app.get('/students', (req, res) => {
    res.json({ students });
});

// Endpoint to retrieve a single student by index number
app.get('/students/:indexNumber', (req, res) => {
    const indexNumber = req.params.indexNumber;
    const student = students.find(student => student.indexNumber === indexNumber);
    if (!student) {
        res.status(404).json({ error: 'Student not found' });
    } else {
        res.json({ student });
    }
});

// Endpoint to update student details
app.put('/students/:indexNumber', (req, res) => {
    const indexNumber = req.params.indexNumber;
    const updatedInfo = req.body;
    const index = students.findIndex(student => student.indexNumber === indexNumber);
    if (index === -1) {
        res.status(404).json({ error: 'Student not found' });
    } else {
        students[index] = { ...students[index], ...updatedInfo };
        res.json({ message: 'Student updated successfully' });
    }
});

// Endpoint to delete a student by index number
app.delete('/students/:indexNumber', (req, res) => {
    const indexNumber = req.params.indexNumber;
    students = students.filter(student => student.indexNumber !== indexNumber);
    res.json({ message: 'Student deleted successfully' });
});

// Endpoint to search for students by name, index number, or national ID number
app.get('/search', (req, res) => {
    const query = req.query.q;
    const searchResults = students.filter(student =>
        student.fullName.includes(query) ||
        student.indexNumber.includes(query) ||
        student.nicNumber.includes(query)
    );
    res.json({ searchResults });
});

// Endpoint to update student course details
app.put('/students/:indexNumber/courses', (req, res) => {
    const indexNumber = req.params.indexNumber;
    const courses = req.body.courses;
    const index = students.findIndex(student => student.indexNumber === indexNumber);
    if (index === -1) {
        res.status(404).json({ error: 'Student not found' });
    } else {
        students[index].courses = courses;
        res.json({ message: 'Student course details updated successfully' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

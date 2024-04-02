const jwt = require('jsonwebtoken');

// Secret key for JWT
const JWT_SECRET = 'your-secret-key';

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

// Endpoint for login (generating JWT)
app.post('/login', (req, res) => {
    // Check credentials (for demonstration, assuming valid credentials)
    const { username, password } = req.body;
    if (username === 'admin' && password === 'admin123') {
        // Generate JWT token
        const token = jwt.sign({ username }, JWT_SECRET);
        res.json({ token });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

// Protected endpoint (example)
app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected endpoint' });
});

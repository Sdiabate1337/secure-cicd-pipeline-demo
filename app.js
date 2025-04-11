/**
 * Secure CI/CD Demo Application
 * A simple Express API with intentional security issues for demonstration
 */

const express = require('express');
const helmet = require('helmet'); // Security middleware
const app = express();
const port = process.env.PORT || 3000;

// Middleware setup
app.use(express.json());
app.use(helmet()); // Add security headers

// SECURITY NOTE: Never store sensitive data like this in production!
// This is deliberately insecure for demonstration purposes
const users = [
  { id: 1, username: 'admin', password: 'admin123' }, // Security issue: Hardcoded credentials
  { id: 2, username: 'user', password: 'password123' }, // Security issue: Weak password
];

// Root endpoint
app.get('/', (req, res) => {
  res.send('Welcome to the Secure CI/CD Demo API!');
});

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  // SECURITY ISSUE: Vulnerable to timing attacks and lacks rate limiting
  const user = users.find(u => u.username === username && u.password === password);
  
  if (user) {
    // SECURITY ISSUE: No proper token generation or session management
    res.json({ 
      success: true, 
      message: 'Login successful', 
      userId: user.id 
    });
  } else {
    // SECURITY ISSUE: Information disclosure in error message
    res.status(401).json({ 
      success: false, 
      message: 'Invalid username or password' 
    });
  }
});

// Data retrieval endpoint
app.get('/data', (req, res) => {
  // SECURITY ISSUE: No authentication check
  // This endpoint should verify the user is authenticated before returning data
  res.json({ 
    secretData: 'This should be protected behind authentication!',
    // SECURITY ISSUE: SQL injection vulnerability demonstration
    query: `SELECT * FROM data WHERE user_id = ${req.query.id}` // Never do this in production!
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app; // Export for testing
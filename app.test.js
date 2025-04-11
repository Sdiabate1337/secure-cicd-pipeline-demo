const request = require('supertest');
const app = require('./app');

// Basic application functionality tests
describe('Express App', () => {
  // Test the root endpoint
  test('GET / should return welcome message', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('Welcome to the Secure CI/CD Demo API');
  });

  // Test login functionality with valid credentials
  test('POST /login with valid credentials should succeed', async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: 'admin', password: 'admin123' });
    
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
  });

  // Test login functionality with invalid credentials
  test('POST /login with invalid credentials should fail', async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: 'wrong', password: 'wrong' });
    
    expect(response.statusCode).toBe(401);
    expect(response.body.success).toBe(false);
  });

  // Security test: Checking if /data endpoint is accessible without authentication
  // This test actually confirms the security vulnerability exists
  test('GET /data should return data (security issue)', async () => {
    const response = await request(app).get('/data');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('secretData');
    // In a secure application, this should fail without authentication
  });
});
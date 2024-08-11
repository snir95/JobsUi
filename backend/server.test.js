const request = require('supertest');
const app = require('./server');
const fs = require('fs');

jest.mock('fs');

describe('API tests', () => {
  const mockJobs = [
    { id: 1, status: 'Running', command: 'python /home/user1/train.py' },
    { id: 2, status: 'Succeeded', command: 'python /home/user2/train.py' },
  ];

  beforeEach(() => {
    fs.readFile.mockImplementation((path, encoding, callback) => {
      callback(null, JSON.stringify(mockJobs));
    });

    fs.writeFile.mockImplementation((path, data, encoding, callback) => {
      callback(null);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('GET /api/jobs should return a list of jobs', async () => {
    const response = await request(app).get('/api/jobs');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockJobs);
  });

  test('PUT /api/jobs/:id should update a job', async () => {
    const updatedJob = { status: 'Failed' };
    const response = await request(app).put('/api/jobs/1').send(updatedJob);

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('Failed');
    expect(fs.writeFile).toHaveBeenCalledTimes(1);
  });

  test('PUT /api/jobs/:id should return 404 if job is not found', async () => {
    const response = await request(app).put('/api/jobs/999').send({ status: 'Failed' });
    expect(response.statusCode).toBe(404);
    expect(response.text).toBe('Job not found');
  });
});

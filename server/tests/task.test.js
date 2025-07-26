import request from 'supertest';
import app from '../server.js';
import db from '../models/index.js';
import dotenv from 'dotenv';
dotenv.config();

beforeAll(async () => {
  await db.sequelize.sync({ force: true });
});

describe('Task API', () => {
  let taskId;

  it('should create a new task', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({
        title: 'Test Task',
        description: 'A task for testing',
        status: 'pending',
        dueDate: '2025-12-31T23:59:00Z'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
    taskId = res.body.id;
  });

  it('should fetch all tasks', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should fetch a task by ID', async () => {
    const res = await request(app).get(`/api/tasks/${taskId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', taskId);
  });

  it('should update the task status', async () => {
    const res = await request(app)
      .put(`/api/tasks/${taskId}`)
      .send({ status: 'completed' });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Task was updated successfully.');
  });

  it('should delete the task', async () => {
    const res = await request(app).delete(`/api/tasks/${taskId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Task was successfully deleted!');
  });
});

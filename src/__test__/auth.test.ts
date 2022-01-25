import { createServer } from '../app';
import request from 'supertest';
import { Application } from 'express';

const server: Application = createServer();

const registerEndpoint = '/auth/register';
describe('POST Register User', () => {
  test('Empty request should 400 error', (done: jest.DoneCallback) => {
    request(server)
      .post(registerEndpoint)
      .expect('Content-Type', /json/)
      .expect({ error: 'Request is missing parts of the body.' })
      .expect(400, done);
  });
});

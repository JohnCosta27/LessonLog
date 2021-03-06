import { createServer } from '../app';
import request from 'supertest';
import { Application } from 'express';

const server: Application = createServer();

const statusEndpoint: string = '/health';
describe(`GET ${statusEndpoint}`, () => {
  test('GET Request', (done: jest.DoneCallback) => {
    request(server).get(statusEndpoint).expect('Content-Type', /json/).expect(200, done);
  });
});

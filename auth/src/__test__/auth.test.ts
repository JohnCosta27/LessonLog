import { createServer } from '../app';
import request from 'supertest';
import { Application } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const server: Application = createServer();

const registerEndpoint = '/register';

beforeAll(() => {
  return prisma.users.deleteMany({});
});

afterAll(() => {
  return prisma.users.deleteMany({});
});

describe('POST Register User', () => {
  test('Empty request should 400 error', (done: jest.DoneCallback) => {
    request(server)
      .post(registerEndpoint)
      .expect('Content-Type', /json/)
      .expect({
        error: 'Request is missing parts of the body.',
        missing: ['firstname', 'surname', 'email', 'password'],
      })
      .expect(400, done);
  });

  test('Request with missing parts should return 400 error', (done: jest.DoneCallback) => {
    request(server)
      .post(registerEndpoint)
      .set('Accept', 'application/json')
      .send({ surname: 'Costa', password: 'HelloWorld' })
      .expect('Content-Type', /json/)
      .expect({
        error: 'Request is missing parts of the body.',
        missing: ['firstname', 'email'],
      })
      .expect(400, done);
  });

  test('Request with valid data should return 200', (done: jest.DoneCallback) => {
    request(server)
      .post(registerEndpoint)
      .set('Accept', 'application/json')
      .send({
        firstname: 'John',
        surname: 'Costa',
        email: 'john@email.com',
        password: 'HelloWorld',
      })
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  test('Request with valid data in different order should return 200', (done: jest.DoneCallback) => {
    request(server)
      .post(registerEndpoint)
      .set('Accept', 'application/json')
      .send({
        surname: 'Costa2',
        email: 'john@email2.com',
        firstname: 'John2',
        password: 'HelloWorld',
      })
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  test('Request with duplicate data should return 400', (done: jest.DoneCallback) => {
    request(server)
      .post(registerEndpoint)
      .set('Accept', 'application/json')
      .send({
        firstname: 'John',
        surname: 'Costa',
        email: 'john@email.com',
        password: 'HelloWorld',
      })
      .expect('Content-Type', /json/)
      .expect({
        error: 'Email has already been registered.',
      })
      .expect(400, done);
  });

  test('Request with wrong datatypes should return 400', (done: jest.DoneCallback) => {
    request(server)
      .post(registerEndpoint)
      .set('Accept', 'application/json')
      .send({
        firstname: 5,
        surname: 'Costa',
        email: 3.2,
        password: [],
      })
      .expect('Content-Type', /json/)
      .expect({
        error: 'Items were not datatype.',
      })
      .expect(400, done);
  });
});

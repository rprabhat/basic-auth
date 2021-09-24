import { server } from '..';
import request from 'supertest';
import { expect } from 'chai';

describe('express', function () {
  after(() => {
    server.close()
  })

  it('should respond with 200 for /status', async () => {
    const res = await request(server)
      .get('/status')
    expect(res.statusCode).to.equal(200)
  });

  it('should respond with 404 with non-existant routes', function testPath(done) {
    request(server)
      .get('/non-existant-path')
      .expect(404, done);
  });
  
  describe('basic auth', async() => {
    it('should respond with 200 when called with valid Authorization header value', async () => {
      const res = await request(server)
      .get('/basic-auth')
      .set('authorization', 'Basic bWF0dEBnbWFpbC5jb206dGhpcyBpcyBhIHZAbGlkIHBhc3N3b3JkIQ==');
      expect(res.statusCode).to.equal(200);
    });
  })

  describe('basic auth', async() => {
    it('should respond with 401 when called with user in VALID_USERS, but not matching password', async () => {
      const res = await request(server)
      .get('/basic-auth')
      .set('authorization', 'Basic am9obkBnb29nbGUuY29tOmRpZmZlcmVudHBhc3N3b3Jk');
      expect(res.statusCode).to.equal(401);
    });
  })

  describe('basic auth', async() => {
    it('should respond with 401 when called with user not in VALID_USERS', async () => {
      const res = await request(server)
      .get('/basic-auth')
      .set('authorization', 'Basic YWJjQGdvb2dsZS5jb206IXRTcDUqTUhoemZtQEkyNypCQA==');
      expect(res.statusCode).to.equal(401);
    });
  })

  describe('basic auth', async() => {
    it('should respond with 401 when called with missing  header', async () => {
      const res = await request(server)
      .get('/basic-auth');
      expect(res.statusCode).to.equal(401);
      expect(res.body.message).to.equal('Required authorization header not found');
    });
  })

  describe('basic auth', async() => {
    it('should respond with 401 when called with missing invalid header', async () => {
      const res = await request(server)
      .get('/basic-auth')
      .set('auth', 'bWF0dEBnbWFpbC5jb206dGhpcyBpcyBhIHZAbGlkIHBhc3N3b3JkIQ==');
      expect(res.statusCode).to.equal(401);
      expect(res.body.message).to.equal('Required authorization header not found');
    });
  })

  describe('basic auth', async() => {
    it('should respond with 401 when called with invalid Authorization token format, missing \'Basic\'', async () => {
      const res = await request(server)
      .get('/basic-auth')
      .set('authorization', 'bWF0dEBnbWFpbC5jb206dGhpcyBpcyBhIHZAbGlkIHBhc3N3b3JkIQ==');
      expect(res.statusCode).to.equal(401);
    });
  })

  describe('basic auth', async() => {
    it('should respond with 401 when called with invalid Authorization token value', async () => {
      const res = await request(server)
      .get('/basic-auth')
      .set('authorization', 'Basic invalid_token_BhIHZAbGlkIHBhc3N3b3JkIQ==');
      expect(res.statusCode).to.equal(401);
    });
  })

});
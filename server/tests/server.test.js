const expect = require('expect');
const request = require('supertest');

const { app } = require('./../server');

describe('GET /', () => {
  it('should display welcome json', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .expect((res) => {
        expect(res.body.title).toBe('Welcome to SimpleCMS API');
      })
      .end(done);
  });
});

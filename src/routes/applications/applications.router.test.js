const request = require('supertest');
const { app } = require('../../index.js');

describe('Applications router', () => {
  it('successfully get ALL applications', () => {
    return request(app)
      .get('/applications')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  });

  it('successfully get CURRENT applications', () => {
    return request(app)
      .get('/applications/current')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  });

  it('shows error message if SINGLE application not found', () => {
    return request(app)
      .get('/applications/fakeID')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)
      .expect({ message: 'Application not found.' });
  });
});

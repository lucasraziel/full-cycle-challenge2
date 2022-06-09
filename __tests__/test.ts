import request from 'supertest';
import app from '../src/app';

jest.mock('mysql', () => ({
  createConnection: jest.fn(() => ({
    end: jest.fn(),
    query: jest.fn((sql, callback) => {
      // eslint-disable-next-line no-console
      console.log(`Executando query: ${sql}`);
      callback(null, [{ name: 'Lucas' }]);
    }),
  })),
}));

test('it should return Full Cycle', (done) => {
  request(app)
    .get('/')
    .expect(200)
    .end((err, res) => {
      if (err) throw err;
      expect(res.text).toEqual('<h1>Full Cycle</h1><ul><li>Lucas</li></ul>');
      done();
    });
});

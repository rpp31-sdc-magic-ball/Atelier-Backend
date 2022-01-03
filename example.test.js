const app = require('./server/server.js');
const {Sequelize} = require('sequelize');
const request = require('supertest');

describe('Route checks', () => {
  beforeAll(done => {
    done()
  })

  // afterAll(done => {
  //   // Closing the DB connection allows Jest to exit successfully.
  //   Sequelize.close();
  //   app.close()
  //   done()
  // })
  test('Server responds to GET requests from /questions route', () => {
    return request(app).get('/questions/').query({ productId: '1' }).then((result) => {
          expect(result.status).toBe(200);
      });
    });
    test('Server sends all data on GET from /questions route', () => {
      return request(app).get('/questions/').query({ productId: '1' }).then((result) => {
        // console.log('log', JSON.parse(result.text))
            expect(JSON.parse(result.text).results.length).toBe(5);
        });
      });
    test('Server sends correct data on GET request from /questions route', () => {
      return request(app).get('/questions/').query({ productId: '1' }).then((result) => {
            expect(JSON.parse(result.text).results[0].productsId).toBe(1);
        });
      });

      test('Server checks data is sent how client expects', () => {
        return request(app).get('/questions/').query({ productId: '1' }).then((result) => {
              expect(JSON.parse(result.text).results[0].productsId).toBe(1);
          });
        });

});
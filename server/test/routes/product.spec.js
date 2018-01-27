
import request from 'supertest';
import app from '../../dist';

jest.mock('../../dist/constants/db', () => ({
  entities: [
    {
      name: 'products',
      data: [{
        pk: '1',
        data: {
          name: 'test-product',
          price: 10.1,
          preview: 'preview',
          image: 'http://image.com',
        },
      }],
    },
  ],
}));

describe('Product router', () => {
  it('#fetch 200', () => (
    request(app)
      .get('/api/v1.0/products')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual([{
          id: '1',
          name: 'test-product',
          price: 10.1,
        }]);
      })
  ));
  it('#get 200', () => (
    request(app)
      .get('/api/v1.0/products/1')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual({
          id: '1',
          name: 'test-product',
          price: 10.1,
          preview: 'preview',
          image: 'http://image.com',
        });
      })
  ));
  it('#get 404', () => (
    request(app)
      .get('/api/v1.0/products/2')
      .expect(404)
  ));
  it('#save 200', () => (
    request(app)
      .post('/api/v1.0/products/1')
      .send({
        name: 'test-product-change',
        price: 10.2,
        preview: 'preview-2',
        image: 'http://image-2.com',
      })
      .expect(200)
      .then(() => (
        request(app)
          .get('/api/v1.0/products/1')
          .expect('Content-Type', /json/)
          .expect(200)
      ))
      .then(({ body }) => {
        expect(body).toEqual({
          id: '1',
          name: 'test-product-change',
          price: 10.2,
          preview: 'preview-2',
          image: 'http://image-2.com',
        });
      })
  ));
  it('#save 404', () => (
    request(app)
      .post('/api/v1.0/products/2')
      .send({
        name: 'test-product-change',
        price: 10.2,
        preview: 'preview-2',
        image: 'http://image-2.com',
      })
      .expect(404)
  ));
  it('#save 400', () => (
    request(app)
      .post('/api/v1.0/products/1')
      .send({
        name: 'test-product-change',
        price: '10.2',
        preview: 'preview-2',
        image: 'http://image-2.com',
      })
      .expect(400)
      .then(({ body }) => {
        expect(body).toEqual([{
          message: '"price" must be a number',
          path: ['price'],
          type: 'number.base',
          context: {
            key: 'price',
            label: 'price',
          },
        }]);
      })
  ));
});

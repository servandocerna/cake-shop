const request = require('supertest');
const { Types } = require('mongoose');
const {
  BAD_REQUEST,
  CREATED,
  OK
 } = require('http-status-codes');

const app = require('../../../app');
const dbTest = require('../../../config/dbTest');
const cakeUseCase = require('../../../useCases/cake');
let route = '/api/cakes';

describe('Cake API', () => {

  beforeAll(async () => {
    await dbTest.connect();
  });

  afterAll(async () => {
    await dbTest.stop();
  });

  afterEach(async () => {
    await cakeUseCase.empty();
  });

  describe('Create cake', () => {
    it('When some parameter is not defined', async () => {
        await request(app)
        .post(route)
        .send({})
        .expect('Content-Type', /json/)
        .expect(BAD_REQUEST);
    });

    it('When create is successfully', async () => {
      const params = {
        name: 'pastelito',
        price: 100,
        flavors: ['CHOCOLATE']
      };
      const response = await request(app)
        .post(route)
        .send(params)
        .expect('Content-Type', /json/)
        .expect(CREATED);

      const { body } = response;
      const { name, price, flavors } = body;
      expect(body).toHaveProperty('name');
      expect(body).toHaveProperty('price');
      expect(body).toHaveProperty('flavors');
      expect(name).toBe('pastelito');
      expect(price).toBe(100);
      expect(flavors).toEqual(expect.arrayContaining(['CHOCOLATE']));
    });

    it('When a cake with that name already exists', async () => {
      const params = {
        name: 'pastelito',
        price: 100,
        flavors: ['CHOCOLATE']
      };

      await request(app)
        .post(route)
        .send(params);

      const response = await request(app)
        .post(route)
        .send(params)
        .expect('Content-Type', /json/)
        .expect(BAD_REQUEST);
    });
  });

  describe('Get list of cakes', () => {
    it('When there is no cakes', async () => {
      const response = await request(app)
        .get(route)
        .expect('Content-Type', /json/)
        .expect(OK);

        const { body } = response;
        expect(body.length).toBe(0);
    });

    it('When returns an array of cakes', async () => {
      const cake1 = {
        name: 'pastelito_1',
        price: 100,
        flavors: ['CHOCOLATE']
      };
      await request(app)
        .post(route)
        .send(cake1);

      const cake2 = {
          name: 'pastelito_2',
          price: 200,
          flavors: ['CHOCOLATE', 'FRESA']
        };
      await request(app)
        .post(route)
        .send(cake2);

      const response = await request(app)
        .get(route)
        .expect('Content-Type', /json/)
        .expect(OK);

      const { body } = response;
      expect(body.length).toBe(2);
    });
  });

  describe('Get a cake', () => {
    it('When id does not exists', async () => {
      await request(app)
        .get(`${route}/${Types.ObjectId()}`)
        .expect('Content-Type', /json/)
        .expect(BAD_REQUEST);
    });

    it('When finds an existing cake', async () => {
      const cake1 = {
        name: 'pastelito_1',
        price: 100,
        flavors: ['CHOCOLATE']
      };
      const cake = await request(app)
        .post(route)
        .send(cake1);

      const response = await request(app)
        .get(`${route}/${cake.body._id}`)
        .expect('Content-Type', /json/)
        .expect(OK);

      const { body } = response;
      expect(body._id).toBe(cake.body._id);
    });
  });

  describe('Update a cake', () => {
    it('When id does not exists', async () => {
      await request(app)
      .put(`${route}/${Types.ObjectId()}`)
        .expect('Content-Type', /json/)
        .expect(BAD_REQUEST);
    });

    it('When update is successfully', async () => {
      const cake1 = {
        name: 'pastelito_1',
        price: 100,
        flavors: ['CHOCOLATE']
      };
      const cake = await request(app)
        .post(route)
        .send(cake1);

      const params = {
        name: 'pastelito_2',
        price: 200,
        flavors: ['FRESA']
      };

      const response = await request(app)
      .put(`${route}/${cake.body._id}`)
        .send(params)
        .expect('Content-Type', /json/)
        .expect(OK);

      const { body } = response;
      const { name, price, flavors } = body;
      expect(name).toBe('pastelito_2');
      expect(price).toBe(200);
      expect(flavors).toEqual(expect.arrayContaining(['FRESA']));
    });
  });
});

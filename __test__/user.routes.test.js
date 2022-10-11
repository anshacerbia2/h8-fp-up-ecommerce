if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const request = require("supertest");
const app = require("../app");
const { User, Product, sequelize } = require("../models");
const jwt = require('jsonwebtoken');

let validToken, validToken2, invalidToken;
const userTest1 = {
  email: "user.test1@mail.com",
  password: "usertest1"
};

const userTest2 = {
  email: "user.test2@mail.com",
  password: "usertest2"
};

beforeAll(async () => {
  try {
    const registeredUser = await User.create(userTest1);
    validToken = jwt.sign({
      id: registeredUser.id,
      email: registeredUser.email
    }, process.env.SECRET);

    const registeredUser2 = await User.create(userTest1);
    validToken2 = jwt.sign({
      id: registeredUser2.id,
      email: registeredUser2.email
    }, process.env.SECRET);

    await Product.bulkCreate(require('../data/products.json'));

    invalidToken =
      '12345678eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIwMUBtYWlsLmNvbSIsImlkIjoxLCJpYXQiOjE2MjI2MDk2NTF9';
  } catch (error) {
    console.log(err);
  }
});

afterAll(async () => {
  await User.destroy({
    truncate: true,
    restartIdentity: true,
    cascade: true
  });
  await Product.destroy({
    truncate: true,
    restartIdentity: true,
    cascade: true
  });
});

describe('USER ROUTES', () => {
  describe('POST /register - 201', () => {
    it('output ====> Account has been created successfully', async () => {
      const response = await request(app).post('/register').send({
        fName: 'Hitam',
        lName: 'Putih',
        email: 'hitamputih@gmail.com',
        password: '123456',
        phoneNumber: '081212121212'
      });
      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Account has been created successfully');
    });
  });

  describe('POST /register - 400', () => {
    it('should return Email field is required', async () => {
      const response = await request(app).post('/pub/register').send({
        username: 'user',
        email: '',
        password: '123456',
        phoneNumber: '0812xxxxxxxx',
        address: 'Jl. ABC No. 7'
      });
      expect(response.status).toBe(400);
      expect(response.body.errors).toBeInstanceOf(Array);
      expect(response.body.errors[0].message).toBe('Email field is required');
    });
  });

  describe('POST /pub/register - 400', () => {
    it('should return Password field is required', async () => {
      const response = await request(app).post('/pub/register').send({
        username: '',
        email: 'user@mail.com',
        password: '',
        phoneNumber: '0812xxxxxxxx',
        address: 'Jl. ABC No. 7'
      });
      expect(response.status).toBe(400);
      expect(response.body.errors).toBeInstanceOf(Array);
      expect(response.body.errors[0].message).toBe('Password field is required');
    });
  });

  describe('POST /pub/register - 400', () => {
    it('should return Email field is required', async () => {
      const response = await request(app).post('/pub/register').send({
        username: 'user',
        password: '123456',
        phoneNumber: '0812xxxxxxxx',
        address: 'Jl. ABC No. 7'
      });
      expect(response.status).toBe(400);
      expect(response.body.errors).toBeInstanceOf(Array);
      expect(response.body.errors[0].message).toBe('Email field is required');
    });
  });

  describe('POST /pub/register - 400', () => {
    it('should return Password field is required', async () => {
      const response = await request(app).post('/pub/register').send({
        username: '',
        email: 'user@mail.com',
        phoneNumber: '0812xxxxxxxx',
        address: 'Jl. ABC No. 7'
      });
      expect(response.status).toBe(400);
      expect(response.body.errors).toBeInstanceOf(Array);
      expect(response.body.errors[0].message).toBe('Password field is required');
    });
  });

  describe('POST /pub/register - 400', () => {
    it('should return Email address already in use!', async () => {
      const response = await request(app).post('/pub/register').send({
        username: 'user',
        email: 'l.anshacerbia@gmail.com',
        password: '123456',
        phoneNumber: '0812xxxxxxxx',
        address: 'Jl. ABC No. 7'
      });
      expect(response.status).toBe(400);
      expect(response.body.errors).toBeInstanceOf(Array);
      expect(response.body.errors[0].message).toBe('Email address already in use!');
    });
  });

  describe('POST /pub/register - 400', () => {
    it('should return Please input valid email', async () => {
      const response = await request(app).post('/pub/register').send({
        username: 'user',
        email: 'email',
        password: '123456',
        phoneNumber: '0812xxxxxxxx',
        address: 'Jl. ABC No. 7'
      });
      expect(response.status).toBe(400);
      expect(response.body.errors).toBeInstanceOf(Array);
      expect(response.body.errors[0].message).toBe('Please input valid email');
    });
  });
});

describe('POST /pub/login', () => {
  describe('POST /pub/login - 200', () => {
    it('should return an access token and user insensitive info', async () => {
      const response = await request(app).post('/pub/login').send({
        email: 'user@gmail.com',
        password: '123456'
      });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('access_token', expect.any(String));
      expect(response.body.message).toBe('User logged in successfully');
      expect(response.body.user).toBeInstanceOf(Object);
    });
  });

  describe('POST /pub/login - 401', () => {
    it('should return an Invalid email or password', async () => {
      const response = await request(app).post('/pub/login').send({
        email: 'user@mail.com',
        password: 'salahpassword'
      });
      expect(response.status).toBe(401);
      expect(response.body.error.message).toBe('Invalid email or password');
    });
  });

  describe('POST /pub/login - 401', () => {
    it('should return an Invalid email or password', async () => {
      const response = await request(app).post('/pub/login').send({
        email: 'salahemail',
        password: '123456'
      });
      expect(response.status).toBe(401);
      expect(response.body.error.message).toBe('Invalid email or password');
    });
  });

  describe('POST /pub/login - 401', () => {
    it('should return an Password is required', async () => {
      const response = await request(app).post('/pub/login').send({
        email: 'user@mail.com'
      });
      expect(response.status).toBe(400);
      expect(response.body.errors[0].message).toBe('Password is required');
    });
  });

  describe('POST /pub/login - 401', () => {
    it('should return an Email is required', async () => {
      const response = await request(app).post('/pub/login').send({
        password: '123456'
      });
      expect(response.status).toBe(400);
      expect(response.body.errors[0].message).toBe('Email is required');
    });
  });
});

describe('/pub/movies', () => {
  describe('GET /pub/movies - success with access token', () => {
    it('should return data in Object', async () => {
      const response = await request(app).get('/pub/movies', { headers: { access_token: token } });
      expect(response.status).toBe(200);
      expect(response.body.data).toBeInstanceOf(Object);
      expect(response.body.data).toHaveProperty('count', expect.any(Number));
      expect(response.body.data).toHaveProperty('rows', expect.any(Array));
    });
  });

  describe('GET /pub/moviess - success without access token', () => {
    it('should return data in Object', async () => {
      const response = await request(app).get('/pub/movies')
      expect(response.status).toBe(200);
      expect(response.body.data).toBeInstanceOf(Object);
      expect(response.body.data).toHaveProperty('count', expect.any(Number));
      expect(response.body.data).toHaveProperty('rows', expect.any(Array));
    });
  });

  describe('GET /movies - success with token and with query search', () => {
    it('should return data in Object', async () => {
      const response = await request(app).get('/pub/movies?search=tomb', { headers: { access_token: token } });
      expect(response.status).toBe(200);
      expect(response.body.data).toBeInstanceOf(Object);
      expect(response.body.data).toHaveProperty('count', expect.any(Number));
      expect(response.body.data).toHaveProperty('rows', expect.any(Array));
    });
  });

  describe('GET /movies - success without token and with query search', () => {
    it('should return data in Object', async () => {
      const response = await request(app).get('/pub/movies?search=tomb');
      expect(response.status).toBe(200);
      expect(response.body.data).toBeInstanceOf(Object);
      expect(response.body.data).toHaveProperty('count', expect.any(Number));
      expect(response.body.data).toHaveProperty('rows', expect.any(Array));
    });
  });

  describe('GET /movies - success with token and without query page', () => {
    it('should return data in Object', async () => {
      const response = await request(app).get('/pub/movies?page=2', { headers: { access_token: token } });
      expect(response.status).toBe(200);
      expect(response.body.data).toBeInstanceOf(Object);
      expect(response.body.data).toHaveProperty('count', expect.any(Number));
      expect(response.body.data).toHaveProperty('rows', expect.any(Array));
    });
  });

  describe('GET /movies - success without token and with query page', () => {
    it('should return data in Object', async () => {
      const response = await request(app).get('/pub/movies?page=2');
      expect(response.status).toBe(200);
      expect(response.body.data).toBeInstanceOf(Object);
      expect(response.body.data).toHaveProperty('count', expect.any(Number));
      expect(response.body.data).toHaveProperty('rows', expect.any(Array));
    });
  });

  describe('GET /movies - success get movie deatil with params id', () => {
    it('should return data in Object', async () => {
      const response = await request(app).get('/pub/movies/1');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('data', expect.any(Object));
      expect(response.body).toHaveProperty('qr', expect.any(String));
    });
  });

  describe('GET /movies - 404', () => {
    it('should return data in Object', async () => {
      const response = await request(app).get('/pub/movies/20');
      expect(response.status).toBe(404);
      expect(response.body.error.message).toBe('Movie not found');
    });
  });
});

describe('/pub/bookmarks', () => {
  describe('GET /pub/bookmarks ', () => {
    test('200 Success get bookmarks', (done) => {
      request(app)
        .get('/pub/bookmarks')
        .set('access_token', tokenUser)
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(200);
          expect(body.data).toBeInstanceOf(Object);
          expect(body.data).toHaveProperty('count', expect.any(Number));
          expect(body.data).toHaveProperty('rows', expect.any(Array));
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });
  describe('POST /pub/bookmarks/:id - with access token', () => {
    test('201 Success add bookmarks', (done) => {
      request(app)
        .post('/pub/bookmarks/2')
        .set('access_token', tokenUser)
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(201);
          expect(body.message).toBe('NewBookmark hass been added');
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  describe('POST /pub/bookmarks/:id - with access token', () => {
    test('404 Movie not found', (done) => {
      request(app)
        .post('/pub/bookmarks/20')
        .set('access_token', tokenUser)
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(404);
          expect(body.error.message).toBe('Movie not found');
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  describe('GET /pub/bookmarks - without access token', () => {
    test('401 Missing Token', (done) => {
      request(app)
        .get('/pub/bookmarks')
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(401);
          expect(body.error.message).toBe('Missing Token');
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  describe('GET /pub/bookmarks - with access token (admin/staff)', () => {
    test('403 Forbidden', (done) => {
      request(app)
        .get('/pub/bookmarks')
        .set('access_token', token)
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(403);
          expect(body.error.message).toBe('Forbidden');
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });
});





if (process.env.NODE_ENV !== "production") require("dotenv").config();
const request = require("supertest");
const app = require("../app");
const {
  User,
  Product,
  Category,
  SubCategory,
  Image,
  Address,
  sequelize,
} = require("../models");
const jwt = require("jsonwebtoken");
let users = require("../data/superadmin.json");
const categories = require("../data/categories.json");
const subCategories = require("../data/subcategories.json");
const address = require("../data/addresses.json");
const products = require("../data/products.json");
const images = require("../data/images.json");
const { hashPw, jwtSign } = require("../helpers");

export let tokenAnsha;
export let tokenRyan;
// const ansha = {
//   email: "sc.anshacerbia@gmail.com",
//   password: "123456"
// };
// const ryan = {
//   email: "ryanx@mail.com",
//   password: "123456"
// };

// beforeAll(async () => {
//   // await User.bulkCreate(users);
//   // await Category.bulkCreate(categories);
//   // await SubCategory.bulkCreate(subCategories);
//   // await Product.bulkCreate(products);
//   // await Image.bulkCreate(images);
//   // await Address.bulkCreate(address);
//   const ansha = await User.findOne({
//     where: {
//       email: "sc.anshacerbia@gmail.com"
//     },
//   });
//   const anshaPayload = {
//     id:  ansha.id
//   }
//   const createTokenAnsha = jwtSign(anshaPayload, process.env.SECRET);
//   const ryan = await User.findOne({
//     where: {
//       email: "ryanx@mail.com"
//     }
//   });
//   tokenAnsha = crea
//   const ryanPayload = {
//     id: ryan.id
//   }
//   const createTokenAnsha = jwtSign(ryanPayload, process.env.SECRET);
// });

// afterAll(async () => {
//   await User.destroy({
//     truncate: true,
//     restartIdentity: true,
//     cascade: true,
//   });
//   // await Category.destroy({
//   //   truncate: true,
//   //   restartIdentity: true,
//   //   cascade: true,
//   // });
//   // await SubCategory.destroy({
//   //   truncate: true,
//   //   restartIdentity: true,
//   //   cascade: true,
//   // });
//   // await Product.destroy({
//   //   truncate: true,
//   //   restartIdentity: true,
//   //   cascade: true,
//   // });
// });

describe("USER ROUTES", () => {
  describe("POST SUCCESS /login - 200", () => {
    it("output ====> ACCESS_TOKEN", async () => {
      const response = await request(app).post("/login").send({
        email: "hajiali@gmail.com",
        password: "123456",
      });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("access_token", expect.any(String));
    });
  }); // OK
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
      expect(response.body.message).toBe('Account has been successfully added.');
    });
  });
  describe('POST FAIL /register - 201', () => {
    it('output ====> BAD REQUEST 400, EMAIL IS ALREADY EXIST', async () => {
      const response = await request(app).post('/register').send({
        fName: 'Hitam',
        lName: 'Putih',
        email: 'hitamputih@gmail.com',
        password: '123456',
        phoneNumber: '081212121212'
      });
      expect(response.status).toBe(400);
    });
  });
  describe('POST FAIL /register - 400', () => {
    it('output ====> BAD REQUEST 400, IF EMAIL IS NULL', async () => {
      const response = await request(app).post('/register').send({
        fName: 'Hitam',
        lName: 'Putih',
        password: '123456',
        phoneNumber: '081212121212'
      });
      expect(response.status).toBe(400);
      expect(response.body.errors).toBeInstanceOf(Array);
      expect(response.body.errors[0].message).toBe('Email is required.');
    });
  });
  describe('POST FAIL /register - 400', () => {
    it('output ====> BAD REQUEST 400, PASSWORD IS NULL', async () => {
      const response = await request(app).post('/register').send({
        fName: 'Hitam',
        lName: 'Putih',
        email: 'hitamputih@gmail.com',
        phoneNumber: '081212121212'
      });
      expect(response.status).toBe(400);
      expect(response.body.errors).toBeInstanceOf(Array);
      expect(response.body.errors[0].message).toBe('Password is required.');
    });
  });
  describe('POST FAIL /register - 400', () => {
    it('output ====> BAD REQUEST 400, FIRSTNAME IS NULL', async () => {
      const response = await request(app).post('/register').send({
        lName: 'Putih',
        email: 'hitamputih@gmail.com',
        password: '123456',
        phoneNumber: '081212121212'
      });
      expect(response.status).toBe(400);
      expect(response.body.errors).toBeInstanceOf(Array);
      expect(response.body.errors[0].message).toBe('First Name is required.');
    });
  });
  describe('POST FAIL /register - 400', () => {
    it('output ====> BAD REQUEST 400, LASTNAME IS NULL', async () => {
      const response = await request(app).post('/register').send({
        fName: 'Hitam',
        email: 'hitamputih@gmail.com',
        password: '123456',
        phoneNumber: '081212121212'
      });
      expect(response.status).toBe(400);
      expect(response.body.errors).toBeInstanceOf(Array);
      expect(response.body.errors[0].message).toBe('Last Name is required.');
    });
  });
  // FETCH USER
  describe('GET USER SUCCESS', () => {
    it('output ====> ', async () => {
      const response = await request(app).get('/users');
      // console.log(response);
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });
  // FETCH USER BY ID
  describe('GET USER SUCCESS', () => {
    it('output ====> 200', async () => {
      const response = await request(app).get('/users/1');
      // console.log(response);
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
    });
  });
  // FETCH USER BY ID
  describe('GET USER BY ID FAIL', () => {
    it('output ====> 404', async () => {
      const response = await request(app).get('/users/120001222');
      expect(response.status).toBe(404);
    });
  });
  describe('POST FAIL /users/address - 201', () => {
    it('output ====> Missing Token', async () => {
      const response = await request(app).post('/users/address').send({
        "name": "Rumah Haji Ali",
        "street": "Jl. ABC No. 7",
        "province": "DKI Jakarta",
        "city": "Jakarta Selatan",
        "provinceId": 32,
        "cityId": 3275,
        "default": true,
        "UserId": 2
      });
      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Missing Token');
    });
  });
  describe('POST SUCCESS /ADD USER ADDRESS - 201', () => {
    it('output ====> Address has been successfully added.', async () => {
      const response = await request(app).post('/users/address').send({
        "name": "Rumah Haji Ali",
        "street": "Jl. ABC No. 7",
        "province": "DKI Jakarta",
        "city": "Jakarta Selatan",
        "provinceId": 32,
        "cityId": 3275,
        "default": true,
        "UserId": 2
      })
      .set('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE2NjU0MjU0NzF9.Dki6ztRq1vrZjPOB9q-XA-SdF3ljt2A7tbPxqd3mPDg')
      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Address has been successfully added.');
    });
  });
});


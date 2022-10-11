if (process.env.NODE_ENV !== "production") require("dotenv").config();
const request = require("supertest");
const app = require("../app");
const { User, Cart } = require("../models");
const { hashPw, jwtSign } = require("../helpers");

let tokenAnsha;
let tokenRyan;

beforeAll(async () => {
  // await User.bulkCreate(users);
  // await Category.bulkCreate(categories);
  // await SubCategory.bulkCreate(subCategories);
  // await Product.bulkCreate(products);
  // await Image.bulkCreate(images);
  // await Address.bulkCreate(address);
  const ansha = await User.findOne({
    where: {
      email: "sc.anshacerbia@gmail.com"
    },
  });
  const anshaPayload = {
    id:  ansha.id
  }
  tokenAnsha = jwtSign(anshaPayload, process.env.SECRET);
  const ryan = await User.findOne({
    where: {
      email: "ryanhunter@mail.com"
    }
  });
  const ryanPayload = {
    id: ryan.id
  }
  tokenRyan = jwtSign(ryanPayload, process.env.SECRET);
});

describe('TESTING - CART ROUTES', () => {
  describe('GET SUCCESS - CART', () => {
    it('output ====> GET CART TEST', async () => {
      const response = await request(app).get('/cart')
      .set('access_token', tokenAnsha);
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });
  describe("GET FAIL - CART ROUTES", () => {
    it("output ====> ERROR", async () => {
      Cart.findAll = jest.fn().mockRejectedValue("Error");
      request(app)
        .get("/cart")
        .set('access_token', tokenAnsha)
        .then((res) => {
          expect(res.status).toBe(500);
          expect(res.body.error).toBe("Error");
        })
    });
  });
  describe('GET FAIL - CART ROUTES', () => {
    it('output ====> FAIL MISSING TOKEN', async () => {
      const response = await request(app).get('/cart')
      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Missing Token");
    });
  });
  describe('POST - CART', () => {
    it('output ====> SUCCESS ADD CART', async () => {
      const response = await request(app).post('/cart')
      .send({
        "quantity": 2, 
        "ProductId": 2
      })
      .set('access_token', tokenAnsha);
      expect(response.status).toBe(201);
      expect(response.body.message).toBe("Product has been successfully added to cart.");
    });
  });
  describe('POST FAIL - CART', () => {
    it('output ====> FAIL NO TOKEN ADD CART', async () => {
      const response = await request(app).post('/cart')
      .send({
        "quantity": 2, 
        "ProductId": 2
      })
      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Missing Token");
    });
  });
  describe('POST FAIL - CART', () => {
    it('output ====> FAIL PRODUCT NOT FOUND', async () => {
      const response = await request(app).post('/cart')
      .send({
        "quantity": 2, 
        "ProductId": 1000001
      })
      .set('access_token', tokenAnsha);
      console.log(response);
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Product not found");
    });
  });
  describe('DELETE FAIL - CART', () => {
    it('output ====> FAIL PRODUCT NOT FOUND', async () => {
      const response = await request(app).delete('/cart/2')
      .set('access_token', process.env.TOKEN);
      expect(response.status).toBe(500);
      // expect(response.body.message).toBe("Product not found");
    });
  }); // NOT OK
  describe('DELETE FAIL - CART', () => {
    it('output ====> FAIL DELETE PRODUCT MISSING TOKEN', async () => {
      const response = await request(app).delete('/cart/2')
      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Missing Token");
    });
  });
  describe('DELETE FAIL - CART', () => {
    it('output ====> FAIL DELETE PRODUCT AUTHORIZATION', async () => {
      const response = await request(app).delete('/cart/1')
      .set('access_token', tokenRyan);
      expect(response.status).toBe(500);
      // expect(response.body.message).toBe("Missing Token");
    });
  });
});


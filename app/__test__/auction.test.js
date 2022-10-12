if (process.env.NODE_ENV !== "production") require("dotenv").config();
const request = require("supertest");
const app = require("../app");
const { User, Cart } = require("../models");
const { hashPw, jwtSign } = require("../helpers");

let tokenAnsha;
let tokenRyan;
let tokenHajiAli;

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
      email: "ryanx@mail.com"
    }
  });
  const ryanPayload = {
    id: ryan.id
  }
  tokenRyan = jwtSign(ryanPayload, process.env.SECRET);
  const hajiali = await User.findOne({
    where: {
      email: "hajiali@gmail.com"
    }
  })
  const hajiAliPayload = {
    id: hajiali.id
  }
  tokenHajiAli = jwtSign(hajiAliPayload, process.env.SECRET)
});

beforeEach(() => {
  jest.restoreAllMocks();
});

describe('CREATE - AUCTION SUCCESS', () => {
  it('output ====> Response 201', async () => {
    const response = await request(app).get('/auctions')
    .send({
      'name': 'Keris',
      'imgUrl': 'https://cdn.pixabay.com/photo/2022/10/04/14/19/plant-7498330_960_720.jpg',
      'description': 'Lorem ipsum dolor sit amet',
    })
    .set('access_token', tokenAnsha)
    expect(response.status).toBe(200);
    // expect(response.body).toBeInstanceOf(Array);
  });
});

describe('GET - AUCTION SUCCESS', () => {
  it('output ====> Response 201', async () => {
    const response = await request(app).get('/auctions')
    expect(response.status).toBe(200);
    // expect(response.body).toBeInstanceOf(Array);
  });
});

describe('GET - AUCTION SUCCESS', () => {
  it('output ====> Response 201', async () => {
    const response = await request(app).get('/auctions')
    expect(response.status).toBe(200);
    // expect(response.body).toBeInstanceOf(Array);
  });
});

describe('GET - AUCTION SUCCESS PENDING', () => {
  it('output ====> AUCTION SUCCESS', async () => {
    const response = await request(app).get('/auctions/pending')
    expect(response.status).toBe(200);
    // expect(response.body).toBeInstanceOf(Array);
  });
});

describe('GET - AUCTION SUCCESS ARCHIEVED', () => {
  it.only('output ====> AUCTION SUCCESS', async () => {
    const response = await request(app).get('/auctions/archieved')
    expect(response.status).toBe(404);
    // expect(response.body).toBeInstanceOf(Array);
  });
});


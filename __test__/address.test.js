if (process.env.NODE_ENV !== "production") require("dotenv").config();
const request = require("supertest");
const app = require("../app");

beforeEach(() => {
  jest.restoreAllMocks();
});

describe('GET PROVINCES SUCCESS', () => {
  it('output ====> Data of Provinces ', async () => {
    const response = await request(app).get('/provinces');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});
if (process.env.NODE_ENV !== "production") require("dotenv").config();
const request = require("supertest");
const app = require("../app");

describe('GET CATEGORY SUCCESS', () => {
  it('output ====> Array of Object - Category Data  ', async () => {
    const response = await request(app).get('/categories');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});

describe('GET SUB CATEGORY SUCCESS', () => {
  it('output ====> Array of Object - Sub Category Data  ', async () => {
    const response = await request(app).get('/sub-categories');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});

describe('GET SUB CATEGORY SUCCESS', () => {
  it('output ====> Fetch Sub Category By Id', async () => {
    const response = await request(app).get('/sub-categories/1');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });
});

describe('POST SUB CATEGORY SUCCESS', () => {
  it('output ====> Sub Category has been added successfully', async () => {
    const response = await request(app).post('/sub-categories')
    .send({
      "name": "Sayur Hidroponik2",
      "CategoryId": 1
    })
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Sub Category has been added successfully");
  });
});

describe('PUT SUB CATEGORY SUCCESS', () => {
  it('output ====> Sub Category has been added successfully', async () => {
    const response = await request(app).put('/sub-categories')
    .send({
      "name": "Sayur Hidroponik2",
      "CategoryId": 1
    })
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Sub Category has been updated successfully.");
  });
});

describe('DELETE SUB CATEGORY SUCCESS', () => {
  it('output ====> Sub Category has been deleted successfully', async () => {
    const response = await request(app).delete('/sub-categories/1')
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Sub Category has been deleted successfully");
  });
});
if (process.env.NODE_ENV !== "production") require("dotenv").config();
const request = require("supertest");
const app = require("../app");
const { Category, SubCategory } = require("../models");

beforeEach(() => {
  jest.restoreAllMocks();
});


describe("GET SUCCESS CATEGORY", () => {
  it("output ====> Data of Categories", async () => {
    const response = await request(app).get("/categories");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});

describe("GET CATEGORY FAIL", () => {
  it("output ====> ERROR", async () => {
    Category.findAll = jest.fn().mockRejectedValue("Error");
    request(app)
      .get("/categories")
      .then((res) => {
        expect(res.status).toBe(500);
        expect(res.body.error).toBe("Error");
      })
  });
});

describe("GET SUB CATEGORY SUCCESS", () => {
  it("output ====> Array of Object - Sub Category Data  ", async () => {
    const response = await request(app).get("/sub-categories");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});

describe("GET SUB CATEGORY SUCCESS", () => {
  it("output ====> Fetch Sub Category By Id", async () => {
    const response = await request(app).get("/sub-categories/1");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });
});
describe("GET SUB CATEGORY FAIL (16)", () => {
  it("output ====> ERROR", (done) => {
    jest.spyOn(SubCategory, 'findAll').mockRejectedValue('Error');
    // SubCategory.findAll = jest.fn().mockRejectedValue("Error");
    request(app)
      .get("/sub-categories")
      .then((res) => {
        expect(res.status).toBe(500);
        expect(res.body.error).toBe("Error");
        done();
      })
  });
});
describe("GET SUB CATEGORY FAIL (32)", () => {
  it("output ====> ERROR", (done) => {
    SubCategory.findAll = jest.fn().mockRejectedValue("Error");
    request(app)
      .get("/sub-categories/1")
      .then((res) => {
        expect(res.status).toBe(500);
        expect(res.body.error).toBe("Error");
        done();
      })
  });
}); 

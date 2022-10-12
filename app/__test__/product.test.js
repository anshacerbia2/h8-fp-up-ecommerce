if (process.env.NODE_ENV !== "production") require("dotenv").config();
const request = require("supertest");
const app = require("../app");
const { Product } = require("../models");
const { User } = require("../models");
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
    id: ansha.id,
    role: ansha.role
  }
  tokenAnsha = jwtSign(anshaPayload, process.env.SECRET);
  const ryan = await User.findOne({
    where: {
      email: "ryanx@mail.com"
    }
  });
  const ryanPayload = {
    id: ryan.id,
    role: ryan.role
  }
  tokenRyan = jwtSign(ryanPayload, process.env.SECRET);
  const hajiali = await User.findOne({
    where: {
      email: "hajiali@gmail.com"
    }
  })
  const hajiAliPayload = {
    id: hajiali.id,
    role: hajiali.role
  }
  tokenHajiAli = jwtSign(hajiAliPayload, process.env.SECRET)
});

beforeEach(() => {
  jest.restoreAllMocks();
});


describe('PRODUCT ROUTES', () => {
  describe('GET SUCCESS - ALL PRODUCTS SUCCESS', () => {
    it('output ====> Array of Object - Category Products  ', async () => {
      const response = await request(app).get('/products');
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });
  describe('GET SUCCESS - ALL LATEST PRODUCTS', () => {
    it('output ====> Array of Object - Category Products  ', async () => {
      const response = await request(app).get('/products/latest');
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });
  describe('GET SUCCESS - ALL LATEST PRODUCT SUCCESS', () => {
    it('output ====> Array of Object - Latest Category Products  ', async () => {
      const response = await request(app).get('/products/latest');
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });
  describe('GET SUCCESS - SPESIFIC PRODUCT BY ID', () => {
    it('output ====> Single Object of Spesific Product', async () => {
      const response = await request(app).get('/products/1');
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
    });
  });
  describe('GET SUCCESS - PRODUCT BY SUB CATEGORY', () => {
    it('output ====> Data of Spesific Sub Category', async () => {
      const response = await request(app).get('/products/?cat=2');
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });
  describe('GET FAIL - SPESIFIC PRODUCT BY ID', () => {
    it('output ====> Product not found', async () => {
      const response = await request(app).get('/products/1111111');
      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Product not found');
    });
  });
  describe('GET SUCCESS - FETCH PRODUCT BY TITLE', () => {
    it('output ====> Array of Object, Search Data', async () => {
      const response = await request(app).post('/products/search').send({
        "search": "Toma"
      })
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });
  describe('GET SUCCESS - FETCH PRODUCT BASED ON USER', () => {
    it('output ====> Data product of user', async () => {
      const response = await request(app).get('/products/user')
        .set(
          "access_token", tokenAnsha
        )
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });
  describe('GET FAIL - FETCH PRODUCT BASED ON USER', () => {
    it('output ====> 401 Missing Access Token', async () => {
      const response = await request(app).get('/products/user')
      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Missing Token");
    });
  });
  describe('POST FAIL - CREATE PRODUCT', () => {
    it('output ====> 400 Slug Already Use Create Product', async () => {
      const response = await request(app).post('/products')
        .send({
          "name": "Tomat Super",
          "slug": "tomat-super",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec erat luctus, vestibulum ante sodales, imperdiet est. Vivamus sodales mauris nisi. Etiam nec lacinia sem, nec dapibus eros. Cras sed turpis vitae odio posuere hendrerit viverra a sem. Phasellus neque ante, lacinia ut nibh in, pharetra accumsan ipsum. Nulla facilisi. Fusce consectetur malesuada metus, eget lobortis diam semper at. Etiam volutpat nec dui faucibus suscipit.",
          "price": 3000,
          "mainImg": "https://cdn.shopify.com/s/files/1/0018/8327/5325/products/184710490.webp?v=1659441918",
          "harvestDate": "2022-10-01 07:00:00+07",
          "unit": "kg",
          "stock": 100,
          "SubCategoryId": 2,
          "authorId": 2
        })
        .set("access_token", tokenAnsha);
      // console.log(response.body);
      expect(response.status).toBe(400);
      expect(response.body.errors[0].message).toBe("Slug already in used.");
    });
  });
  describe('POST SUCCESS - CREATE PRODUCT', () => {
    it('output ====> Product has been created successfully', async () => {
      const response = await request(app).post('/products')
        .send({
          "name": "Cabe Super",
          "slug": "cabe-super",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec erat luctus, vestibulum ante sodales, imperdiet est.",
          "price": 4000,
          "mainImg": "https://cdn.shopify.com/s/files/1/0018/8327/5325/products/184710490.webp?v=1659441918",
          "harvestDate": "2022-10-01 07:00:00+07",
          "unit": "kg",
          "stock": 100,
          "SubCategoryId": 2,
          "authorId": 1
        })
        .set("access_token", tokenAnsha);
      expect(response.status).toBe(201);
      expect(response.body.message).toBe("Product has been added successfully");
    });
  });
  describe('POST FAIL - CREATE PRODUCT', () => {
    it('output ====> 401 Missing Token', async () => {
      const response = await request(app).post('/products')
        .send({
          "name": "Tomat KW1",
          "slug": "tomat-kw1",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec erat luctus, vestibulum ante sodales, imperdiet est. Vivamus sodales mauris nisi. Etiam nec lacinia sem, nec dapibus eros. Cras sed turpis vitae odio posuere hendrerit viverra a sem. Phasellus neque ante, lacinia ut nibh in, pharetra accumsan ipsum. Nulla facilisi. Fusce consectetur malesuada metus, eget lobortis diam semper at. Etiam volutpat nec dui faucibus suscipit.",
          "price": 300,
          "mainImg": "https://cdn.shopify.com/s/files/1/0018/8327/5325/products/184710490.webp?v=1659441918",
          "harvestDate": "2022-10-01 07:00:00+07",
          "unit": "kg",
          "stock": 100,
          "SubCategoryId": 2,
          "authorId": 2
        })
      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Missing Token");
    });
  });
  describe('PUT SUCCESS - PUT PRODUCT', () => {
    it('output ====> Product has been updated successfully', async () => {
      const response = await request(app).put('/products/1')
        .send({
          "name": "Tomat KW1",
          "slug": "tomat-kw1",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec erat luctus, vestibulum ante sodales, imperdiet est. Vivamus sodales mauris nisi. Etiam nec lacinia sem, nec dapibus eros. Cras sed turpis vitae odio posuere hendrerit viverra a sem. Phasellus neque ante, lacinia ut nibh in, pharetra accumsan ipsum. Nulla facilisi. Fusce consectetur malesuada metus, eget lobortis diam semper at. Etiam volutpat nec dui faucibus suscipit.",
          "price": 300,
          "mainImg": "https://cdn.shopify.com/s/files/1/0018/8327/5325/products/184710490.webp?v=1659441918",
          "harvestDate": "2022-10-01 07:00:00+07",
          "unit": "kg",
          "stock": 100,
          "SubCategoryId": 2,
          "authorId": 2
        })
        .set("access_token", tokenHajiAli)
      console.log(response.body, "respondse")
      expect(response.status).toBe(200)
      expect(response.body.message).toBe("Product has been updated successfully")
    })
  })
  describe('PUT FAIL - PUT PRODUCT', () => {
    it('output ====> 401 Missing Token', async () => {
      const response = await request(app).put('/products/1')
        .send({
          "name": "Tomat KW1",
          "slug": "tomat-kw1",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec erat luctus, vestibulum ante sodales, imperdiet est. Vivamus sodales mauris nisi. Etiam nec lacinia sem, nec dapibus eros. Cras sed turpis vitae odio posuere hendrerit viverra a sem. Phasellus neque ante, lacinia ut nibh in, pharetra accumsan ipsum. Nulla facilisi. Fusce consectetur malesuada metus, eget lobortis diam semper at. Etiam volutpat nec dui faucibus suscipit.",
          "price": 300,
          "mainImg": "https://cdn.shopify.com/s/files/1/0018/8327/5325/products/184710490.webp?v=1659441918",
          "harvestDate": "2022-10-01 07:00:00+07",
          "unit": "kg",
          "stock": 100,
          "SubCategoryId": 2,
          "authorId": 2
        })
      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Missing Token");
    });
  });
  // describe('PUT FAIL - PUT PRODUCT', () => {
  //   it('output ====> Product not found', async () => {
  //     const response = await request(app).put('/products/1221112')
  //     .send({
  //       "name": "Tomat KW1131",
  //       "slug": "tomat-KW1131",
  //       "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec erat luctus, vestibulum ante sodales, imperdiet est. Vivamus sodales mauris nisi. Etiam nec lacinia sem, nec dapibus eros. Cras sed turpis vitae odio posuere hendrerit viverra a sem. Phasellus neque ante, lacinia ut nibh in, pharetra accumsan ipsum. Nulla facilisi. Fusce consectetur malesuada metus, eget lobortis diam semper at. Etiam volutpat nec dui faucibus suscipit.",
  //       "price": 300,
  //       "mainImg": "https://cdn.shopify.com/s/files/1/0018/8327/5325/products/184710490.webp?v=1659441918",
  //       "harvestDate": "2022-10-01 07:00:00+07",
  //       "unit": "kg",
  //       "stock": 100,
  //       "SubCategoryId": 2,
  //       "authorId": 2
  //     })
  //     .set('access_token', tokenAnsha);
  //     expect(response.body.error.message).toBe("Product not found");
  //   });
  // });
  describe('DELETE SUCCESS -  DELETE SPESIFIC PRODUCT', () => {
    it('output ====> Product has been deleted successfully', async () => {
      const response = await request(app).delete('/products/3')
        .set('access_token', tokenAnsha)
      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Product has been deleted successfully");
    });
  });

  describe('DELETE FAIL -  DELETE SPESIFIC PRODUCT', () => {
    it('output ====> Missing Token', async () => {
      const response = await request(app).delete('/products/3')
      // console.log(response);
      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Missing Token");
    });
  });
  describe('DELETE FAIL -  DELETE SPESIFIC PRODUCT', () => {
    it('output ====> FAIL UNAUTHORIZED', async () => {
      const response = await request(app).delete('/products/2')
        .set('access_token', tokenHajiAli)
      expect(response.status).toBe(403);
    });
  });
  // Product.findAll
  describe("GET PRODUCT FAIL", () => {
    it("output ====> ERROR", (done) => {
      jest.spyOn(Product, 'findAll').mockRejectedValue('Error');
      // Product.findAll = jest.fn().mockRejectedValue("Error");
      request(app)
        .get("/products")
        .then((res) => {
          expect(res.status).toBe(500);
          expect(res.body.error).toBe("Error");
          done()
        })
    });
  });
  describe("GET PRODUCT FAIL LATEST", () => {
    it("output ====> ERROR", (done) => {
      jest.spyOn(Product, "findAll").mockRejectedValue("Error");
      // Product.findAll = jest.fn().mockRejectedValue("Error");
      request(app)
        .get("/products/latest")
        .then((res) => {
          expect(res.status).toBe(500);
          expect(res.body.error).toBe("Error");
          done();
        })
    });
  });
});
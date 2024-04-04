const request = require("supertest");
const app = require("./test-app/test.app.js");
const db = require("../config/db");

beforeAll(async () => {
  await db.sequelize.sync();
});

describe("Stroge CRUD functions", () => {
  let token;
  let cookie;

  let storageId;

  beforeAll(async () => {
    await db.sequelize.authenticate();
  });

  beforeAll(async () => {
    await request(app)
      .post("/auth/login")
      .send({
        username: "testni-admin",
        role: "admin",
        password: "test",
      })
      .then((response) => {
        cookie = response.headers["set-cookie"];
        token = response.body.token;
      });
  });

  describe("getStorages", () => {
    it("should get all strorages", async () => {
      const res = await request(app)
        .get("/storage")
        .set("Authorization", `${token}`)
        .set("Cookie", cookie);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("length");
    });
  });

  describe("createStorage", () => {
    it("should create a new storage", async () => {
      const res = await request(app)
        .post("/storage")
        .set("Authorization", `${token}`)
        .set("Cookie", cookie)
        .send({ status: "Status" });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("id");
      storageId = res.body.id;
    });
  });

  describe("getUniqueStorage", () => {
    it("should get a unique storage", async () => {
      const res = await request(app)
        .get(`/storage/${storageId}`)
        .set("Authorization", `${token}`)
        .set("Cookie", cookie);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("id", storageId);
    });

    it("should not get a non-existent storage", async () => {
      const res = await request(app)
        .get("/storage/9999")
        .set("Authorization", `${token}`)
        .set("Cookie", cookie);

      expect(res.statusCode).toEqual(404);
    });
  });

  describe("getStorageStatus", () => {
    it("should get a storage status", async () => {
      const res = await request(app)
        .get(`/storage/${storageId}/status`)
        .set("Authorization", `${token}`)
        .set("Cookie", cookie);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("status");
    });

    it("should not get a non-existent storage status", async () => {
      const res = await request(app)
        .get("/storage/9999/status")
        .set("Authorization", `${token}`)
        .set("Cookie", cookie);

      expect(res.statusCode).toEqual(404);
    });
  });

  describe("getAvailableItemsForStorage", () => {
    it("should get available items for a storage", async () => {
      const res = await request(app)
        .get(`/storage/${storageId}/items`)
        .set("Authorization", `${token}`)
        .set("Cookie", cookie);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("length");
    });

    it("should not get available items for a non-existent storage", async () => {
      const res = await request(app)
        .get("/storage/9999/items")
        .set("Authorization", `${token}`)
        .set("Cookie", cookie);

      expect(res.statusCode).toEqual(404);
    });
  });

  describe("updateStorage", () => {
    it("should update an storage", async () => {
      const res = await request(app)
        .put(`/storage/${storageId}`)
        .set("Authorization", `${token}`)
        .set("Cookie", cookie)
        .send({ status: "Updated Status" });

      expect(res.statusCode).toEqual(200);
    });

    it("should not update a non-existent storage", async () => {
      const res = await request(app)
        .put("/storage/9999")
        .set("Authorization", `${token}`)
        .set("Cookie", cookie)
        .send({ status: "Updated Status" });

      expect(res.statusCode).toEqual(404);
    });
  });

  describe("deleteStorage", () => {
    it("should delete an storage", async () => {
      const res = await request(app)
        .delete(`/storage/${storageId}`)
        .set("Authorization", `${token}`)
        .set("Cookie", cookie);

      expect(res.statusCode).toEqual(200);
    });

    it("should not delete a non-existent storage", async () => {
      const res = await request(app)
        .delete("/storage/9999")
        .set("Authorization", `${token}`)
        .set("Cookie", cookie);

      expect(res.statusCode).toEqual(404);
    });
  });
});

afterAll(async () => {
  await db.sequelize.close();
});

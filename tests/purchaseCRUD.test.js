const request = require("supertest");
const { authenticateTestUser } = require("../utils/testHelper");

const app = require("./test-app/test.app.js");
const db = require("../config/db");

beforeAll(async () => {
    await db.sequelize.sync();
});

describe("Purchase CRUD functions", () => {
    let token;
    let cookie;

    let purchaseId;

    beforeAll(async () => {
        await db.sequelize.authenticate();
    });

    beforeAll(async () => {
        ({ token, cookie } = await authenticateTestUser(app));
    });

    describe("getAllPurchaseOrders", () => {
        it("should get all purchase orders", async () => {
            const res = await request(app)
                .get("/purchase")
                .set("Authorization", `${token}`)
                .set("Cookie", cookie);

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty("length");
        });
    });

    describe("createPurchaseOrder", () => {
        it("should create a new purchase", async () => {
            const res = await request(app)
                .post("/purchase")
                .set("Authorization", `${token}`)
                .set("Cookie", cookie)
                .send({
                    items: [
                        { id: 153, quantity: 2 },
                        { id: 154, quantity: 3 },
                    ],
                    tableId: 1,
                });

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty("id");
            purchaseId = res.body.id;
        });
    });

    describe("getPurchaseOrderById", () => {
        it("should get a purchase by id", async () => {
            const res = await request(app)
                .get(`/purchase/${purchaseId}`)
                .set("Authorization", `${token}`)
                .set("Cookie", cookie);

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty("id");
        });

        it("should not get a non-existent purchase", async () => {
            const res = await request(app)
                .get("/purchase/9999")
                .set("Authorization", `${token}`)
                .set("Cookie", cookie);

            expect(res.statusCode).toEqual(404);
        });
    });

    describe("updatePurchaseOrder", () => {
        it("should update purchase", async () => {
            const res = await request(app)
                .put(`/purchase/${purchaseId}`)
                .set("Authorization", `${token}`)
                .set("Cookie", cookie)
                .send({
                    items: [
                        { id: 153, quantity: 2 },
                        { id: 154, quantity: 3 },
                    ],
                    tableId: 2,
                });

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty("id");
            expect(res.body.tableId).toEqual(2);
        });

        it("should not update a non-existent purchase", async () => {
            const res = await request(app)
                .put("/purchase/9999")
                .set("Authorization", `${token}`)
                .set("Cookie", cookie)
                .send({
                    items: [
                        { id: 153, quantity: 2 },
                        { id: 154, quantity: 3 },
                    ],
                    tableId: 2,
                });

            expect(res.statusCode).toEqual(404);
        });
    });

    describe("deletePurchaseOrder", () => {
        it("should delete a purchase", async () => {
            const res = await request(app)
                .delete(`/purchase/${purchaseId}`)
                .set("Authorization", `${token}`)
                .set("Cookie", cookie);

            expect(res.statusCode).toEqual(200);
        });

        it("should not delete a non-existent purchase", async () => {
            const res = await request(app)
                .delete("/purchase/9999")
                .set("Authorization", `${token}`)
                .set("Cookie", cookie);

            expect(res.statusCode).toEqual(404);
        });
    });
});

afterAll(async () => {
    await db.sequelize.close();
});

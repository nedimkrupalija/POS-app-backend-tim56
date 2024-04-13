const request = require("supertest");
const { authenticateTestUser } = require("../utils/testHelper");

const app = require("./test-app/test.app.js");
const db = require("../config/db");

beforeAll(async () => {
    await db.sequelize.sync();
});

describe("Location CRUD functions", () => {
    let token;
    let cookie;

    let locationId;

    beforeAll(async () => {
        await db.sequelize.authenticate();
    });

    beforeAll(async () => {
        ({ token, cookie } = await authenticateTestUser(app));
    });

    describe("getLocations", () => {
        it("should get all locations", async () => {
            const res = await request(app)
                .get("/location")
                .set("Authorization", `${token}`)
                .set("Cookie", cookie);

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty("length");
        });
    });

    describe("createLocation", () => {
        it("should create a new location", async () => {
            const res = await request(app)
                .post("/location")
                .set("Authorization", `${token}`)
                .set("Cookie", cookie)
                .send({ name: "Test Location", address: "Test Address" });

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty("id");

            locationId = res.body.id;

            expect(res.body).toHaveProperty("name", "Test Location");
        });
    });

    describe("updateLocation", () => {
        it("should update an location", async () => {
            const res = await request(app)
                .put(`/location/${locationId}`)
                .set("Authorization", `${token}`)
                .set("Cookie", cookie)
                .send({ name: "Updated location" });

            expect(res.statusCode).toEqual(200);
        });

        it("should not update a non-existent location", async () => {
            const res = await request(app)
                .put("/location/9999")
                .set("Authorization", `${token}`)
                .set("Cookie", cookie)
                .send({ name: "Updated location" });

            expect(res.statusCode).toEqual(404);
        });
    });

    describe("deleteLocation", () => {
        it("should delete an location", async () => {
            const res = await request(app)
                .delete(`/location/${locationId}`)
                .set("Authorization", `${token}`)
                .set("Cookie", cookie);

            expect(res.statusCode).toEqual(200);
        });

        it("should not delete a non-existent location", async () => {
            const res = await request(app)
                .delete("/location/9999")
                .set("Authorization", `${token}`)
                .set("Cookie", cookie);

            expect(res.statusCode).toEqual(404);
        });
    });
});

afterAll(async () => {
    await db.sequelize.close();
});

import server from "../../src/server";
import request from "supertest";

// close the server after each test
afterEach((done) => {
  server.close();
  done();
});



describe("routes/healthcheck", () => {
  it("Should Answer to the Ultimate Question of Life, the Universe, and Everything", async () => {
    const response = await request(server).get("/healthcheck");
    expect(response.status).toEqual(200);
    expect(response.type).toEqual("application/json");
    expect(response.body.answer).toEqual(42);
  });
});

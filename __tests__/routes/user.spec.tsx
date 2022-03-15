import server from "../../src/server";
import request from "supertest";
import {IUserRegister} from "../../src/types/entities/IUser";
import {config} from "../../src/types/IConfig";

afterEach((done) => {
  server.close();
  done();
});


describe("routes/user", () => {
  const registerPayload: IUserRegister = {
    email: "random@email.com",
    name: "testinguser",
    password: "password_ "
  }

  const registerBadPayload: IUserRegister = {
    email: "", name: "", password: ""
  }

  const loginCredentials = {
    email: "random@email.com",
    password: "password_ "
  }

  // TODO: Why this test fails? In Postman test this works well
  it('should throw an error - bad payload', async function () {
    const response = await request(server).post('/user/register').send(registerBadPayload);

    expect(response.status).toEqual(400);
    expect(response.body.status).toEqual(config.responseMsg.badpayload);
  });


  it('should register new user for testing', async function () {
      const response = await request(server).post('/user/register').send(registerPayload);

      expect(response.status).toEqual(201);
      expect(response.body.status).toEqual(config.responseMsg.statusCreated);
  });

  // TODO: Why this test fails? In Postman test this works well
  it('should not register same user (duplicity)', async function () {
    const response = await request(server).post('/user/register').send(registerPayload);

    expect(response.status).toEqual(400);
    expect(response.body.status).toEqual(config.responseMsg.duplicity);
  });

  it('should login as testing user and get jwt token',async function () {
    const response = await request(server).post('/user/login').send(loginCredentials);

    expect(response.status).toEqual(200);
    expect(response.body.token).toBeDefined();
  });

  it('should visit about page - jwt testing', async function () {
    // TODO: How to test JWT?
  });

  it('should logout as testing user', function () {

  });

  it('should remove testing user from database', function () {

  });
});

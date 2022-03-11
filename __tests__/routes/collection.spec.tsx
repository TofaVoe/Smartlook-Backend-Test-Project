import server from "../../src/server";
import request from "supertest";
import {ICollectionAdd} from "../../src/types/entities/ICollection";
import {config} from "../../src/types/IConfig";

afterEach((done) => {
  server.close();
  done();
});

describe("routes/collection", () => {
  const payload: ICollectionAdd = {
    name: "test collection"
  }
    it('should create collection', async function () {
      const response = await request(server).post('/collection/add').send(payload);

      console.log(response)
      expect(response.status).toEqual(200);
      expect(response.body.status).toEqual(config.responseMsg.statusCreated);
    });
  }
);

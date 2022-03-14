import server from "../../src/server";
import request from "supertest";
import {ICollectionAdd, ICollectionRemove, ICollectionRename} from "../../src/types/entities/ICollection";
import {config} from "../../src/types/IConfig";

afterEach((done) => {
  server.close();
  done();
});

describe("routes/collection", () => {
  const collectionAdd: ICollectionAdd = {
    name: "test collection"
  }

  const collectionRename: ICollectionRename = {
    id: 10,
    name: "Smartlook"
  }

  const collectionRemove: ICollectionRemove = {
    id: 10
  }

  it('should create collection', async function () {
    const response = await request(server).post('/collection/add').send(collectionAdd);

    console.log(response)
    expect(response.status).toEqual(200);
    expect(response.body.status).toEqual(config.responseMsg.statusCreated);
  });

  it('should show all collections for user', async function () {
    const response = await request(server).get('/collection/show');

    console.log(response)
    expect(response.status).toEqual(200);
  });

  it('should rename collection', async function () {
    const response = await request(server).put('/collection/rename').send(collectionRename);

    console.log(response)
    expect(response.status).toEqual(200);
  });

  it('should delete collection', async function () {
    const response = await request(server).delete('/collection/delete').send(collectionRemove);

    console.log(response)
    expect(response.status).toEqual(200);
  });

  }
);

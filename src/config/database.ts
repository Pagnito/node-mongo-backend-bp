import { MongoClient } from 'mongodb';
import config from './config';
const url = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/test?retryWrites=true&writeConcern=majority';
const db_name = process.env.DB_NAME || 'test';
const mongo_client = new MongoClient(url, {
  poolSize: 20,
  useUnifiedTopology: true
});
export default {
  connect: async (cb: any) => {
    try {
      const client = await mongo_client.connect();
      const db = client.db(db_name);
      const collections = (await db.listCollections().toArray()).map(obj => obj.name);
      config.mongo_collections.forEach(collection=> {
        if(!collections.includes(collection)){
          db.createCollection(collection);
        }
      })
      cb(db);
    } catch (err) {
      throw err
    }
  }
};

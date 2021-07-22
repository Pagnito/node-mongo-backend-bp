import { User } from './types';
export default {
  getUserQuery: async (params: User, db: any) => {
    try {
      let client = await db.collection('user').findOne(params);
      return client;
    } catch (err) {
      return err;
    }
  },
  //////////////////////////////////////////////////////////////////////////////////////////////////////
  createUserQuery: async (payload: User, db: any) => {
    try {
      let client = await db.collection('user').insertOne(payload);
      return client.ops[0];
    } catch (err) {
      return err;
    }
  },
  //////////////////////////////////////////////////////////////////////////////////////////////////////
  updateUserQuery: async (query: User, payload: User, db: any) => {
    try {
      let updateUser = { $set: payload }
      let client = await db.collection('user').findOneAndUpdate(query, updateUser);
      return client.lastErrorObject.updatedExisting ? { message: 'updated' } : { message: 'Could not update record' };
    } catch (err) {
      return err;
    }
  },
  //////////////////////////////////////////////////////////////////////////////////////////////////////
  deleteUserQuery: async (params: User, db: any) => {
    try {
      await db.collection('user').deleteOne(params);
      return {message: 'deleted'};
    } catch (err) {
      return err;
    }
  }
};

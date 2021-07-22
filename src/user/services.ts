import dao from './dao';
import { User } from './types';
import userModel from './validator';
import builder from '../common/builder';
import bcrypt from 'bcrypt';
export default {
  getUser: async (params: User, db: any) => {
    let user = await dao.getUserQuery(params, db);
    delete user.password;
    let response = builder.response('placeholder', 'placeholder', '0000', user);
    return response;
  },
  //////////////////////////////////////////////////////////////////////////////////////////////////////
  updateUser: async (payload: User, db: any) => {
    let query = { email: payload.email };
    if (payload.newPassword && payload.password) {
      const user = await dao.getUserQuery(query, db);
      const validPassword = await bcrypt.compare(payload.password, user.password);
      if (validPassword) {
        const salt = await bcrypt.genSalt(Number(process.env.SALT) || 10);
        payload.password = await bcrypt.hash(payload.newPassword, salt);
        delete payload.newPassword;
      } else {
        return builder.response('placeholder', 'placeholder', '0000', {message: 'You entered wrong current password'});
      }
    } else if (payload.password && !payload.newPassword){
      delete payload.password;
    } 

    let updated = await dao.updateUserQuery(query, payload, db);
    let response = builder.response('placeholder', 'placeholder', '0000', updated);
    return response;
  },
  //////////////////////////////////////////////////////////////////////////////////////////////////////
  deleteUser: async (params: User, db: any) => {
    let deleted = await dao.deleteUserQuery(params, db);
    let response = builder.response('placeholder', 'placeholder', '0000', deleted);
    return response;
  },
  //////////////////////////////////////////////////////////////////////////////////////////////////////
  createUser: (payload: User, db: any) => {
    let validation = userModel(payload);
    if (validation.valid) {
      let getQuery = { email: payload.email };
      return dao
        .getUserQuery(getQuery, db)
        .then(async (res: any) => {
          if (res) {
            let error = builder.response('placeholder', 'placeholder', '0000', { message: 'User already exists' });
            return error;
          } else {
            const salt = await bcrypt.genSalt(Number(process.env.SALT) || 10);
            if (payload.password) payload.password = await bcrypt.hash(payload.password, salt);
            let user = await dao.createUserQuery(payload, db);
            delete user.password;
            let response = builder.response('placeholder', 'placeholder', '0000', user);
            return response;
          }
        })
        .catch((err: Error) => {
          let error = builder.response('placeholder', 'placeholder', '0000', { message: err.message });
          return error;
        });
    } else {
      let error = builder.response('placeholder', 'placeholder', '0000', { message: validation.error });
      return error;
    }
  }
};

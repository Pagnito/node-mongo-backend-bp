import bcrypt from 'bcrypt';
import { AuthInputs } from './types';
import jwt from 'jsonwebtoken';
import validator from './validator';
import builder from '../common/builder';

export default {
  authenticateUser: async (params: AuthInputs, db: any) => {
    try {
      const validation = validator(params);
      if (!validation) return builder.response('placeholder', 'placeholder', '0000', { message: 'Invalid email or password' });

      const user = await db.collection('user').findOne({ email: params.email });
      if (!user) return builder.response('placeholder', 'placeholder', '0000', { message: 'Invalid email or password' });

      const validPassword = await bcrypt.compare(params.password, user.password);
      if (!validPassword) return builder.response('placeholder', 'placeholder', '0000', { message: 'Invalid email or password' });

      const token = jwt.sign({ email: params.email }, 'key');
      let response = builder.response('placeholder', 'placeholder', '0000', { token: token });
      return response;
      
    } catch (err) {
      let error = builder.response('placeholder', 'placeholder', '0000', { message: err });
      return error;
    }
  }
};

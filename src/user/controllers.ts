import { Response, Application } from 'express';
import { AuthenticatedRequest } from './types';
import middlewares from '../common/middlewares';
import services from './services';
import errors from '../config/errors';

export default (app: Application, db: any) => {

  app.get('/user/get', async (req: AuthenticatedRequest, res: Response) => {
    try {
      let params = req.query;
      let user = await services.getUser(params, db);
      res.json(user);
    } catch (err) {
      console.log('ERROR in: ' + __filename + ' ' + err);
      res.status(500).json({ message: errors.default });
    }
  });
  
  //////////////////////////////////////////////////////////////////////////////////////////////////////
  
  app.post('/user/create', async (req: AuthenticatedRequest, res: Response) => {
    try {
      let params = req.body.payloadData;
      let user = await services.createUser(params, db);
      res.json(user);
    } catch (err) {
      console.log('ERROR in: ' + __filename + ' ' + err);
      res.status(500).json({ message: errors.default });
    }
  });
  
  //////////////////////////////////////////////////////////////////////////////////////////////////////
  
  app.put('/user/update', ...middlewares, async (req: AuthenticatedRequest, res: Response) => {
    try {
      let params = req.body.payloadData;
      let user = await services.updateUser(params, db);
      res.json(user);
    } catch (err) {
      console.log('ERROR in: ' + __filename + ' ' + err);
      res.status(500).json({ message: errors.default });
    }
  });
  
  //////////////////////////////////////////////////////////////////////////////////////////////////////
  
  app.delete('/user/delete', ...middlewares, async (req: AuthenticatedRequest, res: Response) => {
    try {
      let params = req.query;
      let user = await services.deleteUser(params, db);
      res.json(user);
    } catch (err) {
      console.log('ERROR in: ' + __filename + ' ' + err);
      res.status(500).json({ message: errors.default });
    }
  });
}



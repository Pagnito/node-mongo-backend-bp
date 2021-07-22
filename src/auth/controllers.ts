import services from './services';
import { Request, Response } from 'express';
import { Application } from 'express';
export default (app: Application, db: any) => {
  app.post('/auth/authenticate', async (req: Request, res: Response) => {    
    try {
      let params = req.body;
      let response = await services.authenticateUser(params, db);
      res.json(response);
    } catch (err) {
      res.status(500).json({message: err})
    }
  });
};

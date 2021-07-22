import { NextFunction, Request, Response } from 'express';
import { AuthenticatedRequest } from './types';
const jwt = require('jsonwebtoken');

export default [
  function isLoggedIn(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const token = req.get('x-auth-token');
      if (!token) return res.status(403).send('Access denied.');

      const decoded = jwt.verify(token, 'key');
      req.user = decoded;
      next();
    } catch (error) {
      res.status(400).send('Invalid token');
    }
  }
];

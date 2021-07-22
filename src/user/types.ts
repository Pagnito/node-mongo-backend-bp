import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: any;
}

export interface User {
  firstName?: string;
  lastName?: string;
  userName?: string;
  email?: string;
  password?: string;
  newPassword?: string;
}


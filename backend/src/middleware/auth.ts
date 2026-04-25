import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Request, Response, NextFunction } from 'express';
import User from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_dev';

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) throw new Error();

    const decoded: any = jwt.verify(token, JWT_SECRET as string);
    const user = await User.findById(decoded.id);
    if (!user) throw new Error();

    (req as any).user = user;
    next();
  } catch (err) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user || !roles.includes(user.role)) {
      return res.status(403).send({ error: 'Access denied.' });
    }
    next();
  };
};

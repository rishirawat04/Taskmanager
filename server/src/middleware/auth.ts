import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface UserPayload {
  userId: string;
  // You can add other relevant fields here if needed
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload; // Define user property on Request object
    }
  }
}

// Middleware to authenticate users based on JWT from cookies
const auth = (req: Request, res: Response, next: NextFunction) => {
  // Get token from the cookies
  const token = req.cookies['jwt'];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;
    req.user = decoded;
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

export default auth;

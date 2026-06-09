import { Request, Response, NextFunction } from 'express';

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];
  
  // TODO: Verify JWT token
  if (token === 'fake-token') { // placeholder logic
    (req as any).user = { id: 1, role: 'CUSTOMER' };
    next();
  } else {
    return res.status(401).json({ success: false, error: 'Invalid token' });
  }
};

export const requireRole = (role: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = (req as any).user?.role;
    if (!role.includes(userRole)) {
      return res.status(403).json({ success: false, error: 'Forbidden' });
    }
    next();
  };
};

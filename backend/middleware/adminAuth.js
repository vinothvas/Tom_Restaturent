import jwt from 'jsonwebtoken';

const adminAuth = (req, res, next) => {
 
  try {
   const {token} = req.headers;

    if (!token) {
      return res.json({ success: false, message: 'Not Authorized please login' });
    }
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.json({ success: false, message: 'Not Authorized please login' });
    }
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    return res.status(403).json({ success: false, message: 'Invalid token' });
  }
}
export default adminAuth;
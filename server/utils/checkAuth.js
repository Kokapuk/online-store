import jwt from 'jsonwebtoken';

const checkAuth = (req, res, next) => {
  const token = (req.headers.authorization || '').replace('Bearer ', '');

  if (!token) {
    return res.status(498).json({ message: 'Invalid token' });
  }

  let decrypted;

  try {
    decrypted = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.log(err);

    if (err instanceof jwt.TokenExpiredError) {
      return res.status(440).json({ message: 'Token expired' });
    }

    return res.status(498).json({ message: 'Invalid token' });
  }

  req.user = decrypted;
  next();
};

export default checkAuth;

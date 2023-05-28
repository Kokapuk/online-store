import UserModel from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const signToken = (_id, login) => {
  const token = jwt.sign(
    {
      _id,
      login,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    }
  );

  return token;
};

export const signUp = async (req, res) => {
  try {
    const isLoginInUse = await UserModel.exists({ login: req.body.login });

    if (isLoginInUse) {
      return res.status(409).json({ message: 'Login already in use' });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }

  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(req.body.password, salt);

  const doc = new UserModel({
    login: req.body.login,
    passwordHash: hash,
  });

  let user;

  try {
    user = await doc.save();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }

  const token = signToken(user.id, user.login);

  res.json({ login: user.login, token });
};

export const signIn = async (req, res) => {
  try {
    const user = await UserModel.findOne({ login: req.body.login }).select('+passwordHash');

    if (!user) {
      return res.status(401).json({ message: 'Wrong login or password' });
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, user.passwordHash);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Wrong login or password' });
    }

    const token = signToken(user.id, user.login, user.passwordHash);

    res.json({ login: user.login, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMe = async (req, res) => {
  res.json({ _id: req.user._id, login: req.user.login });
};

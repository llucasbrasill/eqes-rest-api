import jwt from 'jsonwebtoken';
import User from '../models/User';

export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      erros: ['Login required'],
    });
  }

  const [, token] = authorization.split(' ');

  try {
    const data = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email, username } = data;
    const user = await User.findOne({
      where: {
        id,
        email,
        username,
      },
    });

    if (!user) {
      return res.status(401).json({
        erros: ['Usuário inválido'],
      });
    }
    req.userId = id;
    req.userEmail = email;
    req.username = username;

    return next();
  } catch (e) {
    return res.status(401).json({
      erros: ['Login required'],
    });
  }
};

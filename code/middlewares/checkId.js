export default async (req, res, next) => {
  if (!req.userId) {
    return res.status(401).json({
      erros: ['ID do usuário invalído'],
    });
  }

  return next();
};

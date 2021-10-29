const errorMessages = {
  nameFieldNeeded: 'O campo "name" é obrigatório',
  nameLength: 'O "name" deve ter pelo menos 3 caracteres',
  ageNeeded: 'O campo "age" é obrigatório',
  minAge: 'A pessoa palestrante deve ser maior de idade',
  rateField: 'O campo "rate" deve ser um inteiro de 1 à 5',
  watchedAtField: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
  talkNeeded: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
  tokenNotFound: 'Token não encontrado',
  invalidToken: 'Token inválido',
};

const checkName = (req, res, next) => {
  const { name } = req.body;
  const nameRegex = /^[a-z]{3}/i;
  const validName = nameRegex.test(name);
  if (!name) return res.status(400).json({ message: errorMessages.nameFieldNeeded });
  if (!validName) return res.status(400).json({ message: errorMessages.nameLength });

  return next();
};

const checkAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) return res.status(400).json({ message: errorMessages.ageNeeded });
  if (age < 18) return res.status(400).json({ message: errorMessages.minAge });

  return next();
};

const checkTalkDetails = (req, res, next) => {
  const { talk: { rate, watchedAt } } = req.body;
  const validRate = (/^[1-5]/).test(rate);
  const validDate = (/[\d]{2}\/[\d]{2}\/[\d]{4}/).test(watchedAt);

  if (!validRate) return res.status(400).json({ message: errorMessages.rateField });
  if (!validDate || !watchedAt) {
    return res.status(400).json({ message: errorMessages.watchedAtField });
  }

  return next();
};

const checkTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk || Object.values(talk).length < 2) {
    return res.status(400).json({ message: errorMessages.talkNeeded });
  }

  return next();
};

const authToken = (req, res, next) => {
  const { authorization: token } = req.headers;
  if (!token) return res.status(401).json({ message: errorMessages.tokenNotFound });
  if (token.length < 16) return res.status(401).json({ message: errorMessages.invalidToken });

  return next();
};

module.exports = {
  checkName,
  checkAge,
  checkTalkDetails,
  checkTalk,
  authToken,
};
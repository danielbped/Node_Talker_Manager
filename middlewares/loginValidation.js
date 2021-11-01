const errorMessages = {
  emailFieldNeeded: 'O campo "email" é obrigatório',
  emailStyle: 'O "email" deve ter o formato "email@email.com"',
  passwordNeeded: 'O campo "password" é obrigatório',
  passwordLength: 'O "password" deve ter pelo menos 6 caracteres',
};

const loginValidation = (req, res, next) => {
  const { email, password } = req.body;
  const emailRegex = /\S+@\w+\.\w{2,6}(\.\w{2})?/g;
  const passwordRegex = /^.{6}/g;
  const validEmail = emailRegex.test(email);
  const validPassword = passwordRegex.test(password);

  if (!email) return res.status(400).json({ message: errorMessages.emailFieldNeeded });
  if (!validEmail) return res.status(400).json({ message: errorMessages.emailStyle });
  if (!password) return res.status(400).json({ message: errorMessages.passwordNeeded });
  if (!validPassword) return res.status(400).json({ message: errorMessages.passwordLength });

  next();
};

module.exports = loginValidation;
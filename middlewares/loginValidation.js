const errorMessages = {
  emailFieldNeeded: 'O campo "email" é obrigatório',
  emailStyle: 'O "email" deve ter o formato "email@email.com"',
  passwordNeeded: 'O campo "password" é obrigatório',
  passwordLength: 'O "password" deve ter pelo menos 6 caracteres',
};

const HTTP_OK_STATUS = 200;

const tokenGenerator = () => {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split('');
  const token = [];
  for (let i = 0; i < 16; i += 1) {
    const index = (Math.random() * (characters.length - 1)).toFixed(0);
    token[i] = characters[index];
  }

  return token.join('');
};

const loginValidation = (req, res) => {
  const { email, password } = req.body;
  const emailRegex = /.+@+.+mail\.com/g;
  const passwordRegex = /^.{6}/g;
  const validEmail = emailRegex.test(email);
  const validPassword = passwordRegex.test(password);

  if (!email) return res.status(400).json({ message: errorMessages.emailFieldNeeded });
  if (!validEmail) return res.status(400).json({ message: errorMessages.emailStyle });
  if (!password) return res.status(400).json({ message: errorMessages.passwordNeeded });
  if (!validPassword) return res.status(400).json({ message: errorMessages.passwordLength });

  return res.status(HTTP_OK_STATUS).json({ token: tokenGenerator() });
};

module.exports = loginValidation;
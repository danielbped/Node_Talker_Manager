const HTTP_OK_STATUS = 200;

//source: https://stackoverflow.com/questions/8532406/create-a-random-token-in-javascript-based-on-user-details
const tokenGenerator = () => {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split('');
  const token = [];
  for (let i = 0; i < 16; i += 1) {
    const index = (Math.random() * (characters.length - 1)).toFixed(0);
    token[i] = characters[index];
  }

  return token.join('');
};

module.exports = (_req, res) => res.status(HTTP_OK_STATUS).json({ token: tokenGenerator() });

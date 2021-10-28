const talkersFile = './talker.json';
const fs = require('fs').promises;

const errorMessages = {
  talkerNotFound: 'Pessoa palestrante não encontrada',
};

const HTTP_OK_STATUS = 200;

module.exports = async (req, res) => {
  const data = await fs.readFile(talkersFile, 'utf-8');
  const talkers = JSON.parse(data);
  const { id } = req.params;
  const talkerFound = await talkers.find((talker) => talker.id === Number(id));

  if (!talkerFound) return res.status(404).json({ message: errorMessages.talkerNotFound });
  return res.status(HTTP_OK_STATUS).send(talkerFound);
};

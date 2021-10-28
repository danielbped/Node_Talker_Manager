const talkersFile = './talker.json';
const fs = require('fs').promises;

const successMessage = {
  successfullDeleted: 'Pessoa palestrante deletada com sucesso',
};

const HTTP_OK_STATUS = 200;

module.exports = async (req, res) => {
  const { id } = req.params;
  const data = await fs.readFile(talkersFile, 'utf-8');
  const talkers = JSON.parse(data);
  const newTalkers = talkers.filter((talker) => talker.id !== Number(id));
  await fs.writeFile(talkersFile, JSON.stringify(newTalkers));
  try {
    return res.status(HTTP_OK_STATUS).json({ message: successMessage.successfullDeleted });
  } catch (err) {
    return console.error(err.message);
  }
};
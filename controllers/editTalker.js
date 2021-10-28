const talkersFile = './talker.json';
const fs = require('fs').promises;

const HTTP_OK_STATUS = 200;

module.exports = async (req, res) => {
  const { id } = req.params;
  const talkerEdited = req.body;
  const data = await fs.readFile(talkersFile, 'utf-8');
  const talkers = JSON.parse(data);
  const newTalker = { ...talkerEdited, id: Number(id) };
  const newTalkers = [...talkers.filter((talker) => talker.id !== id), newTalker];
  await fs.writeFile(talkersFile, JSON.stringify(newTalkers));
  try {
    return res.status(HTTP_OK_STATUS).json(newTalker);
  } catch (err) {
    return console.error(err.message);
  }
};
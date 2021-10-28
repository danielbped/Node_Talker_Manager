const talkersFile = './talker.json';
const fs = require('fs').promises;

const HTTP_OK_STATUS = 200;

module.exports = async (req, res) => {
  const { q } = req.query;
  const data = await fs.readFile(talkersFile, 'utf8');
  const talkers = await JSON.parse(data);
  const talkersFound = talkers.filter(
    (talker) => talker.name.includes(q),
  );

  try {
    return res.status(HTTP_OK_STATUS).json(talkersFound);
  } catch (err) {
    return console.error(err.message);
  }
};
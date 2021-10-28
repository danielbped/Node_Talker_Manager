const fs = require('fs').promises;

const HTTP_OK_STATUS = 200;

module.exports = async (_req, res) => {
  const data = await fs.readFile('./talker.json', 'utf-8');
  const talkers = JSON.parse(data);
  try {
    return res.status(HTTP_OK_STATUS).send(talkers);
  } catch (err) {
    return console.error(err.message);
  }
};
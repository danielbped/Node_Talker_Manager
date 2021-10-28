const talkersFile = './talker.json';
const fs = require('fs').promises;

const HTTP_CREATED_STATUS = 201;

module.exports = async (req, res) => {
  const talker = req.body;
  const currTalkers = await fs.readFile(talkersFile, 'utf8');
  const dataTalkers = await JSON.parse(currTalkers);
  const newId = dataTalkers.length + 1;
  const newTalkerWithId = { id: newId, ...talker };
  await fs.writeFile(talkersFile, JSON.stringify([...dataTalkers, newTalkerWithId]));
  try {
    return res.status(HTTP_CREATED_STATUS).json(newTalkerWithId);
  } catch (err) {
    return console.error(err.message);
  }
};
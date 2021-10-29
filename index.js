const express = require('express');
const bodyParser = require('body-parser');

const registeredTalkers = require('./controllers/registeredTalkers');
const loginValidation = require('./middlewares/loginValidation');
const newTalker = require('./controllers/newTalker');
const findTalkerById = require('./controllers/findTalkerById');
const editTalker = require('./controllers/editTalker');
const deleteTalker = require('./controllers/deleteTalker');
const searchTalkerByName = require('./controllers/searchTalkerByName');
const {
  checkName,
  checkAge,
  checkTalkDetails,
  checkTalk,
  authToken,
} = require('./middlewares/talkerValidation');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => response.status(HTTP_OK_STATUS).send());

app.get('/talker/search', authToken, searchTalkerByName);

app.get('/talker/:id', findTalkerById);

app.get('/talker', registeredTalkers);

app.post('/login', loginValidation);

app.post(
  '/talker',
  authToken,
  checkName,
  checkAge,
  checkTalk,
  checkTalkDetails,
  newTalker,
);

app.put(
  '/talker/:id',
  authToken,
  checkName,
  checkAge,
  checkTalk,
  checkTalkDetails,
  editTalker,
);

app.delete('/talker/:id', authToken, deleteTalker);

app.listen(PORT, () => console.log('Online'));

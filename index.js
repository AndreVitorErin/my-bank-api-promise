const express = require('express');
const fs = require('fs').promises;
const app = express();
const accountsRouter = require('./routes/accounts.js');

global.fileName = 'accounts.json';

app.use(express.json());
app.use('/account', accountsRouter);

app.listen(3000, async () => {
  try {
    await fs.readFile(global.fileName, 'utf8');
    console.log('API Started');
  } catch (err) {
    const initialJson = {
      nextId: 1,
      account: [],
    };
    fs.writeFile(global.fileName, JSON.stringify(initialJson)).catch((err) => {
      console.log(err);
    });
  }
});

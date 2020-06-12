const express = require('express');
const fs = require('fs').promises;
const router = express.Router();

router.post('/', async (req, res) => {
  let account = req.body;
  try {
    let data = await fs.readFile(global.fileName, 'utf8');
    let json = JSON.parse(data);

    account = { id: json.nextId++, ...account };
    json.account.push(account);

    await fs.writeFile(global.fileName, JSON.stringify(json));
    res.end();
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.get('/', async (_, res) => {
  try {
    let data = await fs.readFile(global.fileName, 'utf8');
    let json = JSON.parse(data);
    delete json.nextId;
    res.send(json);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    let data = await fs.readFile(global.fileName, 'utf8');
    let json = JSON.parse(data);
    const account = json.account.find(
      (account) => account.id === parseInt(req.params.id, 10)
    );
    if (account) {
      res.send(account);
    } else {
      res.end();
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    let data = await fs.readFile(global.fileName, 'utf8');

    let json = JSON.parse(data);
    let accounts = json.account.filter(
      (account) => account.id !== parseInt(req.params.id, 10)
    );
    json.account = accounts;

    await fs.writeFile(global.fileName, JSON.stringify(json));
    res.end();
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.put('/', async (req, res) => {
  let newAccount = req.body;
  try {
    let data = await fs.readFile(global.fileName, 'utf8');
    let json = JSON.parse(data);
    let oldIndex = json.account.findIndex(
      (account) => account.id === newAccount.id
    );

    json.account[oldIndex].name = newAccount.name;
    json.account[oldIndex].balance = newAccount.balance;

    await fs.writeFile(global.fileName, JSON.stringify(json));
    res.end();
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.post('/transaction', async (req, res) => {
  try {
    let params = req.body;
    let data = await fs.readFile(global.fileName, 'utf8');
    let json = JSON.parse(data);
    let index = json.account.findIndex((account) => account.id === params.id);
    // prettier-ignore
    if ((params.value < 0) && ((json.account[index].balance + params.value) < 0)) {
        throw new Error('Não há saldo suficiente');
      }
    json.account[index].balance += params.value;

    await fs.writeFile(global.fileName, JSON.stringify(json));
    res.send(json.account[index]);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

module.exports = router;

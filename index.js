const express = require('express');
const fs = require('fs').promises;
const app = express();
const swaggerUi = require('swagger-ui-express');
const swagger = require('./doc.js');
const accountsRouter = require('./routes/accounts.js');
const winston = require('winston');

global.fileName = 'accounts.json';

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});
global.logger = winston.createLogger({
  level: 'silly',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'my-bank-api-promise.log' }),
  ],
  format: combine(
    label({ label: 'my-bank-api-promise' }),
    timestamp(),
    myFormat
  ),
});

app.use(express.json());
app.use('/account', accountsRouter);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swagger));

app.listen(3000, async () => {
  try {
    await fs.readFile(global.fileName, 'utf8');
    logger.info('API Started');
  } catch (err) {
    const initialJson = {
      nextId: 1,
      account: [],
    };
    fs.writeFile(global.fileName, JSON.stringify(initialJson)).catch((err) => {
      logger.error(err);
    });
  }
});

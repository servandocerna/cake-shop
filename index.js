const cors = require('cors');
const path = require('path');
const logger = require('morgan');
const helmet = require('helmet');
const express = require('express');

const routes = require('./routes');
const { isProductionEnvironment } = require('./utils');

if (!isProductionEnvironment()) require('dotenv').config({ path: path.join(__dirname, '.env') });
require('./config/db');

const app = express();
const port = process.env.PORT || 1337;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors());

app.use('/', routes);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
});

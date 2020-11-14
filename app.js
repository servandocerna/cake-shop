const cors = require('cors');
const path = require('path');
const logger = require('morgan');
const helmet = require('helmet');
const express = require('express');

const routes = require('./routes');
const { isProductionEnvironment, isTestingEnvironment } = require('./utils');

if (!isProductionEnvironment()) require('dotenv').config({ path: path.join(__dirname, '.env') });
if (!isTestingEnvironment()) require('./config/db');

const errorhandler = require('./utils/errorhandler');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors());

app.use('/', routes);
app.use(errorhandler);

module.exports = app;

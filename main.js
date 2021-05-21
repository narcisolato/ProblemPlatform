const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');

const startRouter = require('./routes/start');
const endRouter = require('./routes/end');
const indexRouter = require('./routes/index');
const pageRouter = require('./routes/page');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded());
app.use(compression());
app.use(express.static('public'));
app.use(helmet());

app.use(startRouter);
app.use('/', indexRouter);
app.use('/page', pageRouter);
app.use(endRouter);

app.listen(port);
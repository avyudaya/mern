const express = require('express');
const app = express();
const notesRouter = require('./controllers/note');
const middleware = require('./utils/middleware');
const mongoose = require('mongoose')
const logger = require('./utils/logger');
const config = require('./utils/config');
const usersRouter = require('./controllers/user');
const loginRouter = require('./controllers/login');
const cors = require('cors');

logger.info('connecting to mongodb');
mongoose.set('strictQuery', false);
mongoose.connect(config.MONGODB_URL).then(() => {
    logger.info('connected to db.');
}).catch(err => {
    logger.error('error connecting to db', err.message);
})

app.use(express.static('dist'))
app.use(cors());
app.use(express.json());
app.use(middleware.requestMiddleware);

app.use('/api/login', loginRouter);
app.use('/api/users', usersRouter);
app.use('/api/notes', notesRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandlerMiddleware);

module.exports = app;
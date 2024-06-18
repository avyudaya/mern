const express = require('express');
const app = express();
const notesRouter = require('./controllers/note');
const middleware = require('./utils/middleware');
const mongoose = require('mongoose')
const logger = require('./utils/logger');
const config = require('./utils/config')

logger.info('connecting to mongodb');
mongoose.set('strictQuery', false);
mongoose.connect(config.MONGODB_URL).then(() => {
    logger.info('connected to db.');
}).catch(err => {
    logger.error('error connecting to db', err.message);
})

app.use(middleware.requestMiddleware);
app.use('/api/notes', notesRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandlerMiddleware);

module.exports = app;
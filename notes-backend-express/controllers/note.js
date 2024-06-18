const notesRouter = require('express').Router();
const Note = require('../models/note');

notesRouter.get('/', (req, res) => {
    Note.find({}).then(notes => {
        res.json(notes)
    })
})

module.exports = notesRouter;
require('dotenv').config();
const express = require('express')
const app = express()
const Note = require('./models/note')

app.use(express.json())

const requestMiddleware = (req, res, next) => {
    console.log('Method: ' + req.method);
    console.log('Path: ' + req.path);
    console.log('Body: ' + req.body);
    next();
}

const unknownEndpoint = (req, res, next) => {
    res.status(404).send({ error: 'unknown endpoint' });
}

app.use(requestMiddleware);

app.get('/api/notes', (req, res) => {
    Note.find({}).then(notes => {
        res.json(notes);
    })
});

app.get('/api/notes/:id', (req, res) => {
    Note.findById(req.params.id).then(note => {
        res.json(note);
    }).catch(err => {
        console.log(err);
        res.status(400).send({error: 'malformed id'})
    })
})

// app.delete('/api/notes/:id', (req, res) => {
//     const id = Number(req.params.id);
//     notes = notes.filter(note => note.id !== id);

//     res.json(notes);
// });

app.post('/api/notes', (req, res) => {
    const body = req.body;
    
    if(body.content == null){
        return res.status(400).json({
            error: 'content missing'
        })
    }

    const note = Note({
        content: body.content,
        important: body.important || false
    })
    
    note.save().then((savedNote) => {
        res.json(savedNote)
    })
});

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
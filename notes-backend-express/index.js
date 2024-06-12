const express = require('express')
const app = express()

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

let notes = [
    {
        id: 1,
        note: 'Note 1',
        important: true
    },
    {
        id: 2,
        note: 'Note 2',
        important: true
    },
    {
        id: 3,
        note: 'Note 3',
        important: true
    },
]

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.get('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id);
    
    const note = notes.find(note => note.id === id);
    if(note){
        res.json(note);
    } else {
        res.status(404).end();
    }
})

app.delete('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id);
    notes = notes.filter(note => note.id !== id);

    res.json(notes);
});

app.post('/api/notes', (req, res) => {
    const note = req.body;
    note.id = notes.length + 1;
    notes.push(note);
    res.json(note);
});

app.use(unknownEndpoint)

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
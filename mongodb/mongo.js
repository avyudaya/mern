const mongoose = require('mongoose')

const url = 'mongodb+srv://avyudaya7:fO3Gh0Vhkn3bbO0V@cluster0.7ndo04x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

mongoose.set('strictQuery', false)
mongoose.connect(url).then(() => {
    console.log('connected to db.');
});

const noteSchema = mongoose.Schema({
    content: String,
    important: Boolean,
});

const Note = mongoose.model('Note', noteSchema)

const note = new Note({content: 'Hello world', important: true})

// note.save().then(response => {
//     console.log('note saved!')
//     mongoose.connection.close()
// });

Note.find({important: true}).then(result => {
    result.forEach(note => console.log(note))
    mongoose.connection.close()
})
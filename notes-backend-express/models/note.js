const mongoose = require('mongoose')

const url = process.env.MONGODB_URL

mongoose.set('strictQuery', false)
mongoose.connect(url).then(() => {
    console.log('connected to db.');
}).catch(err => {
    console.log('error connecting to db', err.message);
})

const noteSchema = mongoose.Schema({
    content: String,
    important: Boolean,
});

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Note', noteSchema)
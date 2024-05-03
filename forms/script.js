let notes = [];
let form = document.getElementById('create-note-form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let newNote = document.getElementById('new-note').value;
    notes.push(newNote);
    console.log(notes);
})
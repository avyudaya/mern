let notes = [];
let x = localStorage.getItem("notes")
if(x != null) {
    notes = JSON.parse(x);
}

let form = document.getElementById('create-note-form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let newNote = document.getElementById('new-note').value;
    if(newNote === ""){
        return;
    }  // if the note is empty don't add it to the list
    notes.push(newNote);
    showNotes();

    document.getElementById('new-note').value = "";
})

showNotes();
function showNotes(){
    let ulTag = document.getElementById("notes");
    let html = "";

    notes.forEach((note, index) => {
        html += `<li class="list-group-item">${note}</li>`
    })

    ulTag.innerHTML = html;
}
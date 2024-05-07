let notes = [];
let x = localStorage.getItem("notes")
if(x != null) {
    notes = JSON.parse(x);
}

let form = document.getElementById('create-note-form');

form.addEventListener('submit', (e) => {
    e.preventDefault();  // prevent the browser from refreshing
    
    let newNote = document.getElementById('new-note').value;  // get note from our html input
    if(newNote === ""){
        return;
    }  // if the note is empty don't add it to the list
    notes.push(newNote);    
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
    document.getElementById('new-note').value = "";
})

function deleteNote(index) {
    if(confirm(`Are you sure you want to delete: ${notes[index]}?`) === false){
        return;
    }
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
}

showNotes();
function showNotes(){
    let ulTag = document.getElementById("notes");
    let html = "";

    notes.forEach((note, index) => {
        html += `<div class="card col-12 m-2" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Note ${index+1}</h5>
          <p class="card-text">${note}</p>
          <button href="#" class="btn btn-secondary">Update</button>
          <button onClick="deleteNote(${index})" href="#" class="btn btn-danger">Delete</button>
        </div>
      </div>`
    })

    ulTag.innerHTML = html;
}
let notes = [];
let x = localStorage.getItem("notes");
if (x != null) {
  notes = JSON.parse(x);
}

let form = document.getElementById("create-note-form");
let searchForm = document.getElementById("search-form");

form.addEventListener("submit", (e) => {
  e.preventDefault(); // prevent the browser from refreshing

  let newNote = document.getElementById("new-note").value; // get note from our html input
  if (newNote === "") {
    return;
  } // if the note is empty don't add it to the list
  notes.push(newNote);
  localStorage.setItem("notes", JSON.stringify(notes));
  showNotes();
  document.getElementById("new-note").value = "";
});

function deleteNote(index) {
  if (confirm(`Are you sure you want to delete: ${notes[index]}?`) === false) {
    return;
  }
  notes.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  showNotes();
}

function updateNote(index) {
  let newNote = prompt("Enter new note");
  if (newNote === null) {
    return;
  }
  notes[index] = newNote;
  localStorage.setItem("notes", JSON.stringify(notes));
  showNotes();
}

showNotes();
function showNotes() {
  let ulTag = document.getElementById("notes");
  let html = "";

  notes.forEach((note, index) => {
    html += `<div class="card col-12 m-2 notesss" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Note ${index + 1}</h5>
          <p class="card-text">${note}</p>
          <button onClick="updateNote(${index})" href="#" class="btn btn-secondary">Update</button>
          <button onClick="deleteNote(${index})" href="#" class="btn btn-danger">Delete</button>
        </div>
      </div>`;
  });

  ulTag.innerHTML = html;
}

/*
ALGORITHM

1. get the search text: line 72
2. get all the notes from the dom : line 82
3. for each note do: (line 92 to 99)
      match note text and search text
        if match:
          show
        else:
          hide
*/

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();  // prevent from relloading
    let searchText = document.getElementById("search-text").value;  // get the value in the search box input

    // if we have search text entered show it in html else remove it
    if(searchText != ""){
      document.getElementById("searching-for").innerHTML = `<h3 class="mt-5">Searching for: ${searchText}</h3>`;
    } else {
      document.getElementById("searching-for").innerHTML = "";
    }

    // get all the notes card in our document as object
    let allNotes = document.getElementsByClassName('notesss');

    // 1. first convert the object to array.
    // 2. then loop through the array and check if the note contains the search text or not.
    // 3. if it contains then show the note else hide it.

    let counter = 0;

    Array.from(allNotes).forEach(element => {
      let note = element.getElementsByTagName('p')['0'].innerText;
      if(note.includes(searchText)){
        element.style.display = 'block';
      } else {
        element.style.display = 'none';
      }
    });

    if(counter===0){
      // show no results found.
    }
});
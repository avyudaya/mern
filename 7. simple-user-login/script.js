let users = [];
let x = localStorage.getItem('users');
if(x!= null){
    users = JSON.parse(x);
}

let form = document.getElementById("formm");


form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let obj = {
        email: email,
        password: password,
    }

    users.push(obj);
    localStorage.setItem("users", JSON.stringify(users));
    console.log(users);
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
});

function showUsers() {
  let ulTag = document.getElementById("users");
  let html = "";

  users.forEach((val, index) => {
    html += `<div class="card col-12 m-2 notesss" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">User ${index + 1}</h5>
          <p class="card-text">${val.email}</p>
        </div>
      </div>`;
  });

  ulTag.innerHTML = html;
  console.log(html);
}
showUsers();
let form = document.getElementById("formm");
let arr = [];

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let obj = {
        email: email,
        password: password,
    }

    arr.push(obj);
    console.log(arr);
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
});
let form1 = document.getElementById("form1");

console.log(form1);

form1.addEventListener("submit", (e) => {
  e.preventDefault();

  let name = document.getElementById("name").value;

  console.log(name);
});

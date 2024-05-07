let x = prompt("Please enter rock, paper or scissor.");
let h1 = document.getElementById("answer");

console.log(h1);

if (x == null) {
  console.log("Please enter rock, paper or scissor.");
  h1.innerText = "Please enter rock, paper or scissor.";
} else if (x.toLowerCase() == "rock") {
  console.log("paper");
  h1.innerText = "Computer says paper.";
} else if (x.toLowerCase() == "scissor") {
  console.log("rock");
  h1.innerText = "Computer says rock.";
} else {
  console.log("scissor");
  h1.innerText = "Computer says scissor.";
}
